import { CasinoRules, CasinoRulesKeys, Doubling } from '../types';

export const getDefaultCasinoRules = (): CasinoRules => ({
    [CasinoRulesKeys.doubleAfterSplit]: true,
    [CasinoRulesKeys.doubling]: Doubling.nineToElevenSoft,
    [CasinoRulesKeys.holeCard]: false,
    [CasinoRulesKeys.surrender]: false
});
