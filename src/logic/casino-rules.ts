import { CasinoRules, CasinoRulesKeys, Doubling, SplitsNumber } from '../types';

export const getDefaultCasinoRules = (): CasinoRules => ({
    [CasinoRulesKeys.blackjackPeek]: false,
    [CasinoRulesKeys.doubleAfterSplit]: true,
    [CasinoRulesKeys.doubling]: Doubling.nineToElevenSoft,
    [CasinoRulesKeys.hitSplitAces]: false,
    [CasinoRulesKeys.holeCard]: false,
    [CasinoRulesKeys.splitsNumber]: SplitsNumber.three,
    [CasinoRulesKeys.surrender]: false
});
