import React from 'react';
import { Switch, Text, View } from 'react-native';
import { hitColor } from '../../constants';
import { CasinoRules, CasinoRulesKeys } from '../../types';

interface RuleSwitcherProps {
    casinoRules: CasinoRules;
    hideLabel?: boolean;
    isDisabled?: boolean;
    onValueChange?: (nextCasinoRules: CasinoRules) => void;
    ruleName:
        | CasinoRulesKeys.blackjackPeek
        | CasinoRulesKeys.dealerHitsSoft17
        | CasinoRulesKeys.doublingAfterSplit
        | CasinoRulesKeys.hitSplitAces
        | CasinoRulesKeys.holeCard
        | CasinoRulesKeys.surrender;
    setCasinoRules: (casinoRules: CasinoRules) => void;
}

export const RuleSwitcher: React.FC<RuleSwitcherProps> = (props) => {
    const SwitchCore = (
        <Switch
            onValueChange={
                props.isDisabled
                    ? undefined
                    : (newValue) => {
                          const nextCasinoRules = {
                              ...props.casinoRules,
                              [props.ruleName]: newValue
                          };
                          if (props.ruleName === CasinoRulesKeys.holeCard && !newValue) {
                              nextCasinoRules[CasinoRulesKeys.blackjackPeek] = false;
                          }
                          props.setCasinoRules(nextCasinoRules);
                          props.onValueChange && props.onValueChange(nextCasinoRules);
                      }
            }
            style={{ marginRight: 8 }}
            trackColor={{ true: hitColor, false: 'white' }}
            value={props.casinoRules[props.ruleName]}
        />
    );

    return props.hideLabel ? (
        SwitchCore
    ) : (
        <View
            style={{
                flexDirection: 'row',
                opacity: props.isDisabled ? 0.3 : undefined,
                paddingTop: 16,
                width: '100%'
            }}
        >
            {SwitchCore}
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
};
