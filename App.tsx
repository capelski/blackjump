import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { getTrainedHands, getGameConfig, updateTrainedHands } from './src/async-storage';
import { BadDecisions } from './src/components/bad-decisions';
import { ConfigMenu } from './src/components/config-menu';
import { HandDecisions } from './src/components/hand-decisions';
import { HandsLevelInfo } from './src/components/hands-level-info';
import { Table } from './src/components/table';
import { TrainedHandsComponent } from './src/components/trained-hands-component';
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
    BadDecision,
    BaseDecisions,
    DecisionEvaluation,
    Hand,
    Phases,
    Player,
    PlayerDecision,
    PlayerDecisions,
    ScreenTypes,
    TrainedHands
} from './src/types';
import { TrainedHandStatus, TrainingPair } from './src/types/training';

const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            [ScreenTypes.badDecisions]: { screen: BadDecisions },
            [ScreenTypes.configMenu]: { screen: ConfigMenu },
            [ScreenTypes.handDecisions]: { screen: HandDecisions },
            [ScreenTypes.handsLevelInfo]: { screen: HandsLevelInfo },
            [ScreenTypes.table]: { screen: Table },
            [ScreenTypes.trainedHands]: { screen: TrainedHandsComponent }
        },
        {
            initialRouteName: ScreenTypes.table
        }
    )
);

export default function App() {
    const [badDecisions, setBadDecisions] = useState<BadDecision[]>([]);
    const [dealerHand, setDealerHand] = useState<Hand>();
    const [decisionEvaluation, setDecisionEvaluation] = useState<DecisionEvaluation>();
    const [decisionEvaluationTimeout, setDecisionEvaluationTimeout] = useState(0);
    const [gameConfig, setGameConfig] = useState(getDefaultGameConfig());
    const [phase, setPhase] = useState<Phases>(Phases.finished);
    const [player, setPlayer] = useState<Player>(createPlayer());
    const [totalAttemptedDecisions, setTotalAttemptedDecisions] = useState(0);
    const [totalRightDecisions, setTotalRightDecisions] = useState(0);
    const [trainedHands, setTrainedHands] = useState<TrainedHands>(getEmptyTrainedHands());

    useEffect(() => {
        getGameConfig(gameConfig).then((_gameConfig) => setGameConfig(_gameConfig));
        getTrainedHands().then((trainedHands) => {
            if (trainedHands) {
                setTrainedHands(trainedHands);
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
    };

    const finishCurrentHand = (player: Player) => {
        if (isLastHand(player)) {
            setPhase(Phases.dealer);
            // By setting the phase to dealer, the corresponding useEffect hook will be executed
        } else {
            startNextHand(
                player,
                gameConfig.reachUntrainedHands,
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

        const nextTrainedHands: TrainedHands = { ...trainedHands };
        nextTrainedHands[handToHandRepresentation(currentHand)][
            symbolToSimpleSymbol(dealerHand!.cards[0].symbol)
        ] =
            optimalDecision.decision === decision
                ? TrainedHandStatus.passed
                : TrainedHandStatus.failed;

        setTrainedHands(nextTrainedHands);
        updateTrainedHands(nextTrainedHands);

        setTotalAttemptedDecisions(totalAttemptedDecisions + 1);
        if (optimalDecision.decision === decision) {
            setDecisionEvaluation({ hit: true });
            setTotalRightDecisions(totalRightDecisions + 1);
        } else {
            setDecisionEvaluation({ hit: false, failureReason: optimalDecision.description });
            setBadDecisions(
                badDecisions.concat([
                    {
                        dealerHandValue: getHandEffectiveValue(dealerHand!),
                        casinoRules: gameConfig.casinoRules,
                        handRepresentation: handToHandRepresentation(hand),
                        takenAction: decision
                    }
                ])
            );
        }
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
            gameConfig.reachUntrainedHands,
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
            gameConfig.reachUntrainedHands,
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
                    badDecisions,
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
                    startTrainingRound,
                    totalAttemptedDecisions,
                    totalRightDecisions,
                    trainedHands
                }}
            />
        </View>
    );
}
