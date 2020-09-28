import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from './src/components/button';
import { HandComponent } from './src/components/hand';
import { getCardSet, collectPlayedCards } from './src/logic/card-set';
import { getHandEffectiveValue, dealCard, createHand } from './src/logic/hand';
import { getAllTrainingPairs, getTrainingHands } from './src/logic/training-hands';
import { Hand, Phases } from './src/types';

const allTrainingPairs = getAllTrainingPairs();
const cardSet = getCardSet();

export default function App() {
    const [currentTrainingPair, setCurrentTrainingPair] = useState(0);
    const [dealerHand, setDealerHand] = useState<Hand | undefined>();
    const [phase, setPhase] = useState<Phases>(Phases.finished);
    const [playerHands, setPlayerHands] = useState<Hand[] | undefined>();
    const [playerHandIndex, setPlayerHandIndex] = useState(0);

    const startNextHandler = () => {
        collectPlayedCards(cardSet);
        setCurrentTrainingPair(currentTrainingPair + 1);
        const nextTrainingHand = getTrainingHands(
            allTrainingPairs[currentTrainingPair + 1],
            cardSet
        );
        setDealerHand(nextTrainingHand.dealerHand);
        setPlayerHands(nextTrainingHand.playerHands);
        setPlayerHandIndex(0);
        setPhase(Phases.player);
    };

    const doubleHandler = () => {
        const nextHands = playerHands!.map((hand, handIndex) => {
            return handIndex === playerHandIndex ? dealCard(hand, cardSet) : hand;
        });
        setPlayerHands(nextHands);
        standHandler();
    };

    const hitHandler = () => {
        const nextHands = playerHands!.map((hand, handIndex) => {
            return handIndex === playerHandIndex ? dealCard(hand, cardSet) : hand;
        });
        setPlayerHands(nextHands);
        if (getHandEffectiveValue(nextHands[playerHandIndex]) >= 21) {
            standHandler();
        }
    };

    const standHandler = () => {
        if (playerHands!.length - 1 > playerHandIndex) {
            const nextPlayerHandIndex = playerHandIndex + 1;
            const nextHands = playerHands!.map((hand, handIndex) => {
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
        }
    };

    const splitHandler = () => {
        const currentHand = playerHands![playerHandIndex];
        const firstHand = createHand([currentHand.cards[0]]);
        const secondHand = createHand([currentHand.cards[1]]);
        const nextHands = playerHands!.map((h) => h);
        nextHands.splice(playerHandIndex, 1, dealCard(firstHand, cardSet), secondHand);
        setPlayerHands(nextHands);
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#088446',
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
            {phase === Phases.player && (
                <View>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}
                    >
                        <Button
                            backgroundColor="#428bca"
                            isEnabled={true}
                            onPress={hitHandler}
                            text="Hit"
                            style={{ width: '50%' }}
                        />
                        <Button
                            backgroundColor="#46b8da"
                            isEnabled={true}
                            onPress={standHandler}
                            text="Stand"
                            style={{ width: '50%' }}
                        />
                    </View>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}
                    >
                        <Button
                            backgroundColor="#5cb85c"
                            // TODO Implement validation logic
                            isEnabled={true}
                            onPress={splitHandler}
                            text="Split"
                            style={{ width: '50%' }}
                        />
                        <Button
                            backgroundColor="#dc3545"
                            // TODO Implement validation logic
                            isEnabled={true}
                            onPress={doubleHandler}
                            text="Double"
                            style={{ width: '50%' }}
                        />
                    </View>
                </View>
            )}
            {phase === Phases.finished && (
                <View
                    style={{
                        width: '100%'
                    }}
                >
                    <Button
                        backgroundColor="#428bca"
                        isEnabled={true}
                        onPress={startNextHandler}
                        text="Next"
                        style={{ width: '100%' }}
                    />
                </View>
            )}
        </View>
    );
}
