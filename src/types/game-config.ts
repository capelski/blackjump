import { CasinoRules } from './casino-rules';
import { NumericDictionary } from './dictionary';

export interface GameConfig {
    casinoRules: CasinoRules;
    goldHandsLevels: NumericDictionary<boolean>;
    isSoundEnabled: boolean;
    useBlueCards: boolean;
    useGoldHands: boolean;
}
