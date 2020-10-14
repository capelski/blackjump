import { GameSettingsKeys, TrainingStatus } from '../types';
import { getTrainingPairs } from './training-hands';

export const initialTrainingStatus: TrainingStatus = {
    currentTrainingPair: -1,
    gameSettings: {
        [GameSettingsKeys.canDoubleOnAnyInitialHand]: false,
        [GameSettingsKeys.canDoubleAfterSplit]: true,
        [GameSettingsKeys.canSurrender]: false
    },
    selectedLevels: {
        1: true,
        2: true,
        3: true,
        4: true
    },
    selectedTrainingPairs: getTrainingPairs()
};