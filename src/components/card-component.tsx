import React from 'react';
import { Text, View } from 'react-native';
import { Card, SimpleCardSymbol } from '../types';

interface CardComponentProps {
    card: Card;
}

export const CardComponent: React.FC<CardComponentProps> = (props) => {
    const cardColor = props.card.suit === '♦' || props.card.suit === '♥' ? 'red' : 'black';
    return (
        <View
            style={{
                backgroundColor: props.card.isBlueCard
                    ? '#346fa1'
                    : props.card.isGoldCard
                    ? '#e5c100'
                    : 'white',
                borderRadius: 8,
                height: 66,
                marginBottom: 8,
                marginRight: 8,
                position: 'relative',
                width: 56
            }}
        >
            <Text
                style={{
                    color: cardColor,
                    fontSize: 16,
                    position: 'absolute',
                    right: 4,
                    top: 4
                }}
            >
                {props.card.suit}
            </Text>
            <Text
                style={{
                    color: cardColor,
                    fontSize: 40,
                    marginRight: props.card.symbol === SimpleCardSymbol.Ten ? 0 : 8,
                    marginTop: 12,
                    textAlign: 'center'
                }}
            >
                {props.card.symbol}
            </Text>
        </View>
    );
};
