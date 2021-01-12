import { CasinoRulesKeys, GameConfig } from '../types';

export const getDefaultGameConfig = (): GameConfig => ({
    casinoRules: {
        [CasinoRulesKeys.doubleAfterSplit]: true,
        [CasinoRulesKeys.doubleOnlyOn_9_10_11]: true,
        [CasinoRulesKeys.surrender]: false
    },
    goldHandsLevels: {
        1: true,
        2: true,
        3: true,
        4: true
    },
    useBlueCards: false,
    useGoldHands: false
});
