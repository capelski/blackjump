import { CasinoRules } from './casino-rules';
import { NumericDictionary } from './dictionary';

export interface GameConfig {
    casinoRules: CasinoRules;
    dealUntrainedHands: boolean;
    reachUntrainedHands: boolean;
    selectedLevels: NumericDictionary<boolean>;
}
