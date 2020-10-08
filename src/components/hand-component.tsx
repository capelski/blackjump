import React from 'react';
import { Text, View } from 'react-native';
import { getHandValidValues } from '../logic/hand';
import { Hand } from '../types';
import { CardComponent } from './card-component';

interface HandComponentProps {
    hand: Hand;
    isCurrentHand: boolean;
}

export const HandComponent: React.FC<HandComponentProps> = (props) => (
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
            <Text style={{ fontSize: 25, color: 'white' }}>
                {' '}
                {getHandValidValues(props.hand).join('/')}
            </Text>
            {props.hand.outcome && (
                <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>
                    {' '}
                    {props.hand.outcome}
                </Text>
            )}
        </View>
    </View>
);
