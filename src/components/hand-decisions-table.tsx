import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../constants';
import { HandDecisionSet } from '../types';
import { getObjectKeys } from '../utils';

interface HandDecisionsTableProps {
    handDecisionSet: HandDecisionSet;
}

export const HandDecisionsTable: React.FC<HandDecisionsTableProps> = (props) => (
    <View>
        {getObjectKeys(props.handDecisionSet).map((simpleCardSymbol) => {
            return (
                <View key={simpleCardSymbol} style={{ flexDirection: 'row', width: '100%' }}>
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
                        {simpleCardSymbol}
                    </Text>
                    <Text
                        style={{
                            backgroundColor: colors[props.handDecisionSet[simpleCardSymbol]],
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
                        {props.handDecisionSet[simpleCardSymbol]}
                    </Text>
                </View>
            );
        })}
    </View>
);
