import { CasinoRules } from './casino-rules';
import { NumericDictionary } from './dictionary';

export interface GameConfig {
    casinoRules: CasinoRules;
    goldHandsLevels: GoldHandsLevels;
    isDealerAnimationEnabled: boolean;
    isSoundEnabled: boolean;
    useBlueCards: boolean;
    useGoldHands: boolean;
}

export type GoldHandsLevels = NumericDictionary<boolean>;
