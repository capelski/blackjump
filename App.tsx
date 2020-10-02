import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
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

export default function App() {
    const [currentTrainingPair, setCurrentTrainingPair] = useState(0);
    const [dealerHand, setDealerHand] = useState<Hand | undefined>();
    const [decisionEvaluation, setDecisionEvaluation] = useState<DecisionEvaluation | undefined>();
    const [phase, setPhase] = useState<Phases>(Phases.finished);
    const [playerHands, setPlayerHands] = useState<Hand[] | undefined>();
    const [playerHandIndex, setPlayerHandIndex] = useState(0);

    useEffect(() => {
        if (decisionEvaluation && decisionEvaluation.hit) {
            setTimeout(() => {
                setDecisionEvaluation(undefined);
            }, 1000);
        }
    }, [decisionEvaluation]);

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
        } else {
            setPhase(Phases.dealer);
            // TODO Add interval to deliver dealer cards gradually
            let nextHand: Hand = dealerHand!;
            while (getHandEffectiveValue(nextHand) < 17) {
                nextHand = dealCard(nextHand, cardSet);
            }
            setDealerHand(nextHand!);
            setPhase(Phases.finished);
            // TODO Display hands result (e.g. Dealer wins, Push, Player wins, etc.)
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
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    paddingHorizontal: 16
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
                    <Text style={{ fontSize: 25, color: 'white' }}>Player</Text>
                    {playerHands?.map((hand, index) => (
                        <HandComponent key={index} hand={hand} />
                    ))}
                </View>
            </View>
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
