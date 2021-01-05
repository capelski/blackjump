import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../constants';
import { mapCasinoRulesDecisionToDynamicDecision } from '../logic/basic-strategy';
import { CasinoRules, RelevantHand } from '../types';
import { numberRange } from '../utils';

interface HandDecisionsTableProps {
    casinoRules: CasinoRules;
    relevantHand: RelevantHand;
}

export const HandDecisionsTable: React.FC<HandDecisionsTableProps> = (props) => {
    const handDecisions = numberRange(2, 11).map((number) => ({
        number,
        decision: mapCasinoRulesDecisionToDynamicDecision(
            props.relevantHand.decisions[number],
            props.casinoRules
        )
    }));

    return (
        <View>
            {handDecisions.map((dynamicDecision) => (
                <View key={dynamicDecision.number} style={{ flexDirection: 'row', width: '100%' }}>
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
                        {dynamicDecision.number}
                    </Text>
                    <Text
                        style={{
                            backgroundColor: colors[dynamicDecision.decision],
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
                        {dynamicDecision.decision}
                    </Text>
                </View>
            ))}
        </View>
    );
};
