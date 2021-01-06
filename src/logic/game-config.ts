import { CasinoRulesKeys, GameConfig } from '../types';

export const getDefaultGameConfig = (): GameConfig => ({
    casinoRules: {
        [CasinoRulesKeys.canDoubleAfterSplit]: true,
        [CasinoRulesKeys.canDoubleOnAnyInitialHand]: false,
        [CasinoRulesKeys.canSurrender]: false
    },
    dealTrainingHands: true,
    reachUntrainedHands: true,
    selectedLevels: {
        1: true,
        2: true,
        3: true,
        4: true
    }
});
