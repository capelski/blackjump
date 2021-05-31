import { CasinoRules } from './casino-rules';
import { NumericDictionary } from './dictionary';

export interface GameConfig {
    casinoRules: CasinoRules;
    isDealerAnimationEnabled: boolean;
    isSoundEnabled: boolean;
    untrainedPairsHandLevels: HandLevels;
    untrainedPairsPriority: boolean;
}

export type HandLevels = NumericDictionary<boolean>;
