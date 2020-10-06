import React from 'react';
import { Text, View } from 'react-native';
import { getHandValidValues } from '../logic/hand';
import { Hand } from '../types';

interface HandComponentProps {
    hand: Hand;
    isCurrentHand: boolean;
}

const getCardStyles = (suit: string) => ({
    fontSize: 30,
    backgroundColor: 'white',
    padding: 8,
    marginRight: 8,
    marginVertical: 8,
    color: suit === '♦' || suit === '♥' ? 'red' : 'black'
});

export const HandComponent: React.FC<HandComponentProps> = (props) => (
    <View
        style={{
            flexDirection: 'row',
            maxWidth: '100%',
            flexWrap: 'wrap',
            backgroundColor: props.isCurrentHand ? 'rgba(255, 255, 255, 0.2)' : undefined
        }}
    >
        {props.hand.cards.map((card, index) => (
            <Text key={index} style={getCardStyles(card.suit)}>
                {card.symbol + ' ' + card.suit}
            </Text>
        ))}
        <Text style={{ fontSize: 25, color: 'white', marginTop: 16 }}>
            {' '}
            {getHandValidValues(props.hand).join(' / ')}
        </Text>
    </View>
);
