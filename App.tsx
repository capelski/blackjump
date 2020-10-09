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
    createHandsSet,
    dealToCurrentHand,
    getCurrentHand,
    isLastHand,
    resolveHandsSet,
    splitCurrentHand,
    startNextHand,
    surrenderCurrentHand
} from './src/logic/hands-set';
import { getAllTrainingPairs, trainingPairToTrainingHands } from './src/logic/training-hands';
import {
    Decision,
    DecisionEvaluation,
    GameConfig,
    Hand,
    HandsSet,
    Phases,
    ScreenTypes
} from './src/types';

const allTrainingPairs = getAllTrainingPairs();
const cardSet = getCardSet();

export default function App() {
    const [currentTrainingPair, setCurrentTrainingPair] = useState(-1);
    const [currentScreen, setCurrentScreen] = useState<ScreenTypes>(ScreenTypes.table);
    const [dealerHand, setDealerHand] = useState<Hand | undefined>();
    const [decisionEvaluation, setDecisionEvaluation] = useState<DecisionEvaluation | undefined>();
    const [decisionEvaluationTimeout, setDecisionEvaluationTimeout] = useState(0);
    const [gameConfig, setGameConfig] = useState<GameConfig>({
        canDoubleOnAnyInitialHand: false,
        canDoubleAfterSplit: true,
        canSurrender: false
    });
    const [phase, setPhase] = useState<Phases>(Phases.finished);
    const [handsSet, setHandsSet] = useState<HandsSet | undefined>();
    const [totalAttemptedDecisions, setTotalAttemptedDecisions] = useState(0);
    const [totalRightDecisions, setTotalRightDecisions] = useState(0);

    const currentHand = handsSet && getCurrentHand(handsSet);
    const isSplitEnabled = currentHand !== undefined && canSplit(currentHand);
    const isDoubleEnabled =
        currentHand !== undefined && canDouble(currentHand, handsSet!.hands.length, gameConfig);
    const isSurrenderEnabled =
        currentHand !== undefined && canSurrender(currentHand, handsSet!.hands.length, gameConfig);

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
            resolveHandsSet(handsSet!, dealerHand!);

            setHandsSet({ ...handsSet! });
            setPhase(Phases.finished);
        }
    }, [phase, dealerHand]);

    // TODO Extract application logic to separate file
    // TODO Simplify ! on nullable state variables
    const startTrainingRound = () => {
        collectPlayedCards(cardSet);
        setCurrentTrainingPair((currentTrainingPair + 1) % allTrainingPairs.length);
        const nextTrainingHands = trainingPairToTrainingHands(
            allTrainingPairs[currentTrainingPair + 1],
            cardSet
        );
        setDealerHand(nextTrainingHands.dealerHand);
        setHandsSet(createHandsSet(nextTrainingHands.playerHand));
        setPhase(Phases.player);
        setDecisionEvaluation(undefined);
    };

    const finishCurrentHand = (currentHandsSet: HandsSet) => {
        if (isLastHand(currentHandsSet)) {
            setPhase(Phases.dealer);
            // By setting the phase to dealer, the corresponding useEffect hook will be executed
        } else {
            startNextHand(currentHandsSet, cardSet);
            const nextHandsSet = { ...currentHandsSet! };
            setHandsSet(nextHandsSet);
            if (isFinished(getCurrentHand(nextHandsSet))) {
                finishCurrentHand(nextHandsSet);
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
        evaluatePlayerDecision('double', currentHand!);
        dealToCurrentHand(handsSet!, cardSet);

        const nextHandsSet = { ...handsSet! };
        setHandsSet(nextHandsSet);
        finishCurrentHand(nextHandsSet);
    };

    const hitHandler = () => {
        evaluatePlayerDecision('hit', currentHand!);
        dealToCurrentHand(handsSet!, cardSet);

        const nextHandsSet = { ...handsSet! };
        setHandsSet(nextHandsSet);
        if (isFinished(getCurrentHand(nextHandsSet))) {
            finishCurrentHand(nextHandsSet);
        }
    };

    const standHandler = () => {
        evaluatePlayerDecision('stand', currentHand!);
        finishCurrentHand(handsSet!);
    };

    const splitHandler = () => {
        evaluatePlayerDecision('split', currentHand!);
        splitCurrentHand(handsSet!, cardSet);

        const nextHandsSet = { ...handsSet! };
        setHandsSet(nextHandsSet);
        if (isFinished(getCurrentHand(nextHandsSet))) {
            finishCurrentHand(nextHandsSet);
        }
    };

    const surrenderHandler = () => {
        evaluatePlayerDecision('surrender', currentHand!);
        surrenderCurrentHand(handsSet!);
        const nextHandsSet = { ...handsSet! };
        setHandsSet(nextHandsSet);
        finishCurrentHand(nextHandsSet);
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
                    <Table dealerHand={dealerHand} handsSet={handsSet} phase={phase} />
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
                currentScreen={currentScreen}
                onConfigClick={configBarClickHandler}
                totalAttemptedDecisions={totalAttemptedDecisions}
                totalRightDecisions={totalRightDecisions}
            />
        </View>
    );
}
