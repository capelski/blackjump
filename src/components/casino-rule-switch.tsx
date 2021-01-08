import React from 'react';
import { Switch, Text, View } from 'react-native';
import { hitColor } from '../constants';
import { CasinoRulesKeys } from '../types';

interface CasinoRuleSwitchProps {
    casinoRule: CasinoRulesKeys;
    onValueChange: (newValue: boolean) => void;
    value: boolean;
}

export const CasinoRuleSwitch: React.FC<CasinoRuleSwitchProps> = (props) => (
    <View style={{ flexDirection: 'row', paddingTop: 16, width: '100%' }}>
        <Switch
            onValueChange={props.onValueChange}
            style={{ marginRight: 8 }}
            trackColor={{ true: hitColor, false: 'white' }}
            value={props.value}
        />
        <Text
            style={{
                color: 'white',
                fontSize: 20
            }}
        >
            {props.casinoRule}
        </Text>
    </View>
);
