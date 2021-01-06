import { CasinoRules } from './casino-rules';
import { NumericDictionary } from './dictionary';

export interface GameConfig {
    casinoRules: CasinoRules;
    dealTrainingHands: boolean;
    reachUntrainedHands: boolean;
    selectedLevels: NumericDictionary<boolean>;
}
