import { GameConfig } from '../types';
import { getDefaultCasinoRules } from './casino-rules';

export const getDefaultGameConfig = (): GameConfig => ({
    casinoRules: getDefaultCasinoRules(),
    isDealerAnimationEnabled: true,
    isSoundEnabled: true,
    untrainedPairsHandLevels: {
        1: true,
        2: true,
        3: true,
        4: true
    },
    untrainedPairsPriority: false
});
