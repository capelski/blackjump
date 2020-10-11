import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Actions } from './src/components/actions';
import { ConfigBar } from './src/components/config-bar';
import { ConfigMenu } from './src/components/config-menu';
import { DecisionEvaluationComponent } from './src/components/decision-evaluation';
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
    surrenderCurrentHand
} from './src/logic/player';
import { getAllTrainingPairs, trainingPairToTrainingHands } from './src/logic/training-hands';
import {
    Decision,
    DecisionEvaluation,
    GameConfig,
    Hand,
    Phases,
    Player,
    ScreenTypes
} from './src/types';

const allTrainingPairs = getAllTrainingPairs();
const cardSet = getCardSet();

export default function App() {
    const [currentTrainingPair, setCurrentTrainingPair] = useState(-1);
    const [currentScreen, setCurrentScreen] = useState<ScreenTypes>(ScreenTypes.table);
    const [dealerHand, setDealerHand] = useState<Hand>();
    const [decisionEvaluation, setDecisionEvaluation] = useState<DecisionEvaluation>();
    const [decisionEvaluationTimeout, setDecisionEvaluationTimeout] = useState(0);
    const [gameConfig, setGameConfig] = useState<GameConfig>({
        canDoubleOnAnyInitialHand: false,
        canDoubleAfterSplit: true,
        canSurrender: false
    });
    const [phase, setPhase] = useState<Phases>(Phases.finished);
    const [player, setPlayer] = useState<Player>(createPlayer());
    const [totalAttemptedDecisions, setTotalAttemptedDecisions] = useState(0);
    const [totalRightDecisions, setTotalRightDecisions] = useState(0);

    const currentHand = getCurrentHand(player);
    const isSplitEnabled = currentHand !== undefined && canSplit(currentHand);
    const isDoubleEnabled =
        currentHand !== undefined && canDouble(currentHand, player.hands.length, gameConfig);
    const isSurrenderEnabled =
        currentHand !== undefined && canSurrender(currentHand, player.hands.length, gameConfig);
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

    // TODO Extract application logic to separate file
    const startTrainingRound = () => {
        collectPlayedCards(cardSet);
        setCurrentTrainingPair((currentTrainingPair + 1) % allTrainingPairs.length);
        const nextTrainingHands = trainingPairToTrainingHands(
            allTrainingPairs[currentTrainingPair + 1],
            cardSet
        );
        setDealerHand(nextTrainingHands.dealerHand);
        initializeHands(player, nextTrainingHands.playerHand);
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

    const evaluatePlayerDecision = (decision: Decision, hand: Hand) => {
        const optimalDecision = getOptimalDecision(hand, dealerHand!, {
            canDouble: isDoubleEnabled,
            canDoubleAfterSplit: gameConfig.canDoubleAfterSplit,
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
        evaluatePlayerDecision('double', currentHand);
        doubleCurrentHand(player, cardSet);

        setPlayer({ ...player });
        finishCurrentHand(player);
    };

    const hitHandler = () => {
        evaluatePlayerDecision('hit', currentHand);
        hitCurrentHand(player, cardSet);

        setPlayer({ ...player });
        if (isFinished(currentHand)) {
            finishCurrentHand(player);
        }
    };

    const standHandler = () => {
        evaluatePlayerDecision('stand', currentHand);
        finishCurrentHand(player);
    };

    const splitHandler = () => {
        evaluatePlayerDecision('split', currentHand);
        splitCurrentHand(player, cardSet);

        setPlayer({ ...player });
        if (isFinished(getCurrentHand(player))) {
            finishCurrentHand(player);
        }
    };

    const surrenderHandler = () => {
        evaluatePlayerDecision('surrender', currentHand);
        surrenderCurrentHand(player);
        setPlayer({ ...player });
        finishCurrentHand(player);
    };

    const configBarClickHandler = () => {
        setCurrentScreen(
            currentScreen === ScreenTypes.table ? ScreenTypes.config : ScreenTypes.table
        );
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
            {currentScreen === ScreenTypes.table && (
                <React.Fragment>
                    <DecisionEvaluationComponent decisionEvaluation={decisionEvaluation} />
                    <Table dealerHand={dealerHand} phase={phase} player={player} />
                    <Actions
                        doubleHandler={doubleHandler}
                        hitHandler={hitHandler}
                        isDoubleEnabled={isDoubleEnabled}
                        isSplitEnabled={isSplitEnabled}
                        isSurrenderEnabled={isSurrenderEnabled}
                        phase={phase}
                        splitHandler={splitHandler}
                        standHandler={standHandler}
                        startTrainingRound={startTrainingRound}
                        surrenderHandler={surrenderHandler}
                    />
                </React.Fragment>
            )}
            {currentScreen === ScreenTypes.config && (
                <ConfigMenu
                    gameConfig={gameConfig}
                    setCurrentScreen={setCurrentScreen}
                    setGameConfig={setGameConfig}
                />
            )}
            <ConfigBar
                playerCash={player.cash}
                currentScreen={currentScreen}
                onConfigClick={configBarClickHandler}
                totalAttemptedDecisions={totalAttemptedDecisions}
                totalRightDecisions={totalRightDecisions}
            />
        </View>
    );
}
