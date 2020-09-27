import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextStyle } from 'react-native';
import { getCardSet } from './src/card-set';
import { getAllTrainingPairs, getRandomTrainingHands } from './src/training-hands';

const buttonsStyle: TextStyle = {
    paddingVertical: 16,
    paddingHorizontal: 32,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    width: '100%',
    textAlign: 'center'
};

interface Card {
    suit: string;
    symbol: string;
}

const getCardStyles = (suit: string) => ({
    fontSize: 30,
    backgroundColor: 'white',
    padding: 8,
    marginRight: 8,
    color: suit === '♦' || suit === '♥' ? 'red' : 'black'
});

const trainingPairs = getAllTrainingPairs();
const cardSet = getCardSet();

export default function App() {
    const trainingHand = getRandomTrainingHands(trainingPairs, cardSet);
    return (
        <View style={styles.container}>
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
                    <View style={{ flexDirection: 'row' }}>
                        {trainingHand.dealerHand.cards.map((card, index) => (
                            <Text key={index} style={getCardStyles(card.suit)}>
                                {card.symbol + ' ' + card.suit}
                            </Text>
                        ))}
                        <Text style={{ fontSize: 25, color: 'white' }}>
                            {' '}
                            {trainingHand.dealerHand.values.join(' / ')}
                        </Text>
                    </View>
                </View>
                <View style={{ width: '100%', marginTop: 16 }}>
                    <Text style={{ fontSize: 25, color: 'white' }}>Player</Text>
                    {trainingHand.playerHands.map((hand) => (
                        <View style={{ flexDirection: 'row' }}>
                            {hand.cards.map((card, index) => (
                                <Text key={index} style={getCardStyles(card.suit)}>
                                    {card.symbol + ' ' + card.suit}
                                </Text>
                            ))}
                            <Text style={{ fontSize: 25, color: 'white' }}>
                                {' '}
                                {hand.values.join(' / ')}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
            <View
                style={{
                    height: 56,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}
            >
                <TouchableOpacity style={{ width: '50%' }}>
                    <Text style={{ ...buttonsStyle, backgroundColor: '#428bca' }}>Hit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '50%' }}>
                    <Text style={{ ...buttonsStyle, backgroundColor: '#46b8da' }}>Stand</Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    height: 56,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}
            >
                <TouchableOpacity style={{ width: '50%' }}>
                    <Text style={{ ...buttonsStyle, backgroundColor: '#5cb85c' }}>Split</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '50%' }}>
                    <Text style={{ ...buttonsStyle, backgroundColor: '#dc3545' }}>Double</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
