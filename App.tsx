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
    createHand,
    dealCard,
    getHandEffectiveValue,
    isFinished,
    resolveHand
} from './src/logic/hand';
import { getCurrentHand, isLastHand, startNextHand } from './src/logic/hands-set';
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
                setDealerHand(dealCard(dealerHand, cardSet));
            }, 1000);
        } else if (phase === 'dealer') {
            setHandsSet({
                currentHand: handsSet!.currentHand,
                hands: handsSet!.hands.map((playerHand) => {
                    resolveHand(playerHand, dealerHand!);
                    return playerHand;
                })
            });
            setPhase(Phases.finished);
        }
    }, [phase, dealerHand]);

    // TODO Extract application logic to separate file => hands-set.ts
    const startTrainingRound = () => {
        collectPlayedCards(cardSet);
        setCurrentTrainingPair((currentTrainingPair + 1) % allTrainingPairs.length);
        const nextTrainingHands = trainingPairToTrainingHands(
            allTrainingPairs[currentTrainingPair + 1],
            cardSet
        );
        setDealerHand(nextTrainingHands.dealerHand);
        setHandsSet({
            currentHand: 0,
            hands: nextTrainingHands.playerHands
        });
        setPhase(Phases.player);
        setDecisionEvaluation(undefined);
    };

    const finishTrainingRound = (currentHandsSet: HandsSet) => {
        if (!isLastHand(currentHandsSet)) {
            const nextHandsSet = startNextHand(currentHandsSet, cardSet);
            setHandsSet(nextHandsSet);
            if (isFinished(getCurrentHand(nextHandsSet))) {
                finishTrainingRound(nextHandsSet);
            }
        } else {
            setPhase(Phases.dealer);
            // By setting the phase to dealer, the corresponding useEffect hook will be executed
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
        const nextHandsSet: HandsSet = {
            currentHand: handsSet!.currentHand,
            hands: handsSet!.hands.map((hand, handIndex) => {
                return handIndex === handsSet!.currentHand ? dealCard(hand, cardSet) : hand;
            })
        };
        setHandsSet(nextHandsSet);
        finishTrainingRound(nextHandsSet);
    };

    const hitHandler = () => {
        evaluatePlayerDecision('hit', currentHand!);
        const nextHandsSet: HandsSet = {
            currentHand: handsSet!.currentHand,
            hands: handsSet!.hands.map((hand, handIndex) => {
                return handIndex === handsSet!.currentHand ? dealCard(hand, cardSet) : hand;
            })
        };
        setHandsSet(nextHandsSet);
        if (isFinished(getCurrentHand(nextHandsSet))) {
            finishTrainingRound(nextHandsSet);
        }
    };

    const standHandler = () => {
        evaluatePlayerDecision('stand', currentHand!);
        finishTrainingRound(handsSet!);
    };

    const splitHandler = () => {
        evaluatePlayerDecision('split', currentHand!);
        const firstHand = createHand([currentHand!.cards[0]]);
        const secondHand = createHand([currentHand!.cards[1]]);
        const nextHandsSet: HandsSet = {
            currentHand: handsSet!.currentHand,
            hands: handsSet!.hands.map((h) => h)
        };
        nextHandsSet.hands.splice(
            nextHandsSet.currentHand,
            1,
            dealCard(firstHand, cardSet),
            secondHand
        );
        setHandsSet(nextHandsSet);
        if (isFinished(getCurrentHand(nextHandsSet))) {
            finishTrainingRound(nextHandsSet);
        }
    };

    const surrenderHandler = () => {
        evaluatePlayerDecision('surrender', currentHand!);
        // TODO Bring the cards back to the cardSet!
        const nextHandsSet = {
            currentHand: 0,
            hands: []
        };
        setHandsSet(nextHandsSet);
        finishTrainingRound(nextHandsSet);
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
