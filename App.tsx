import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from './src/components/button';
import { HandComponent } from './src/components/hand';
import { getCardSet } from './src/logic/card-set';
import { getHandEffectiveValue, dealCard } from './src/logic/hand';
import { getAllTrainingPairs, getTrainingHands } from './src/logic/training-hands';
import { Hand, Phases } from './src/types';

const allTrainingPairs = getAllTrainingPairs();
const cardSet = getCardSet();

export default function App() {
    const [currentTrainingPair, setCurrentTrainingPair] = useState(0);
    const [dealerHand, setDealerHand] = useState<Hand | undefined>();
    const [phase, setPhase] = useState<Phases>(Phases.finished);
    const [playerHand, setPlayerHand] = useState<Hand | undefined>();

    const doubleHandler = () => {
        setPlayerHand(dealCard(playerHand!, cardSet));
        standHandler();
    };

    const hitHandler = () => {
        const nextHand = dealCard(playerHand!, cardSet);
        setPlayerHand(nextHand);
        if (getHandEffectiveValue(nextHand) >= 21) {
            standHandler();
        }
    };

    const standHandler = () => {
        setPhase(Phases.dealer);
        // TODO Add interval to deliver dealer cards gradually
        let nextHand: Hand = dealerHand!;
        while (getHandEffectiveValue(nextHand) < 17) {
            nextHand = dealCard(nextHand, cardSet);
        }
        setDealerHand(nextHand!);
        setPhase(Phases.finished);
    };

    const startNextHandler = () => {
        setCurrentTrainingPair(currentTrainingPair + 1);
        const nextTrainingHand = getTrainingHands(
            allTrainingPairs[currentTrainingPair + 1],
            cardSet
        );
        setDealerHand(nextTrainingHand.dealerHand);
        setPlayerHand(nextTrainingHand.playerHands[0]);
        setPhase(Phases.player);
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
                    {playerHand && <HandComponent hand={playerHand} />}
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
                            isEnabled={false}
                            onPress={() => {}}
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
