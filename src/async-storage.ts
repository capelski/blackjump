import AsyncStorage from '@react-native-community/async-storage';
import { GameConfig, TrainedHands } from './types';

export const getGameConfig = () =>
    AsyncStorage.getItem('gameConfig')
        .then((value) => (value ? (JSON.parse(value) as GameConfig) : undefined))
        .catch((error) => {
            console.log(error);
            return undefined;
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
