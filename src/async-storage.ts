import AsyncStorage from '@react-native-community/async-storage';
import { CasinoRulesKeys, GameConfig, TrainedHands } from './types';

const gameConfigKey = 'gameConfig';
const hasCompletedOnboardingKey = 'hasCompletedOnboarding';
const trainedHandsKey = 'trainedHands';

export const getGameConfig = (currentGameConfig: GameConfig) =>
    AsyncStorage.getItem(gameConfigKey)
        .then<GameConfig>((value) => {
            const storedGameConfig: Partial<GameConfig> | undefined = value && JSON.parse(value);
            return {
                casinoRules:
                    storedGameConfig && storedGameConfig.casinoRules !== undefined
                        ? {
                              [CasinoRulesKeys.doubleAfterSplit]:
                                  storedGameConfig.casinoRules[CasinoRulesKeys.doubleAfterSplit] !==
                                  undefined
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
        })
        .catch(() => currentGameConfig);

export const getHasCompletedOnboarding = () =>
    AsyncStorage.getItem(hasCompletedOnboardingKey)
        .then<boolean>((value) => (value ? JSON.parse(value) : false))
        .catch(() => false);

export const getTrainedHands = () =>
    AsyncStorage.getItem(trainedHandsKey)
        .then<TrainedHands>((value) => (value ? JSON.parse(value) : undefined))
        .catch(() => undefined);

export const updateGameConfig = (gameConfig: GameConfig) => {
    AsyncStorage.setItem(gameConfigKey, JSON.stringify(gameConfig)).catch(() => {});
};

export const updateHasCompletedOnboarding = (hasCompletedOnboarding: boolean) => {
    AsyncStorage.setItem(
        hasCompletedOnboardingKey,
        JSON.stringify(hasCompletedOnboarding)
    ).catch(() => {});
};

export const updateTrainedHands = (trainedHands: TrainedHands) => {
    AsyncStorage.setItem(trainedHandsKey, JSON.stringify(trainedHands)).catch(() => {});
};
