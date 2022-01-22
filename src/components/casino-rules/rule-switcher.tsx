import React from 'react';
import { CasinoRules, CasinoRulesKeys, Doubling, SplitsNumber } from '../../types';
import { Switcher } from '../switcher';

interface RuleSwitcherProps {
    casinoRules: CasinoRules;
    onValueChange: (nextCasinoRules: CasinoRules) => void;
    ruleName:
        | CasinoRulesKeys.blackjackPeek
        | CasinoRulesKeys.dealerHitsSoft17
        | CasinoRulesKeys.doublingAfterSplit
        | CasinoRulesKeys.hitSplitAces
        | CasinoRulesKeys.holeCard
        | CasinoRulesKeys.surrender;
}

export const RuleSwitcher: React.FC<RuleSwitcherProps> = (props) => {
    const disabled =
        (props.ruleName === CasinoRulesKeys.blackjackPeek &&
            !props.casinoRules[CasinoRulesKeys.holeCard]) ||
        (props.ruleName === CasinoRulesKeys.doublingAfterSplit &&
            (props.casinoRules[CasinoRulesKeys.doubling] === Doubling.none ||
                props.casinoRules[CasinoRulesKeys.splitsNumber] === SplitsNumber.none)) ||
        (props.ruleName === CasinoRulesKeys.hitSplitAces &&
            props.casinoRules[CasinoRulesKeys.splitsNumber] === SplitsNumber.none);

    return (
        <Switcher
            disabled={disabled}
            label={props.ruleName}
            onValueChange={(newValue) => {
                const nextCasinoRules = {
                    ...props.casinoRules,
                    [props.ruleName]: newValue
                };
                if (props.ruleName === CasinoRulesKeys.holeCard && !newValue) {
                    nextCasinoRules[CasinoRulesKeys.blackjackPeek] = false;
                }
                props.onValueChange(nextCasinoRules);
            }}
            value={props.casinoRules[props.ruleName]}
        >
            {props.children}
        </Switcher>
    );
};
