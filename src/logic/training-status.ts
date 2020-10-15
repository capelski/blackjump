import { GameSettingsKeys, TrainingStatus } from '../types';
import { getTrainingPairs } from './training-hands';

const initialGameSettings = {
    [GameSettingsKeys.canDoubleOnAnyInitialHand]: false,
    [GameSettingsKeys.canDoubleAfterSplit]: true,
    [GameSettingsKeys.canSurrender]: false
};

const initialSelectedLevels = {
    1: true,
    2: true,
    3: true,
    4: true
};

export const initialTrainingStatus: TrainingStatus = {
    currentTrainingPair: -1,
    gameSettings: initialGameSettings,
    selectedLevels: initialSelectedLevels,
    selectedTrainingPairs: getTrainingPairs(initialGameSettings, initialSelectedLevels)
};
