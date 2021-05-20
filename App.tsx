import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Audio } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import failureSoundMp3 from './assets/failure.mp3';
import successSoundMp3 from './assets/success.mp3';
import {
    getGameConfig,
    getHasCompletedOnboarding,
    getPlayerEarnings,
    getTrainingProgress,
    updateHasCompletedOnboarding,
    updateTrainingProgress
} from './src/async-storage';
import { NavBar } from './src/components/nav-bar';
import { OnboardingBar } from './src/components/onboarding-bar';
import { tableColor } from './src/constants';
import { getNextTrainingStatus, handleDealerTurn } from './src/logic/app-state';
import { evaluateDecision } from './src/logic/basic-strategy';
import { getRandomCard, symbolToSimpleSymbol } from './src/logic/card';
import { getDefaultGameConfig } from './src/logic/game-config';
import {
    canBeDealerBlackjack,
    canDouble,
    canHit,
    canSplit,
    canSurrender,
    isDealerBlackjack,
    isFinished,
    revealDealerHoleCard
} from './src/logic/hand';
import { handToHandCode } from './src/logic/hand';
import { onBoardingSteps } from './src/logic/onboarding';
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
} from './src/logic/player';
import { getDefaultTrainingHands, getTrainingHands } from './src/logic/training-hand';
import { allTrainingPairsNumber } from './src/logic/training-pair';
import {
    getAreGoldHandsBlockingProgress,
    getDefaultTrainingStatus,
    retrieveTrainingStatus
} from './src/logic/training-status';
import {
    AppNavigation,
    BaseDecisions,
    CasinoRulesKeys,
    DecisionEvaluation,
    Hand,
    HandCode,
    initialRouteName,
    Phases,
    Player,
    PlayerDecision,
    PlayerDecisions,
    RouteNames,
    RouteParams,
    TrainingStatus
} from './src/types';
import { playSound } from './src/utils';
import { BasicStrategyTable } from './src/views/basic-strategy-table';
import { BlueCardsInfo } from './src/views/blue-cards-info';
import { ConfigMenu } from './src/views/config-menu';
import { FailedHands } from './src/views/failed-hands';
import { GoldHandsInfo } from './src/views/gold-hands-info';
import { GoldHandsLevelsInfo } from './src/views/gold-hands-levels-info';
import { HandDecisions } from './src/views/hand-decisions';
import { Onboarding } from './src/views/onboarding';
import { Table } from './src/views/table';
import { TrainingCompleted } from './src/views/training-completed';
import { TrainingHands } from './src/views/training-hands';

const Stack = createStackNavigator<RouteParams>();
let navigationListener: Function | undefined;

const initializeSounds = () =>
    Promise.all([
        Audio.Sound.createAsync(failureSoundMp3),
        Audio.Sound.createAsync(successSoundMp3)
    ])
        .then((results) => ({
            failure: results[0].sound,
            success: results[1].sound
        }))
        .catch((errors) => {
            console.log(errors);
            /* Failing to load audio is not a critical issue */
            return undefined;
        });

export default function App() {
    const [areGoldHandsBlockingProgress, setAreGoldHandsBlockingProgress] = useState(false);
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
    const [sounds, setSounds] = useState<{ failure: Audio.Sound; success: Audio.Sound }>();
    const [trainingStatus, setTrainingStatus] = useState(getDefaultTrainingStatus());

    const navigationRef = useRef<NavigationContainerRef>(null);

    useEffect(() => {
        Promise.all([
            getGameConfig(gameConfig),
            getHasCompletedOnboarding(),
            getPlayerEarnings(),
            getTrainingProgress(),
            initializeSounds()
        ]).then((results) => {
            setGameConfig(results[0]);
            const nextTrainingHands = getTrainingHands(results[0].casinoRules);
            setTrainingHands(nextTrainingHands);

            if (!results[1]) {
                ((navigationRef.current as unknown) as AppNavigation).navigate(
                    RouteNames.onboarding
                );
            }

            if (results[2]) {
                setPlayer({ ...player, cash: results[2] });
            }

            if (results[3]) {
                const nextTrainingStatus = retrieveTrainingStatus(results[3]);

                setTrainingStatus(nextTrainingStatus);
                setAreGoldHandsBlockingProgress(
                    getAreGoldHandsBlockingProgress(
                        results[0],
                        nextTrainingHands,
                        results[3],
                        getProgress(nextTrainingStatus)
                    )
                );
            }

            setSounds(results[4]);
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

    const updateOnBoardingStep = (direction: 1 | -1) => {
        const nextStep = onBoardingStep + direction;
        onBoardingSteps[nextStep]?.load((navigationRef.current as unknown) as AppNavigation);
        setOnBoardingStep(nextStep);
    };

    const exitOnboarding = () => {
        setOnBoardingStep(-1);
        updateHasCompletedOnboarding(true);
        ((navigationRef.current as unknown) as AppNavigation).navigate(RouteNames.table);
    };

    const getProgress = (_trainingStatus: TrainingStatus) =>
        Math.floor((_trainingStatus.attemptedTrainingPairs * 1000) / allTrainingPairsNumber) / 10;
    const progress = getProgress(trainingStatus);

    useEffect(() => {
        if (decisionEvaluationTimeout) {
            clearTimeout(decisionEvaluationTimeout);
        }
        if (decisionEvaluation && decisionEvaluation.isHit) {
            const nextTimeout = setTimeout(() => {
                setDecisionEvaluation(undefined);
            }, 1000);
            setDecisionEvaluationTimeout(nextTimeout);
        }
    }, [decisionEvaluation]);

    useEffect(() => {
        if (phase === 'dealer') {
            handleDealerTurn(dealerHand!, gameConfig, player, setDealerHand, setPhase, setPlayer);
        }
    }, [phase, dealerHand]);

    const startTrainingRound = (playerHand: Hand, dealerHand: Hand) => {
        const nextPlayer = { ...player };
        initializeHands(nextPlayer, playerHand);

        if (
            gameConfig.casinoRules[CasinoRulesKeys.holeCard] &&
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

        if (onBoardingSteps[onBoardingStep] && onBoardingSteps[onBoardingStep].id === 1) {
            updateOnBoardingStep(1);
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
                gameConfig.useBlueCards,
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
            playSound(nextDecisionEvaluation.isHit ? sounds.success : sounds.failure);
        }

        setDecisionEvaluation(nextDecisionEvaluation);

        const handCode = handToHandCode(currentHand);
        let nextTrainingStatus = getNextTrainingStatus(
            trainingStatus,
            nextDecisionEvaluation.isHit,
            handCode,
            currentDealerSymbol!
        );

        if (handCode === HandCode.Split5s) {
            // A 5,5 must also set the corresponding state for Hard 10
            nextTrainingStatus = getNextTrainingStatus(
                nextTrainingStatus,
                nextDecisionEvaluation.isHit,
                HandCode.Hard10,
                currentDealerSymbol!
            );
        } else if (handCode === HandCode.Split10s) {
            // A 10,10 must also set the corresponding state for Hard 20
            nextTrainingStatus = getNextTrainingStatus(
                nextTrainingStatus,
                nextDecisionEvaluation.isHit,
                HandCode.Hard20,
                currentDealerSymbol!
            );
        }

        setTrainingStatus(nextTrainingStatus);
        updateTrainingProgress(nextTrainingStatus.trainingProgress);

        if (onBoardingSteps[onBoardingStep] && onBoardingSteps[onBoardingStep].id === 4) {
            updateOnBoardingStep(1);
        }

        if (nextTrainingStatus.isCompleted && !trainingStatus.isCompleted) {
            navigationRef.current?.navigate(RouteNames.trainingCompleted);
        }

        setAreGoldHandsBlockingProgress(
            getAreGoldHandsBlockingProgress(
                gameConfig,
                trainingHands,
                nextTrainingStatus.trainingProgress,
                getProgress(nextTrainingStatus)
            )
        );
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
            gameConfig.useBlueCards,
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
            gameConfig.useBlueCards,
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
        <NavigationContainer ref={navigationRef}>
            <StatusBar hidden={true} />
            <NavBar
                areGoldHandsBlockingProgress={areGoldHandsBlockingProgress}
                attemptedTrainingPairs={trainingStatus.attemptedTrainingPairs}
                navigation={(navigationRef.current as unknown) as AppNavigation}
                onBoardingStep={onBoardingStep}
                passedTrainingPairs={trainingStatus.passedTrainingPairs}
                player={player}
                progress={progress}
                routeName={currentRoute}
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
                <Stack.Screen name={RouteNames.blueCardsInfo} component={BlueCardsInfo} />
                <Stack.Screen name={RouteNames.configMenu}>
                    {(props) => (
                        <ConfigMenu
                            areGoldHandsBlockingProgress={areGoldHandsBlockingProgress}
                            gameConfig={gameConfig}
                            navigation={props.navigation}
                            onBoardingStep={onBoardingStep}
                            phase={phase}
                            progress={progress}
                            setGameConfig={(_gameConfig) => {
                                const nextTrainingHands = getTrainingHands(_gameConfig.casinoRules);
                                setAreGoldHandsBlockingProgress(
                                    getAreGoldHandsBlockingProgress(
                                        _gameConfig,
                                        nextTrainingHands,
                                        trainingStatus.trainingProgress,
                                        progress
                                    )
                                );
                                setGameConfig(_gameConfig);
                                setTrainingHands(nextTrainingHands);
                            }}
                            setTrainingStatus={(_trainingStatus) => {
                                setTrainingStatus(_trainingStatus);
                                setAreGoldHandsBlockingProgress(
                                    getAreGoldHandsBlockingProgress(
                                        gameConfig,
                                        trainingHands,
                                        _trainingStatus.trainingProgress,
                                        getProgress(_trainingStatus)
                                    )
                                );
                                setPlayer({ ...player, cash: 0 });
                            }}
                            trainingHands={trainingHands}
                            trainingStatus={trainingStatus}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name={RouteNames.failedHands}>
                    {(props) => (
                        <FailedHands
                            failedTrainingPairs={trainingStatus.failedTrainingPairs}
                            gameConfig={gameConfig}
                            navigation={props.navigation}
                            onBoardingStep={onBoardingStep}
                            phase={phase}
                            startTrainingRound={startTrainingRound}
                            trainingHands={trainingHands}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name={RouteNames.goldHandsInfo} component={GoldHandsInfo} />
                <Stack.Screen name={RouteNames.goldHandsLevelsInfo}>
                    {() => <GoldHandsLevelsInfo gameConfig={gameConfig} />}
                </Stack.Screen>
                <Stack.Screen name={RouteNames.handDecisions}>
                    {(props) => (
                        <HandDecisions casinoRules={gameConfig.casinoRules} route={props.route} />
                    )}
                </Stack.Screen>
                <Stack.Screen name={RouteNames.onboarding}>
                    {() => (
                        <Onboarding
                            skipOnboardingHandler={exitOnboarding}
                            startOnboardingHandler={() => updateOnBoardingStep(1)}
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
                <Stack.Screen name={RouteNames.trainingCompleted} component={TrainingCompleted} />
                <Stack.Screen name={RouteNames.trainingHands}>
                    {(props) => (
                        <TrainingHands
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
            </Stack.Navigator>

            {onBoardingStep > -1 && (
                <OnboardingBar
                    exitOnboarding={exitOnboarding}
                    nextStepHandler={() => updateOnBoardingStep(1)}
                    onBoardingStep={onBoardingStep}
                    previousStepHandler={() => updateOnBoardingStep(-1)}
                />
            )}
        </NavigationContainer>
    );
}
