import AsyncStorage from '@react-native-community/async-storage';
import { GameConfig, TrainedHands } from './types';

export const getGameConfig = (currentGameConfig: GameConfig) =>
    AsyncStorage.getItem('gameConfig')
        .then(
            (value): GameConfig => {
                const storedGameConfig = value && (JSON.parse(value) as GameConfig);
                return {
                    casinoRules:
                        (storedGameConfig && storedGameConfig.casinoRules) ||
                        currentGameConfig.casinoRules,
                    selectedLevels:
                        (storedGameConfig && storedGameConfig.selectedLevels) ||
                        currentGameConfig.selectedLevels
                };
            }
        )
        .catch((error) => {
            console.log(error);
            return currentGameConfig;
        });

export const getTrainedHands = () =>
    AsyncStorage.getItem('trainedHands')
        .then((value) => (value ? (JSON.parse(value) as TrainedHands) : undefined))
        .catch((error) => {
            console.log(error);
            return undefined;
        });

export const updateGameConfig = (gameConfig: GameConfig) => {
    AsyncStorage.setItem('gameConfig', JSON.stringify(gameConfig)).catch((error) => {
        console.log(error);
    });
};

export const updateTrainedHands = (trainedHands: TrainedHands) => {
    AsyncStorage.setItem('trainedHands', JSON.stringify(trainedHands)).catch((error) => {
        console.log(error);
    });
};
