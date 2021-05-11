import React from 'react';
import { Switch, Text, View } from 'react-native';
import { hitColor } from '../../constants';
import { CasinoRules, CasinoRulesKeys } from '../../types';

interface RuleSwitcherProps {
    casinoRules: CasinoRules;
    onValueChange?: (nextCasinoRules: CasinoRules) => void;
    ruleName: CasinoRulesKeys.doubleAfterSplit | CasinoRulesKeys.surrender;
    setCasinoRules: (casinoRules: CasinoRules) => void;
}

export const RuleSwitcher: React.FC<RuleSwitcherProps> = (props) => (
    <View style={{ flexDirection: 'row', paddingTop: 16, width: '100%' }}>
        <Switch
            onValueChange={(newValue) => {
                const nextCasinoRules = {
                    ...props.casinoRules,
                    [props.ruleName]: newValue
                };
                props.setCasinoRules(nextCasinoRules);
                props.onValueChange && props.onValueChange(nextCasinoRules);
            }}
            style={{ marginRight: 8 }}
            trackColor={{ true: hitColor, false: 'white' }}
            value={props.casinoRules[props.ruleName]}
        />
        <Text
            style={{
                color: 'white',
                fontSize: 20
            }}
        >
            {props.ruleName}
        </Text>
    </View>
);
