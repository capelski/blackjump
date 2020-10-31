import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { ConfigMenu } from './src/components/config-menu';
import { Decisions } from './src/components/decisions';
import { Table } from './src/components/table';
import { getOptimalDecision } from './src/logic/basic-strategy';
import { getCardSet, collectPlayedCards } from './src/logic/card-set';
import {
    canDouble,
    canSplit,
    canSurrender,
    dealCard,
    getHandEffectiveValue,
    isFinished
} from './src/logic/hand';
import {
    createPlayer,
    doubleCurrentHand,
    hitCurrentHand,
    getCurrentHand,
    initializeHands,
    isLastHand,
    resolveHands,
    splitCurrentHand,
    startNextHand,
    surrenderCurrentHand,
    standCurrentHand
} from './src/logic/player';
import { trainingPairToTrainingHands } from './src/logic/training-hands';
import { initialTrainingStatus } from './src/logic/training-status';
import {
    BaseDecisions,
    DecisionEvaluation,
    Hand,
    Phases,
    Player,
    PlayerDecision,
    PlayerDecisions,
    ScreenTypes
} from './src/types';

const cardSet = getCardSet();

const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            [ScreenTypes.configMenu]: { screen: ConfigMenu },
            [ScreenTypes.decisions]: { screen: Decisions },
            [ScreenTypes.table]: { screen: Table }
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
    const [phase, setPhase] = useState<Phases>(Phases.finished);
    const [player, setPlayer] = useState<Player>(createPlayer());
    const [totalAttemptedDecisions, setTotalAttemptedDecisions] = useState(0);
    const [totalRightDecisions, setTotalRightDecisions] = useState(0);
    const [trainingStatus, setTrainingStatus] = useState(initialTrainingStatus);

    const currentHand = getCurrentHand(player);
    const isSplitEnabled = currentHand !== undefined && canSplit(currentHand);
    const isDoubleEnabled =
        currentHand !== undefined &&
        canDouble(currentHand, player.hands.length, trainingStatus.gameSettings);
    const isSurrenderEnabled =
        currentHand !== undefined &&
        canSurrender(currentHand, player.hands.length, trainingStatus.gameSettings);

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
                dealCard(dealerHand, cardSet);
                setDealerHand({ ...dealerHand });
            }, 1000);
        } else if (phase === 'dealer') {
            resolveHands(player, dealerHand!);
            setPlayer({ ...player });
            setPhase(Phases.finished);
        }
    }, [phase, dealerHand]);

    const startTrainingRound = () => {
        collectPlayedCards(cardSet);
        const nextTrainingPair =
            (trainingStatus.currentTrainingPair + 1) % trainingStatus.selectedTrainingPairs.length;
        setTrainingStatus({
            ...trainingStatus,
            currentTrainingPair: nextTrainingPair
        });
        const nextTrainingHands = trainingPairToTrainingHands(
            trainingStatus.selectedTrainingPairs[nextTrainingPair],
            cardSet
        );
        initializeHands(player, nextTrainingHands.playerHand);

        setDealerHand(nextTrainingHands.dealerHand);
        setPlayer({ ...player });
        setPhase(Phases.player);
        setDecisionEvaluation(undefined);
    };

    const finishCurrentHand = (player: Player) => {
        if (isLastHand(player)) {
            setPhase(Phases.dealer);
            // By setting the phase to dealer, the corresponding useEffect hook will be executed
        } else {
            startNextHand(player, cardSet);
            setPlayer({ ...player });
            if (isFinished(getCurrentHand(player))) {
                finishCurrentHand(player);
            }
        }
    };

    const evaluatePlayerDecision = (decision: PlayerDecision, hand: Hand) => {
        const optimalDecision = getOptimalDecision(hand, dealerHand!, trainingStatus.gameSettings, {
            canDouble: isDoubleEnabled,
            canSurrender: isSurrenderEnabled
        });

        setTotalAttemptedDecisions(totalAttemptedDecisions + 1);
        if (optimalDecision.decision === decision) {
            setDecisionEvaluation({ hit: true });
            setTotalRightDecisions(totalRightDecisions + 1);
        } else {
            setDecisionEvaluation({ hit: false, failureReason: optimalDecision.description });
        }
    };

    const doubleHandler = () => {
        evaluatePlayerDecision(PlayerDecisions.double, currentHand);
        doubleCurrentHand(player, cardSet);

        setPlayer({ ...player });
        finishCurrentHand(player);
    };

    const hitHandler = () => {
        evaluatePlayerDecision(BaseDecisions.hit, currentHand);
        hitCurrentHand(player, cardSet);

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
        splitCurrentHand(player, cardSet);

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
                    doubleHandler,
                    gameSettings: trainingStatus.gameSettings,
                    hitHandler,
                    isDoubleEnabled,
                    isSplitEnabled,
                    isSurrenderEnabled,
                    player,
                    phase,
                    setTrainingStatus,
                    splitHandler,
                    standHandler,
                    startTrainingRound,
                    surrenderHandler,
                    totalAttemptedDecisions,
                    totalRightDecisions,
                    trainingStatus
                }}
            />
        </View>
    );
}
