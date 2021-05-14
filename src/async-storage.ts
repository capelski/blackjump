import AsyncStorage from '@react-native-community/async-storage';
import { CasinoRulesKeys, GameConfig, TrainingProgress } from './types';

const gameConfigKey = 'gameConfig';
const hasCompletedOnboardingKey = 'hasCompletedOnboarding';
const playerEarningsKey = 'playerEarnings';
const trainingProgressKey = 'trainedHands';

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
                              [CasinoRulesKeys.doubling]:
                                  storedGameConfig.casinoRules[CasinoRulesKeys.doubling] !==
                                  undefined
                                      ? storedGameConfig.casinoRules[CasinoRulesKeys.doubling]
                                      : currentGameConfig.casinoRules[CasinoRulesKeys.doubling],
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
                isDealerAnimationEnabled:
                    storedGameConfig && storedGameConfig.isDealerAnimationEnabled !== undefined
                        ? storedGameConfig.isDealerAnimationEnabled
                        : currentGameConfig.isDealerAnimationEnabled,
                isSoundEnabled:
                    storedGameConfig && storedGameConfig.isSoundEnabled !== undefined
                        ? storedGameConfig.isSoundEnabled
                        : currentGameConfig.isSoundEnabled,
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

export const getPlayerEarnings = () =>
    AsyncStorage.getItem(playerEarningsKey)
        .then<number>((value) => (value ? parseInt(value) : 0))
        .catch(() => 0);

export const getTrainingProgress = () =>
    AsyncStorage.getItem(trainingProgressKey)
        .then<TrainingProgress>((value) => (value ? JSON.parse(value) : undefined))
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

export const updatePlayerEarnings = (playerEarnings: number) => {
    AsyncStorage.setItem(playerEarningsKey, JSON.stringify(playerEarnings)).catch(() => {});
};

export const updateTrainingProgress = (TrainingProgress: TrainingProgress) => {
    AsyncStorage.setItem(trainingProgressKey, JSON.stringify(TrainingProgress)).catch(() => {});
};
