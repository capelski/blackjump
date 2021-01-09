import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { getTrainedHands, getGameConfig, updateTrainedHands } from './src/async-storage';
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
import { getEmptyTrainedHands } from './src/logic/trained-hands';
import {
    BaseDecisions,
    DecisionEvaluation,
    Hand,
    Phases,
    Player,
    PlayerDecision,
    PlayerDecisions,
    ScreenTypes,
    TrainedHands,
    TrainedHandsStats,
    TrainedHandStatus
} from './src/types';
import { BlueCardsInfo } from './src/views/blue-cards-info';
import { ConfigMenu } from './src/views/config-menu';
import { GoldHandsInfo } from './src/views/gold-hands-info';
import { GoldHandsLevelsInfo } from './src/views/gold-hands-levels-info';
import { HandDecisions } from './src/views/hand-decisions';
import { Table } from './src/views/table';
import { TrainingHands } from './src/views/training-hands';

const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            // TODO Extract the navigation bar and wrap the AppContainer
            [ScreenTypes.blueCardsInfo]: { screen: BlueCardsInfo },
            [ScreenTypes.configMenu]: { screen: ConfigMenu },
            [ScreenTypes.goldHandsInfo]: { screen: GoldHandsInfo },
            [ScreenTypes.goldHandsLevelsInfo]: { screen: GoldHandsLevelsInfo },
            [ScreenTypes.handDecisions]: { screen: HandDecisions },
            [ScreenTypes.table]: { screen: Table },
            [ScreenTypes.trainingHands]: { screen: TrainingHands }
        },
        {
            initialRouteName: ScreenTypes.table
        }
    )
);

export default function App() {
    const [dealerHand, setDealerHand] = useState<Hand>();
    const [decisionEvaluation, setDecisionEvaluation] = useState<DecisionEvaluation>();
    const [decisionEvaluationTimeout, setDecisionEvaluationTimeout] = useState(0);
    const [gameConfig, setGameConfig] = useState(getDefaultGameConfig());
    const [phase, setPhase] = useState<Phases>(Phases.finished);
    const [player, setPlayer] = useState<Player>(createPlayer());
    const [trainedHands, setTrainedHands] = useState<TrainedHands>(getEmptyTrainedHands());
    const [trainedHandsStats, setTrainedHandsStats] = useState<TrainedHandsStats>({
        passed: 0,
        trained: 0
    });

    useEffect(() => {
        getGameConfig(gameConfig).then((_gameConfig) => setGameConfig(_gameConfig));
        getTrainedHands().then((trainedHands) => {
            if (trainedHands) {
                setTrainedHands(trainedHands);
                const _trainedHandsStats = Object.values(trainedHands).reduce(
                    (reduced, trainedHand) => {
                        return Object.values(trainedHand).reduce((handReduced, handStatus) => {
                            return {
                                passed:
                                    handReduced.passed +
                                    (handStatus === TrainedHandStatus.passed ? 1 : 0),
                                trained:
                                    handReduced.trained +
                                    (handStatus !== TrainedHandStatus.untrained ? 1 : 0)
                            };
                        }, reduced);
                    },
                    { passed: 0, trained: 0 }
                );
                setTrainedHandsStats(_trainedHandsStats);
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
            startNextHand(
                player,
                gameConfig.useBlueCards,
                symbolToSimpleSymbol(dealerHand!.cards[0].symbol),
                trainedHands
            );
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
        setDecisionEvaluation({ hit: isHit, failureReason: optimalDecision.description });

        const nextTrainedHands: TrainedHands = { ...trainedHands };
        const currentTrainedHandStatus =
            nextTrainedHands[handToHandRepresentation(currentHand)][
                symbolToSimpleSymbol(dealerHand!.cards[0].symbol)
            ];

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

        nextTrainedHands[handToHandRepresentation(currentHand)][
            symbolToSimpleSymbol(dealerHand!.cards[0].symbol)
        ] = isHit ? TrainedHandStatus.passed : TrainedHandStatus.failed;

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
        hitCurrentHand(
            player,
            gameConfig.useBlueCards,
            symbolToSimpleSymbol(dealerHand!.cards[0].symbol),
            trainedHands
        );

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
        splitCurrentHand(
            player,
            gameConfig.useBlueCards,
            symbolToSimpleSymbol(dealerHand!.cards[0].symbol),
            trainedHands
        );

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
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#088446'
            }}
        >
            <StatusBar hidden={true} />
            <AppContainer
                // TODO Find a more elegant way to pass the props to components
                screenProps={{
                    dealerHand,
                    decisionEvaluation,
                    gameConfig,
                    handlers: {
                        double: doubleHandler,
                        hit: hitHandler,
                        split: splitHandler,
                        stand: standHandler,
                        surrender: surrenderHandler
                    },
                    isDoubleEnabled,
                    isSplitEnabled,
                    isSurrenderEnabled,
                    player,
                    phase,
                    setGameConfig,
                    setTrainedHands,
                    setTrainedHandsStats,
                    startTrainingRound,
                    trainedHands,
                    trainedHandsStats
                }}
            />
        </View>
    );
}
