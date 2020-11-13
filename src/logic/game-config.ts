import { GameConfig, GameSettingsKeys } from '../types';

export const getDefaultGameConfig = (): GameConfig => ({
    settings: {
        [GameSettingsKeys.canDoubleOnAnyInitialHand]: false,
        [GameSettingsKeys.canDoubleAfterSplit]: true,
        [GameSettingsKeys.canSurrender]: false
    },
    selectedLevels: {
        1: true,
        2: true,
        3: true,
        4: true
    }
});
