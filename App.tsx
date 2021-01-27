import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { getTrainedHands, getGameConfig, updateTrainedHands } from './src/async-storage';
import { NavBar } from './src/components/nav-bar';
import { getOptimalDecision } from './src/logic/basic-strategy';
import { getRandomCard, symbolToSimpleSymbol } from './src/logic/card';
import { getDefaultGameConfig } from './src/logic/game-config';
import {
    canDouble,
    canSplit,
    canSurrender,
    dealCard,
    getHandEffectiveValue,
    isFinished
} from './src/logic/hand';
import { handToHandRepresentation } from './src/logic/hand-representation';
import {
    createPlayer,
    doubleCurrentHand,
    getCurrentHand,
    hitCurrentHand,
    initializeHands,
    isLastHand,
    resolveHands,
    splitCurrentHand,
    standCurrentHand,
    startNextHand,
    surrenderCurrentHand
} from './src/logic/player';
import { getEmptyTrainedHands, getTrainedHandsStats } from './src/logic/trained-hands';
import {
    AppNavigation,
    AppRoute,
    BaseDecisions,
    DecisionEvaluation,
    FailedHand,
    Hand,
    Phases,
    Player,
    PlayerDecision,
    PlayerDecisions,
    RouteNames,
    RouteParams,
    TrainedHands,
    TrainedHandsStats,
    TrainedHandStatus
} from './src/types';
import { BlueCardsInfo } from './src/views/blue-cards-info';
import { ConfigMenu } from './src/views/config-menu';
import { FailedHands } from './src/views/failed-hands';
import { GoldHandsInfo } from './src/views/gold-hands-info';
import { GoldHandsLevelsInfo } from './src/views/gold-hands-levels-info';
import { HandDecisions } from './src/views/hand-decisions';
import { Table } from './src/views/table';
import { TrainingHands } from './src/views/training-hands';

const Stack = createStackNavigator<RouteParams>();

export default function App() {
    const [dealerHand, setDealerHand] = useState<Hand>();
    const [decisionEvaluation, setDecisionEvaluation] = useState<DecisionEvaluation>();
    const [decisionEvaluationTimeout, setDecisionEvaluationTimeout] = useState(0);
    const [failedHands, setFailedHands] = useState<FailedHand[]>([]);
    const [gameConfig, setGameConfig] = useState(getDefaultGameConfig());
    const [phase, setPhase] = useState<Phases>(Phases.finished);
    const [player, setPlayer] = useState<Player>(createPlayer());
    const [trainedHands, setTrainedHands] = useState<TrainedHands>(getEmptyTrainedHands());
    const [trainedHandsStats, setTrainedHandsStats] = useState<TrainedHandsStats>({
        passed: 0,
        trained: 0
    });

    const navigationRef = useRef<NavigationContainerRef>(null);

    useEffect(() => {
        getGameConfig(gameConfig).then((_gameConfig) => setGameConfig(_gameConfig));
        getTrainedHands().then((trainedHands) => {
            if (trainedHands) {
                const _trainedHandsStats = getTrainedHandsStats(trainedHands);

                setFailedHands(_trainedHandsStats.failedHands);
                setTrainedHands(trainedHands);
                setTrainedHandsStats({
                    passed: _trainedHandsStats.passed,
                    trained: _trainedHandsStats.trained
                });
            }
        });
    }, []);

    const currentHand = getCurrentHand(player);
    const isSplitEnabled = currentHand !== undefined && canSplit(currentHand);
    const isDoubleEnabled =
        currentHand !== undefined &&
        canDouble(currentHand, player.hands.length, gameConfig.casinoRules);
    const isSurrenderEnabled =
        currentHand !== undefined &&
        canSurrender(currentHand, player.hands.length, gameConfig.casinoRules);
    const currentDealerSymbol = dealerHand && symbolToSimpleSymbol(dealerHand.cards[0].symbol);

    useEffect(() => {
        if (decisionEvaluationTimeout) {
            clearTimeout(decisionEvaluationTimeout);
        }
        if (decisionEvaluation && decisionEvaluation.hit) {
            const nextTimeout = setTimeout(() => {
                setDecisionEvaluation(undefined);
            }, 1000);
            setDecisionEvaluationTimeout(nextTimeout);
        }
    }, [decisionEvaluation]);

    useEffect(() => {
        if (phase === 'dealer' && dealerHand && getHandEffectiveValue(dealerHand) < 17) {
            setTimeout(() => {
                dealCard(dealerHand, getRandomCard());
                setDealerHand({ ...dealerHand });
            }, 1000);
        } else if (phase === 'dealer') {
            resolveHands(player, dealerHand!);
            setPlayer({ ...player });
            setPhase(Phases.finished);
        }
    }, [phase, dealerHand]);

    const startTrainingRound = (playerHand: Hand, dealerHand: Hand) => {
        initializeHands(player, playerHand);
        setDealerHand(dealerHand);
        setPlayer({ ...player });
        setPhase(Phases.player);
        setDecisionEvaluation(undefined);
        if (isFinished(getCurrentHand(player))) {
            finishCurrentHand(player);
        }
    };

    const finishCurrentHand = (player: Player) => {
        if (isLastHand(player)) {
            setPhase(Phases.dealer);
            // By setting the phase to dealer, the corresponding useEffect hook will be executed
        } else {
            startNextHand(player, gameConfig.useBlueCards, currentDealerSymbol!, trainedHands);
            setPlayer({ ...player });
            if (isFinished(getCurrentHand(player))) {
                finishCurrentHand(player);
            }
        }
    };

    const evaluatePlayerDecision = (decision: PlayerDecision, hand: Hand) => {
        const optimalDecision = getOptimalDecision(hand, dealerHand!, gameConfig.casinoRules, {
            canDouble: isDoubleEnabled,
            canSurrender: isSurrenderEnabled
        });
        const isHit = optimalDecision.decision === decision;
        setDecisionEvaluation({
            hit: isHit,
            message: isHit ? 'Well done!' : optimalDecision.description
        });

        const handRepresentation = handToHandRepresentation(currentHand);

        if (isHit) {
            setFailedHands(
                failedHands.filter(
                    (failedHand) =>
                        failedHand.dealerSymbol !== currentDealerSymbol! ||
                        failedHand.handRepresentation !== handRepresentation
                )
            );
        } else {
            if (
                !failedHands.some(
                    (failedHand) =>
                        failedHand.dealerSymbol === currentDealerSymbol! &&
                        failedHand.handRepresentation === handRepresentation
                )
            ) {
                setFailedHands(
                    [{ dealerSymbol: currentDealerSymbol!, handRepresentation }].concat(failedHands)
                );
            }
        }

        const nextTrainedHands: TrainedHands = { ...trainedHands };
        const currentTrainedHandStatus = nextTrainedHands[handRepresentation][currentDealerSymbol!];

        setTrainedHandsStats({
            passed:
                trainedHandsStats.passed +
                (currentTrainedHandStatus !== TrainedHandStatus.passed && isHit
                    ? 1
                    : currentTrainedHandStatus === TrainedHandStatus.passed &&
                      optimalDecision.decision !== decision
                    ? -1
                    : 0),
            trained:
                trainedHandsStats.trained +
                (currentTrainedHandStatus === TrainedHandStatus.untrained ? 1 : 0)
        });

        nextTrainedHands[handToHandRepresentation(currentHand)][currentDealerSymbol!] = isHit
            ? TrainedHandStatus.passed
            : TrainedHandStatus.failed;

        setTrainedHands(nextTrainedHands);
        updateTrainedHands(nextTrainedHands);
    };

    const doubleHandler = () => {
        evaluatePlayerDecision(PlayerDecisions.double, currentHand);
        doubleCurrentHand(player, getRandomCard());

        setPlayer({ ...player });
        finishCurrentHand(player);
    };

    const hitHandler = () => {
        evaluatePlayerDecision(BaseDecisions.hit, currentHand);
        hitCurrentHand(player, gameConfig.useBlueCards, currentDealerSymbol!, trainedHands);

        setPlayer({ ...player });
        if (isFinished(currentHand)) {
            finishCurrentHand(player);
        }
    };

    const standHandler = () => {
        evaluatePlayerDecision(BaseDecisions.stand, currentHand);
        standCurrentHand(player);
        setPlayer({ ...player });
        finishCurrentHand(player);
    };

    const splitHandler = () => {
        evaluatePlayerDecision(BaseDecisions.split, currentHand);
        splitCurrentHand(player, gameConfig.useBlueCards, currentDealerSymbol!, trainedHands);

        setPlayer({ ...player });
        if (isFinished(getCurrentHand(player))) {
            finishCurrentHand(player);
        }
    };

    const surrenderHandler = () => {
        evaluatePlayerDecision(PlayerDecisions.surrender, currentHand);
        surrenderCurrentHand(player);
        setPlayer({ ...player });
        finishCurrentHand(player);
    };

    return (
        <NavigationContainer ref={navigationRef}>
            <StatusBar hidden={true} />
            <NavBar
                navigation={(navigationRef.current as unknown) as AppNavigation}
                player={player}
                route={navigationRef.current?.getCurrentRoute() as AppRoute<RouteNames>}
                trainedHandsStats={trainedHandsStats}
            />
            <Stack.Navigator
                initialRouteName={RouteNames.table}
                screenOptions={{
                    headerShown: false,
                    cardStyle: {
                        backgroundColor: '#088446'
                    }
                }}
            >
                <Stack.Screen name={RouteNames.blueCardsInfo} component={BlueCardsInfo} />
                <Stack.Screen name={RouteNames.configMenu}>
                    {(props) => (
                        <ConfigMenu
                            gameConfig={gameConfig}
                            navigation={props.navigation}
                            setGameConfig={setGameConfig}
                            setTrainedHands={setTrainedHands}
                            setTrainedHandsStats={setTrainedHandsStats}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name={RouteNames.failedHands}>
                    {(props) => (
                        <FailedHands
                            failedHands={failedHands}
                            navigation={props.navigation}
                            phase={phase}
                            startTrainingRound={startTrainingRound}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name={RouteNames.goldHandsInfo} component={GoldHandsInfo} />
                <Stack.Screen
                    name={RouteNames.goldHandsLevelsInfo}
                    component={GoldHandsLevelsInfo}
                />
                <Stack.Screen name={RouteNames.handDecisions}>
                    {(props) => <HandDecisions gameConfig={gameConfig} route={props.route} />}
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
                            isSplitEnabled={isSplitEnabled}
                            isSurrenderEnabled={isSurrenderEnabled}
                            navigation={props.navigation}
                            player={player}
                            phase={phase}
                            startTrainingRound={startTrainingRound}
                            trainedHands={trainedHands}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name={RouteNames.trainingHands}>
                    {(props) => (
                        <TrainingHands
                            navigation={props.navigation}
                            phase={phase}
                            startTrainingRound={startTrainingRound}
                            trainedHands={trainedHands}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
