import { GameConfig } from '../types';
import { getDefaultCasinoRules } from './casino-rules';

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
