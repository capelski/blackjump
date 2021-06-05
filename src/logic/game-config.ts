import { Dictionary, GameConfig, HandCode } from '../types';
import { getDefaultCasinoRules } from './casino-rules';

export const getDefaultGameConfig = (): GameConfig => ({
    casinoRules: getDefaultCasinoRules(),
    isDealerAnimationEnabled: true,
    isSoundEnabled: true,
    selectedHands: Object.values(HandCode).reduce(
        (hands, handCode) => ({ ...hands, [handCode]: true }),
        {}
    ) as Dictionary<boolean, HandCode>,
    selectedHandsOnly: false,
    untrainedPairsPriority: false
});
