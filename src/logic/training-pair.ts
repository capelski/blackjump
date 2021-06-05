import {
    CasinoRules,
    GameConfig,
    HandCode,
    SelectedHands,
    SimpleCardSymbol,
    TrainingHands,
    TrainingPair,
    TrainingProgress
} from '../types';
import { getObjectKeys, getRandomItem } from '../utils';
import { allDealerSymbols, getUntrainedDealerSymbols } from './dealer-symbols';
import { createDealerHand, handCodeToHand } from './hand';
import { getActiveTrainingHands, getUntrainedTrainingHands } from './training-hand';

export const allTrainingPairsNumber = allDealerSymbols.length * Object.keys(HandCode).length;

export const getSpecificTrainingPair = (
    handCode: HandCode,
    dealerSymbol: SimpleCardSymbol,
    casinoRules: CasinoRules
): TrainingPair => {
    return {
        dealer: createDealerHand(casinoRules, dealerSymbol),
        player: handCodeToHand(handCode)
    };
};

export const getTrainingPairsNumber = (
    trainingHands: TrainingHands,
    selectedHands: SelectedHands
) => allDealerSymbols.length * getActiveTrainingHands(trainingHands, selectedHands).length;

export const getUntrainedTrainingPair = (
    trainingHands: TrainingHands,
    trainingProgress: TrainingProgress,
    gameConfig: GameConfig
): TrainingPair => {
    const untrainedTrainingHands = getUntrainedTrainingHands(
        trainingHands,
        trainingProgress,
        gameConfig.untrainedPairsHands
    );

    const randomTrainingHand =
        untrainedTrainingHands.length > 0
            ? getRandomItem(untrainedTrainingHands)
            : getRandomItem(getActiveTrainingHands(trainingHands, gameConfig.untrainedPairsHands)); // In case all hands have been passed

    const trainingHandStatus = trainingProgress[randomTrainingHand.code];
    const untrainedDealerSymbols = getUntrainedDealerSymbols(trainingHandStatus);

    const randomDealerSymbol =
        untrainedDealerSymbols.length > 0
            ? getRandomItem(untrainedDealerSymbols)
            : getRandomItem(getObjectKeys(trainingHandStatus)); // In case all hands have been passed

    return {
        dealer: createDealerHand(gameConfig.casinoRules, randomDealerSymbol),
        player: handCodeToHand(randomTrainingHand.code)
    };
};
