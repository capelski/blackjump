import AsyncStorage from '@react-native-community/async-storage';
import { GameSettings, NumericDictionary } from './types';

interface PersistedSettings {
    gameSettings: GameSettings;
    selectedLevels: NumericDictionary<boolean>;
}

export const getPersistedSettings = () =>
    AsyncStorage.getItem('settings')
        .then((value) => (value ? (JSON.parse(value) as PersistedSettings) : undefined))
        .catch((error) => {
            console.log(error);
            return undefined;
        });

export const updatePersistedSettings = (persistedSettings: PersistedSettings) => {
    AsyncStorage.setItem('settings', JSON.stringify(persistedSettings)).catch((error) => {
        console.log(error);
    });
};
