import React from 'react';
import { CasinoRules, CasinoRulesKeys } from '../../types';
import { Switcher } from '../switcher';

interface RuleSwitcherProps {
    casinoRules: CasinoRules;
    isDisabled?: boolean;
    onValueChange: (nextCasinoRules: CasinoRules) => void;
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
    return (
        <Switcher
            disabled={props.isDisabled}
            label={props.ruleName}
            onValueChange={(newValue) => {
                const nextCasinoRules = {
                    ...props.casinoRules,
                    [props.ruleName]: newValue
                };
                if (props.ruleName === CasinoRulesKeys.holeCard && !newValue) {
                    nextCasinoRules[CasinoRulesKeys.blackjackPeek] = false;
                }
                props.setCasinoRules(nextCasinoRules);
                props.onValueChange && props.onValueChange(nextCasinoRules);
            }}
            value={props.casinoRules[props.ruleName]}
        >
            {props.children}
        </Switcher>
    );
};
