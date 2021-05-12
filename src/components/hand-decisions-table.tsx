import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../constants';
import { HandDecisionSet } from '../types';

interface HandDecisionsTableProps {
    handDecisionSet: HandDecisionSet;
}

export const HandDecisionsTable: React.FC<HandDecisionsTableProps> = (props) => (
    <View>
        {Object.keys(props.handDecisionSet).map((key) => {
            const number = parseInt(key);
            return (
                <View key={number} style={{ flexDirection: 'row', width: '100%' }}>
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 20,
                            fontWeight: 'bold',
                            paddingTop: 12,
                            textAlign: 'center',
                            width: '15%'
                        }}
                    >
                        {number}
                    </Text>
                    <Text
                        style={{
                            backgroundColor: colors[props.handDecisionSet[number]],
                            color: 'white',
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: 8,
                            paddingVertical: 4,
                            paddingHorizontal: 8,
                            textAlign: 'center',
                            width: '85%'
                        }}
                    >
                        {props.handDecisionSet[number]}
                    </Text>
                </View>
            );
        })}
    </View>
);
