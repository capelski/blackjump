import { CasinoRules, CasinoRulesKeys, Doubling, SplitsNumber } from '../types';

export const getDefaultCasinoRules = (): CasinoRules => ({
    [CasinoRulesKeys.blackjackPeek]: false,
    [CasinoRulesKeys.dealerHitsSoft17]: false,
    [CasinoRulesKeys.doubling]: Doubling.nineToElevenSoft,
    [CasinoRulesKeys.doublingAfterSplit]: true,
    [CasinoRulesKeys.hitSplitAces]: false,
    [CasinoRulesKeys.holeCard]: false,
    [CasinoRulesKeys.splitsNumber]: SplitsNumber.three,
    [CasinoRulesKeys.surrender]: false
});
