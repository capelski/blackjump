import { CasinoRulesKeys, Doubling, GameConfig } from '../types';

export const getDefaultGameConfig = (): GameConfig => ({
    casinoRules: {
        [CasinoRulesKeys.doubleAfterSplit]: true,
        [CasinoRulesKeys.doubling]: Doubling.nineToElevenSoft,
        [CasinoRulesKeys.surrender]: false
    },
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
