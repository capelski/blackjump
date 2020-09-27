import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextStyle } from 'react-native';

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

export default function App() {
    const dealerHand: Card[] = [{ suit: '♠', symbol: '9' }];
    const playerHand: Card[] = [
        { suit: '♦', symbol: 'A' },
        { suit: '♣', symbol: '3' },
        { suit: '♥', symbol: '2' }
    ];

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
                        {dealerHand.map((card) => (
                            <Text style={getCardStyles(card.suit)}>
                                {card.symbol + ' ' + card.suit}
                            </Text>
                        ))}
                    </View>
                </View>
                <View style={{ width: '100%', marginTop: 16 }}>
                    <Text style={{ fontSize: 25, color: 'white' }}>Player</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {playerHand.map((card) => (
                            <Text style={getCardStyles(card.suit)}>
                                {card.symbol + ' ' + card.suit}
                            </Text>
                        ))}
                    </View>
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
