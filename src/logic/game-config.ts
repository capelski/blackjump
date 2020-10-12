import { GameConfig } from '../types';
import { getTrainingPairs } from './training-hands';

export const initialGameConfig: GameConfig = {
    canDoubleOnAnyInitialHand: false,
    canDoubleAfterSplit: true,
    canSurrender: false,
    currentTrainingPair: -1,
    selectedLevels: {
        1: true,
        2: true,
        3: true,
        4: true
    },
    selectedTrainingPairs: getTrainingPairs()
};
