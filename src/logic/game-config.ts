import { CasinoRules, CasinoRulesKeys, Doubling, GameConfig } from '../types';

export const getDefaultCasinoRules = (): CasinoRules => ({
    [CasinoRulesKeys.doubleAfterSplit]: true,
    [CasinoRulesKeys.doubling]: Doubling.nineToElevenSoft,
    [CasinoRulesKeys.surrender]: false
});

export const getDefaultGameConfig = (): GameConfig => ({
    casinoRules: getDefaultCasinoRules(),
    goldHandsLevels: {
        1: true,
        2: true,
        3: true,
        4: true
    },
    isDealerAnimationEnabled: true,
    isSoundEnabled: true,
    useBlueCards: false,
    useGoldHands: false
});
