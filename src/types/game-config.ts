import { CasinoRules } from './casino-rules';
import { NumericDictionary } from './dictionary';

export interface GameConfig {
    casinoRules: CasinoRules;
    reachUntrainedHands: boolean;
    selectedLevels: NumericDictionary<boolean>;
}
