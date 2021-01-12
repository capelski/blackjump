import AsyncStorage from '@react-native-community/async-storage';
import { CasinoRulesKeys, GameConfig, TrainedHands } from './types';

export const getGameConfig = (currentGameConfig: GameConfig) =>
    AsyncStorage.getItem('gameConfig')
        .then(
            (value): GameConfig => {
                const storedGameConfig = value && (JSON.parse(value) as GameConfig);
                return {
                    casinoRules:
                        storedGameConfig && storedGameConfig.casinoRules !== undefined
                            ? {
                                  [CasinoRulesKeys.doubleAfterSplit]:
                                      storedGameConfig.casinoRules[
                                          CasinoRulesKeys.doubleAfterSplit
                                      ] !== undefined
                                          ? storedGameConfig.casinoRules[
                                                CasinoRulesKeys.doubleAfterSplit
                                            ]
                                          : currentGameConfig.casinoRules[
                                                CasinoRulesKeys.doubleAfterSplit
                                            ],
                                  [CasinoRulesKeys.doubleOnlyOn_9_10_11]:
                                      storedGameConfig.casinoRules[
                                          CasinoRulesKeys.doubleOnlyOn_9_10_11
                                      ] !== undefined
                                          ? storedGameConfig.casinoRules[
                                                CasinoRulesKeys.doubleOnlyOn_9_10_11
                                            ]
                                          : currentGameConfig.casinoRules[
                                                CasinoRulesKeys.doubleOnlyOn_9_10_11
                                            ],
                                  [CasinoRulesKeys.surrender]:
                                      storedGameConfig.casinoRules[CasinoRulesKeys.surrender] !==
                                      undefined
                                          ? storedGameConfig.casinoRules[CasinoRulesKeys.surrender]
                                          : currentGameConfig.casinoRules[CasinoRulesKeys.surrender]
                              }
                            : currentGameConfig.casinoRules,
                    goldHandsLevels:
                        storedGameConfig && storedGameConfig.goldHandsLevels !== undefined
                            ? storedGameConfig.goldHandsLevels
                            : currentGameConfig.goldHandsLevels,
                    useBlueCards:
                        storedGameConfig && storedGameConfig.useBlueCards !== undefined
                            ? storedGameConfig.useBlueCards
                            : currentGameConfig.useBlueCards,
                    useGoldHands:
                        storedGameConfig && storedGameConfig.useGoldHands !== undefined
                            ? storedGameConfig.useGoldHands
                            : currentGameConfig.useGoldHands
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
