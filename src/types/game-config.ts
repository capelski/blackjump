import { NumericDictionary } from './dictionary';
import { GameSettings } from './game-settings';

export interface GameConfig {
    settings: GameSettings;
    selectedLevels: NumericDictionary<boolean>;
}
