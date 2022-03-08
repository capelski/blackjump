import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Audio } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import hitSoundMp3 from '../assets/hit.mp3';
import missSoundMp3 from '../assets/miss.mp3';
import {
    getGameConfig,
    getHasCompletedOnboarding,
    getPlayerEarnings,
    getPlayerEarningsHistorical,
    getTrainingProgress,
    updateGameConfig,
    updateHasCompletedOnboarding,
    updatePlayerEarnings,
    updatePlayerEarningsHistorical,
    updateTrainingProgress
} from './async-storage';
import { NavBar } from './components/nav-bar';
import { OnboardingBar } from './components/onboarding-bar';
import { tableColor } from './constants';
import { handleDealerTurn } from './logic/app-state';
import { evaluateDecision } from './logic/basic-strategy';
import { getRandomCard, symbolToSimpleSymbol } from './logic/card';
import { getDefaultGameConfig } from './logic/game-config';
import {
    canBeDealerBlackjack,
    canDouble,
    canHit,
    canSplit,
    canSurrender,
    isDealerBlackjack,
    isFinished,
    revealDealerHoleCard
} from './logic/hand';
import { handToHandCode } from './logic/hand';
import { onBoardingSteps } from './logic/onboarding';
import {
    createPlayer,
    doubleCurrentHand,
    getCurrentHand,
    hitCurrentHand,
    initializeHands,
    isLastHand,
    splitCurrentHand,
    standCurrentHand,
    startNextHand,
    surrenderCurrentHand
} from './logic/player';
import { getDefaultTrainingHands, getTrainingHands } from './logic/training-hand';
import {
    getDefaultTrainingStatus,
    getIsProgressBlocked,
    getNextTrainingStatus,
    retrieveTrainingStatus
} from './logic/training-status';
import {
    AppNavigation,
    BaseDecisions,
    CasinoRulesKeys,
    DecisionEvaluation,
    GameConfig,
    Hand,
    HandCode,
    initialRouteName,
    OnBoardingStepEvent,
    Phases,
    Player,
    PlayerDecision,
    PlayerDecisions,
    RouteNames,
    RouteParams,
    TrainingStatus
} from './types';
import { playSound } from './utils';
import { BasicStrategyTable } from './views/basic-strategy-table';
import { BlackjackPeek } from './views/blackjack-peek';
import { ConfigMenu } from './views/config-menu';
import { EarningsChart } from './views/earnings-chart';
import { HandDecisions } from './views/hand-decisions';
import { HitSplitAces } from './views/hit-split-aces';
import { MissedPairs } from './views/missed-pairs';
import { Onboarding } from './views/onboarding';
import { Table } from './views/table';
import { TrainingCompleted } from './views/training-completed';
import { TrainingPairs } from './views/training-pairs';
import { UntrainedPairsPriority } from './views/untrained-pairs-priority';

const Stack = createStackNavigator<RouteParams>();
let navigationListener: Function | undefined;

const initializeSounds = () =>
    Promise.all([Audio.Sound.createAsync(hitSoundMp3), Audio.Sound.createAsync(missSoundMp3)])
        .then((results) => ({
            hit: results[0].sound,
            miss: results[1].sound
        }))
        .catch((errors) => {
            console.log(errors);
            /* Failing to load audio is not a critical issue */
            return undefined;
        });

export const BlackJump: React.FC = () => {
    const [currentRoute, setCurrentRoute] = useState<string>(initialRouteName);
    const [dealerHand, setDealerHand] = useState<Hand>();
    const [decisionEvaluation, setDecisionEvaluation] = useState<DecisionEvaluation>();
    const [decisionEvaluationTimeout, setDecisionEvaluationTimeout] = useState(0);
    const [gameConfig, setGameConfig] = useState(getDefaultGameConfig());
    const [onBoardingStep, setOnBoardingStep] = useState(-1);
    const [peeking, setPeeking] = useState(false);
    const [phase, setPhase] = useState<Phases>(Phases.finished);
    const [player, setPlayer] = useState<Player>(createPlayer());
    const [trainingHands, setTrainingHands] = useState(getDefaultTrainingHands());
    const [sounds, setSounds] = useState<{ hit: Audio.Sound; miss: Audio.Sound }>();
    const [trainingStatus, setTrainingStatus] = useState(getDefaultTrainingStatus());

    const navigationRef = useRef<NavigationContainerRef<RouteParams>>(null);

    useEffect(() => {
        Promise.all([
            getGameConfig(gameConfig),
            getHasCompletedOnboarding(),
            getPlayerEarnings(),
            getPlayerEarningsHistorical(),
            getTrainingProgress(),
            initializeSounds()
        ]).then((results) => {
            const _gameConfig = results[0];
            const hasCompletedOnboarding = results[1];
            const playerEarnings = results[2];
            const playerEarningsHistorical = results[3];
            const trainingProgress = results[4];
            const _sounds = results[5];

            setGameConfig(_gameConfig);
            const nextTrainingHands = getTrainingHands(_gameConfig.casinoRules);
            setTrainingHands(nextTrainingHands);

            if (!hasCompletedOnboarding) {
                navigationRef.current?.navigate(RouteNames.onboarding);
            }

            setPlayer({
                ...player,
                cash: playerEarnings,
                earningsHistorical: playerEarningsHistorical
            });

            if (trainingProgress) {
                const nextTrainingStatus = retrieveTrainingStatus(
                    trainingProgress,
                    nextTrainingHands,
                    _gameConfig
                );
                setTrainingStatus(nextTrainingStatus);
            }

            setSounds(_sounds);
        });
    }, []);

    useEffect(() => {
        if (navigationRef.current && !navigationListener) {
            navigationListener = navigationRef.current.addListener('state', (event) => {
                setCurrentRoute(event.data.state!.routes[event.data.state!.index!].name);
            });
        }
    }, [navigationRef.current]);

    const currentHand = getCurrentHand(player);
    const isDoubleEnabled =
        currentHand !== undefined && canDouble(currentHand, player.hands, gameConfig.casinoRules);
    const isHitEnabled = currentHand !== undefined && canHit(player.hands, gameConfig.casinoRules);
    const isSplitEnabled =
        currentHand !== undefined &&
        canSplit(currentHand, player.hands.length, gameConfig.casinoRules);
    const isSurrenderEnabled =
        currentHand !== undefined &&
        canSurrender(currentHand, player.hands.length, gameConfig.casinoRules);
    const currentDealerSymbol = dealerHand && symbolToSimpleSymbol(dealerHand.cards[0].symbol);

    const updateOnBoardingStep = (direction: 'forward' | 'backward') => {
        const nextStep = onBoardingStep + (direction === 'forward' ? 1 : -1);
        onBoardingSteps[nextStep] &&
            onBoardingSteps[nextStep].load &&
            onBoardingSteps[nextStep].load!(navigationRef.current as unknown as AppNavigation);
        setOnBoardingStep(nextStep);
    };

    const exitOnboarding = () => {
        setOnBoardingStep(-1);
        updateHasCompletedOnboarding(true);
        navigationRef.current?.navigate(RouteNames.table);
    };

    useEffect(() => {
        if (decisionEvaluationTimeout) {
            clearTimeout(decisionEvaluationTimeout);
        }
        if (decisionEvaluation && decisionEvaluation.isHit) {
            const nextTimeout = setTimeout(() => {
                setDecisionEvaluation(undefined);
            }, 1000);
            setDecisionEvaluationTimeout(nextTimeout as unknown as number);
        }
    }, [decisionEvaluation]);

    useEffect(() => {
        if (phase === 'dealer') {
            handleDealerTurn(dealerHand!, gameConfig, player, setDealerHand, setPhase, setPlayer);
        }
    }, [phase, dealerHand]);

    const saveGameConfig = (nextGameConfig: GameConfig) => {
        setGameConfig(nextGameConfig);
        updateGameConfig(nextGameConfig);
    };

    const startTrainingRound = (playerHand: Hand, dealerHand: Hand) => {
        const nextPlayer = { ...player };
        initializeHands(nextPlayer, playerHand);

        if (
            gameConfig.casinoRules[CasinoRulesKeys.blackjackPeek] &&
            canBeDealerBlackjack(dealerHand)
        ) {
            setPeeking(true);
            setTimeout(() => {
                setPeeking(false);
                if (isDealerBlackjack(dealerHand)) {
                    revealDealerHoleCard(dealerHand);
                    setPhase(Phases.dealer);
                } else {
                    setPhase(Phases.player);
                }
            }, 1500);
        } else {
            setPhase(
                isFinished(getCurrentHand(nextPlayer), nextPlayer.hands, gameConfig.casinoRules)
                    ? Phases.dealer
                    : Phases.player
            );
        }

        setDealerHand(dealerHand);
        setPlayer(nextPlayer);
        setDecisionEvaluation(undefined);

        if (
            onBoardingSteps[onBoardingStep] &&
            onBoardingSteps[onBoardingStep].event === OnBoardingStepEvent.startRound
        ) {
            updateOnBoardingStep('forward');
        }
    };

    const finishCurrentHand = (player: Player) => {
        if (isLastHand(player)) {
            setPhase(Phases.dealer);
            // By setting the phase to dealer, the corresponding useEffect hook will be executed
        } else {
            const nextPlayer = { ...player };
            startNextHand(
                nextPlayer,
                gameConfig.untrainedPairsPriority,
                currentDealerSymbol!,
                trainingHands,
                trainingStatus.trainingProgress
            );
            setPlayer(nextPlayer);
            if (isFinished(getCurrentHand(nextPlayer), nextPlayer.hands, gameConfig.casinoRules)) {
                finishCurrentHand(nextPlayer);
            }
        }
    };

    const evaluatePlayerDecision = (playerDecision: PlayerDecision, hand: Hand) => {
        const nextDecisionEvaluation = evaluateDecision(
            hand,
            dealerHand!,
            trainingHands,
            {
                canDouble: isDoubleEnabled,
                canSplit: isSplitEnabled,
                canSurrender: isSurrenderEnabled
            },
            playerDecision
        );

        if (gameConfig.isSoundEnabled && sounds) {
            playSound(nextDecisionEvaluation.isHit ? sounds.hit : sounds.miss);
        }

        setDecisionEvaluation(nextDecisionEvaluation);

        const handCode = handToHandCode(currentHand);
        let nextTrainingStatus = getNextTrainingStatus(
            trainingStatus,
            trainingHands,
            gameConfig,
            nextDecisionEvaluation.isHit,
            handCode,
            currentDealerSymbol!
        );

        if (handCode === HandCode.Split10s) {
            // Because the only possible initial-hand for a Hard 20 is a 10,10,
            // Split10s must also set the corresponding state for Hard 20
            nextTrainingStatus = getNextTrainingStatus(
                nextTrainingStatus,
                trainingHands,
                gameConfig,
                nextDecisionEvaluation.isHit,
                HandCode.Hard20,
                currentDealerSymbol!
            );
        }

        setTrainingStatus(nextTrainingStatus);
        updateTrainingProgress(nextTrainingStatus.trainingProgress);

        if (
            onBoardingSteps[onBoardingStep] &&
            onBoardingSteps[onBoardingStep].event === OnBoardingStepEvent.playerAction
        ) {
            updateOnBoardingStep('forward');
        }

        if (nextTrainingStatus.isCompleted && !trainingStatus.isCompleted) {
            navigationRef.current?.navigate(RouteNames.trainingCompleted);
            saveGameConfig({ ...gameConfig, untrainedPairsPriority: false });
        }
    };

    const doubleHandler = () => {
        const nextPlayer = { ...player };
        evaluatePlayerDecision(PlayerDecisions.double, currentHand);
        doubleCurrentHand(nextPlayer, getRandomCard());
        setPlayer(nextPlayer);
        finishCurrentHand(nextPlayer);
    };

    const hitHandler = () => {
        const nextPlayer = { ...player };
        evaluatePlayerDecision(BaseDecisions.hit, currentHand);
        hitCurrentHand(
            nextPlayer,
            gameConfig.untrainedPairsPriority,
            currentDealerSymbol!,
            trainingHands,
            trainingStatus.trainingProgress
        );

        setPlayer(nextPlayer);
        if (isFinished(currentHand, nextPlayer.hands, gameConfig.casinoRules)) {
            finishCurrentHand(nextPlayer);
        }
    };

    const standHandler = () => {
        const nextPlayer = { ...player };
        evaluatePlayerDecision(BaseDecisions.stand, currentHand);
        standCurrentHand(nextPlayer);
        setPlayer(nextPlayer);
        finishCurrentHand(nextPlayer);
    };

    const splitHandler = () => {
        const nextPlayer = { ...player };
        evaluatePlayerDecision(PlayerDecisions.split, currentHand);
        splitCurrentHand(
            nextPlayer,
            gameConfig.untrainedPairsPriority,
            currentDealerSymbol!,
            trainingHands,
            trainingStatus.trainingProgress
        );

        setPlayer(nextPlayer);
        if (isFinished(getCurrentHand(nextPlayer), nextPlayer.hands, gameConfig.casinoRules)) {
            finishCurrentHand(nextPlayer);
        }
    };

    const surrenderHandler = () => {
        const nextPlayer = { ...player };
        evaluatePlayerDecision(PlayerDecisions.surrender, currentHand);
        surrenderCurrentHand(nextPlayer);
        setPlayer(nextPlayer);
        finishCurrentHand(nextPlayer);
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer ref={navigationRef}>
                <StatusBar hidden={true} />
                <NavBar
                    navigation={navigationRef.current as unknown as AppNavigation}
                    onBoardingStep={onBoardingStep}
                    player={player}
                    routeName={currentRoute}
                    trainingStatus={trainingStatus}
                />
                <Stack.Navigator
                    initialRouteName={initialRouteName}
                    screenOptions={{
                        headerShown: false,
                        cardStyle: {
                            backgroundColor: tableColor
                        }
                    }}
                >
                    <Stack.Screen name={RouteNames.basicStrategyTable}>
                        {() => <BasicStrategyTable casinoRules={gameConfig.casinoRules} />}
                    </Stack.Screen>
                    <Stack.Screen name={RouteNames.blackjackPeek} component={BlackjackPeek} />
                    <Stack.Screen name={RouteNames.configMenu}>
                        {(props) => (
                            <ConfigMenu
                                gameConfig={gameConfig}
                                navigation={props.navigation}
                                onBoardingStep={onBoardingStep}
                                phase={phase}
                                resetTrainingStatus={() => {
                                    const nextTrainingStatus = getDefaultTrainingStatus();
                                    const nextPlayer: Player = {
                                        ...player,
                                        cash: 0,
                                        earningsHistorical: [0]
                                    };

                                    updateTrainingProgress(nextTrainingStatus.trainingProgress);
                                    updatePlayerEarnings(nextPlayer.cash);
                                    updatePlayerEarningsHistorical(nextPlayer.earningsHistorical);

                                    setPlayer(nextPlayer);
                                    setTrainingStatus(nextTrainingStatus);

                                    props.navigation.navigate(RouteNames.table);
                                }}
                                setGameConfig={(_gameConfig) => {
                                    const nextTrainingHands = getTrainingHands(
                                        _gameConfig.casinoRules
                                    );
                                    const nextTrainingStatus: TrainingStatus = {
                                        ...trainingStatus,
                                        isProgressBlocked: getIsProgressBlocked(
                                            trainingStatus,
                                            trainingHands,
                                            _gameConfig.selectedHandsOnly,
                                            _gameConfig.selectedHands
                                        )
                                    };

                                    saveGameConfig(_gameConfig);
                                    setTrainingHands(nextTrainingHands);
                                    setTrainingStatus(nextTrainingStatus);
                                }}
                                trainingHands={trainingHands}
                                trainingStatus={trainingStatus}
                            />
                        )}
                    </Stack.Screen>
                    <Stack.Screen name={RouteNames.earningsChart}>
                        {() => <EarningsChart earningsHistorical={player.earningsHistorical} />}
                    </Stack.Screen>
                    <Stack.Screen name={RouteNames.handDecisions}>
                        {(props) => (
                            <HandDecisions
                                casinoRules={gameConfig.casinoRules}
                                route={props.route}
                            />
                        )}
                    </Stack.Screen>
                    <Stack.Screen name={RouteNames.hitSplitAces} component={HitSplitAces} />
                    <Stack.Screen name={RouteNames.missedPairs}>
                        {(props) => (
                            <MissedPairs
                                gameConfig={gameConfig}
                                missedTrainingPairs={trainingStatus.missedTrainingPairs}
                                navigation={props.navigation}
                                onBoardingStep={onBoardingStep}
                                phase={phase}
                                startTrainingRound={startTrainingRound}
                                trainingHands={trainingHands}
                            />
                        )}
                    </Stack.Screen>
                    <Stack.Screen name={RouteNames.onboarding}>
                        {() => (
                            <Onboarding
                                skipOnboardingHandler={exitOnboarding}
                                startOnboardingHandler={() => updateOnBoardingStep('forward')}
                            />
                        )}
                    </Stack.Screen>
                    <Stack.Screen name={RouteNames.table}>
                        {(props) => (
                            <Table
                                dealerHand={dealerHand}
                                decisionEvaluation={decisionEvaluation}
                                gameConfig={gameConfig}
                                handlers={{
                                    double: doubleHandler,
                                    hit: hitHandler,
                                    split: splitHandler,
                                    stand: standHandler,
                                    surrender: surrenderHandler
                                }}
                                isDoubleEnabled={isDoubleEnabled}
                                isHitEnabled={isHitEnabled}
                                isSplitEnabled={isSplitEnabled}
                                isSurrenderEnabled={isSurrenderEnabled}
                                navigation={props.navigation}
                                onBoardingStep={onBoardingStep}
                                peeking={peeking}
                                phase={phase}
                                player={player}
                                startTrainingRound={startTrainingRound}
                                trainingHands={trainingHands}
                                trainingProgress={trainingStatus.trainingProgress}
                            />
                        )}
                    </Stack.Screen>
                    <Stack.Screen
                        name={RouteNames.trainingCompleted}
                        component={TrainingCompleted}
                    />
                    <Stack.Screen name={RouteNames.trainingPairs}>
                        {(props) => (
                            <TrainingPairs
                                gameConfig={gameConfig}
                                navigation={props.navigation}
                                onBoardingStep={onBoardingStep}
                                phase={phase}
                                startTrainingRound={startTrainingRound}
                                trainingHands={trainingHands}
                                trainingProgress={trainingStatus.trainingProgress}
                            />
                        )}
                    </Stack.Screen>
                    <Stack.Screen
                        name={RouteNames.untrainedPairsPriority}
                        component={UntrainedPairsPriority}
                    />
                </Stack.Navigator>

                {onBoardingStep > -1 && (
                    <OnboardingBar
                        exitOnboarding={exitOnboarding}
                        nextStepHandler={() => updateOnBoardingStep('forward')}
                        onBoardingStep={onBoardingStep}
                        previousStepHandler={() => updateOnBoardingStep('backward')}
                    />
                )}
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};
