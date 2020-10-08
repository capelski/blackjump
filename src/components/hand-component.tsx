import React from 'react';
import { Text, View } from 'react-native';
import { getHandValidValues } from '../logic/hand';
import { Hand } from '../types';
import { CardComponent } from './card-component';

interface HandComponentProps {
    hand: Hand;
    isCurrentHand: boolean;
}

export const HandComponent: React.FC<HandComponentProps> = (props) => {
    const handValues = getHandValidValues(props.hand).join('/');
    const displayValues =
        handValues.indexOf('21') > -1
            ? props.hand.cards.length === 2
                ? 'Blackjack'
                : '21'
            : handValues;
    return (
        <View
            style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                maxWidth: '100%',
                paddingTop: 8,
                paddingHorizontal: 8,
                backgroundColor: props.isCurrentHand ? 'rgba(255, 255, 255, 0.2)' : undefined
            }}
        >
            {props.hand.cards.map((card, index) => (
                <CardComponent key={index} card={card} />
            ))}
            <View>
                <Text style={{ fontSize: 25, color: 'white' }}> {displayValues}</Text>
                {props.hand.outcome && (
                    <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>
                        {' '}
                        {props.hand.outcome}
                    </Text>
                )}
            </View>
        </View>
    );
};
