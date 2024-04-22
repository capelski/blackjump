import React from 'react';
import { CasinoRules, CasinoRulesKeys, Doubling, SplitsNumber } from '../../types';
import { Switcher } from '../switcher';

interface RuleSwitcherProps {
  children?: React.ReactNode;
  casinoRules: CasinoRules;
  onValueChange: (nextCasinoRules: CasinoRules) => void;
  ruleName:
    | CasinoRulesKeys.blackjackPeek
    | CasinoRulesKeys.dealerHitsSoft17
    | CasinoRulesKeys.doublingAfterSplit
    | CasinoRulesKeys.hitSplitAces
    | CasinoRulesKeys.surrender;
}

export const RuleSwitcher: React.FC<RuleSwitcherProps> = (props) => {
  const disabled =
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
        props.onValueChange({
          ...props.casinoRules,
          [props.ruleName]: newValue,
        });
      }}
      value={props.casinoRules[props.ruleName]}
    >
      {props.children}
    </Switcher>
  );
};
