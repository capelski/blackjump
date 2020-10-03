import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Actions } from './src/components/actions';
import { DecisionEvaluationComponent } from './src/components/decision-evaluation';
import { HandComponent } from './src/components/hand';
import { getOptimalDecision } from './src/logic/basic-strategy';
import { getCardSet, collectPlayedCards, getCardEffectiveValue } from './src/logic/card-set';
import { getHandEffectiveValue, dealCard, createHand } from './src/logic/hand';
import { getAllTrainingPairs, trainingPairToTrainingHands } from './src/logic/training-hands';
import { Decision, DecisionEvaluation, Hand, Phases } from './src/types';

const allTrainingPairs = getAllTrainingPairs();
const cardSet = getCardSet();

// TODO Highlight current hand when more than one

export default function App() {
    const [currentTrainingPair, setCurrentTrainingPair] = useState(0);
    const [dealerHand, setDealerHand] = useState<Hand | undefined>();
    const [decisionEvaluation, setDecisionEvaluation] = useState<DecisionEvaluation | undefined>();
    const [decisionEvaluationTimeout, setDecisionEvaluationTimeout] = useState(0);
    const [phase, setPhase] = useState<Phases>(Phases.finished);
    const [playerHands, setPlayerHands] = useState<Hand[] | undefined>();
    const [playerHandIndex, setPlayerHandIndex] = useState(0);

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
            setPhase(Phases.finished);
            // TODO Display hands result (e.g. Dealer wins, Push, Player wins, etc.)
        }
    }, [phase, dealerHand]);

    const startTrainingRound = () => {
        collectPlayedCards(cardSet);
        setCurrentTrainingPair(currentTrainingPair + 1);
        const nextTrainingHands = trainingPairToTrainingHands(
            allTrainingPairs[currentTrainingPair + 1],
            cardSet
        );
        setDealerHand(nextTrainingHands.dealerHand);
        setPlayerHands(nextTrainingHands.playerHands);
        setPlayerHandIndex(0);
        setPhase(Phases.player);
        setDecisionEvaluation(undefined);
    };

    const finishTrainingRound = (currentPlayerHands: Hand[]) => {
        if (currentPlayerHands!.length - 1 > playerHandIndex) {
            const nextPlayerHandIndex = playerHandIndex + 1;
            const nextHands = currentPlayerHands!.map((hand, handIndex) => {
                return handIndex === nextPlayerHandIndex ? dealCard(hand, cardSet) : hand;
            });
            setPlayerHands(nextHands);
            setPlayerHandIndex(nextPlayerHandIndex);
            if (getHandEffectiveValue(playerHands![playerHandIndex]) === 21) {
                setPhase(Phases.dealer);
            }
        } else {
            setPhase(Phases.dealer);
            // By setting the phase to dealer, the corresponding useEffect hook will be executed
        }
    };

    const evaluatePlayerDecision = (decision: Decision, hand: Hand) => {
        const optimalDecision = getOptimalDecision(hand, dealerHand!);
        if (optimalDecision.decision === decision) {
            setDecisionEvaluation({ hit: true });
        } else {
            setDecisionEvaluation({ hit: false, failureReason: optimalDecision.description });
        }
    };

    const doubleHandler = () => {
        evaluatePlayerDecision('double', playerHands![playerHandIndex]);
        const nextHands = playerHands!.map((hand, handIndex) => {
            return handIndex === playerHandIndex ? dealCard(hand, cardSet) : hand;
        });
        setPlayerHands(nextHands);
        finishTrainingRound(nextHands);
    };

    const hitHandler = () => {
        evaluatePlayerDecision('hit', playerHands![playerHandIndex]);
        const nextHands = playerHands!.map((hand, handIndex) => {
            return handIndex === playerHandIndex ? dealCard(hand, cardSet) : hand;
        });
        setPlayerHands(nextHands);
        if (getHandEffectiveValue(nextHands[playerHandIndex]) >= 21) {
            finishTrainingRound(nextHands);
        }
    };

    const standHandler = () => {
        evaluatePlayerDecision('stand', playerHands![playerHandIndex]);
        finishTrainingRound(playerHands!);
    };

    const splitHandler = () => {
        evaluatePlayerDecision('split', playerHands![playerHandIndex]);
        const currentHand = playerHands![playerHandIndex];
        const firstHand = createHand([currentHand.cards[0]]);
        const secondHand = createHand([currentHand.cards[1]]);
        const nextHands = playerHands!.map((h) => h);
        nextHands.splice(playerHandIndex, 1, dealCard(firstHand, cardSet), secondHand);
        setPlayerHands(nextHands);
        if (getHandEffectiveValue(nextHands![playerHandIndex]) === 21) {
            finishTrainingRound(nextHands);
        }
    };

    const currentHand = playerHands && playerHands[playerHandIndex];
    const isSplitEnabled =
        currentHand !== undefined &&
        currentHand.cards.length === 2 &&
        getCardEffectiveValue(currentHand.cards[0]) === getCardEffectiveValue(currentHand.cards[1]);
    const isDoubleEnabled =
        currentHand !== undefined && [9, 10, 11].indexOf(getHandEffectiveValue(currentHand)) > -1;

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#088446'
            }}
        >
            <DecisionEvaluationComponent decisionEvaluation={decisionEvaluation} />
            {/* TODO Improve "table" and cards layout */}
            <ScrollView
                style={{
                    width: '100%',
                    paddingHorizontal: 16,
                    marginVertical: 16
                }}
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <View style={{ width: '100%' }}>
                    <Text style={{ fontSize: 25, color: 'white' }}>Dealer</Text>
                    {dealerHand && <HandComponent hand={dealerHand} />}
                </View>
                <View
                    style={{
                        width: '100%',
                        marginTop: 16,
                        flexWrap: 'wrap'
                    }}
                >
                    <Text style={{ fontSize: 25, color: 'white' }}>You</Text>
                    {playerHands?.map((hand, index) => (
                        <HandComponent key={index} hand={hand} />
                    ))}
                </View>
            </ScrollView>
            <Actions
                doubleHandler={doubleHandler}
                hitHandler={hitHandler}
                isDoubleEnabled={isDoubleEnabled}
                isSplitEnabled={isSplitEnabled}
                phase={phase}
                splitHandler={splitHandler}
                standHandler={standHandler}
                startTrainingRound={startTrainingRound}
            />
        </View>
    );
}
