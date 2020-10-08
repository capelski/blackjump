import React from 'react';
import { Text, View } from 'react-native';
import { Card } from '../types';

interface CardComponentProps {
    card: Card;
}

export const CardComponent: React.FC<CardComponentProps> = (props) => {
    const cardColor = props.card.suit === '♦' || props.card.suit === '♥' ? 'red' : 'black';
    return (
        <View
            style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 8,
                marginBottom: 8,
                padding: 8
            }}
        >
            <Text
                style={{
                    fontSize: 35,
                    color: cardColor
                }}
            >
                {props.card.symbol}
            </Text>
            <Text
                style={{
                    fontSize: 18,
                    paddingLeft: 3,
                    color: cardColor
                }}
            >
                {props.card.suit}
            </Text>
        </View>
    );
};
