import React from 'react';
import { Text, View } from 'react-native';
import { getHandValidValues } from '../logic/hand';
import { AppNavigation, Hand } from '../types';
import { CardComponent } from './card-component';

interface HandComponentProps {
    hand: Hand;
    isCurrentHand: boolean;
    isSoundEnabled: boolean;
    navigation?: AppNavigation;
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
                backgroundColor: props.isCurrentHand ? 'rgba(255, 255, 255, 0.2)' : undefined,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                maxWidth: '100%',
                paddingTop: 8,
                paddingHorizontal: 8
            }}
        >
            {props.hand.cards.map((card, index) => (
                <CardComponent
                    card={card}
                    isSoundEnabled={props.isSoundEnabled}
                    key={index}
                    navigation={props.navigation}
                />
            ))}
            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
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
