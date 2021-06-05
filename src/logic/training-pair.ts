import {
    CasinoRules,
    GameConfig,
    HandCode,
    SimpleCardSymbol,
    TrainingHands,
    TrainingPair,
    TrainingProgress
} from '../types';
import { getObjectKeys, getRandomItem } from '../utils';
import { allDealerSymbols, getUntrainedDealerSymbols } from './dealer-symbols';
import { createDealerHand, handCodeToHand } from './hand';
import { getSelectedTrainingHands, getUntrainedTrainingHands } from './training-hand';

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

export const getUntrainedTrainingPair = (
    trainingHands: TrainingHands,
    trainingProgress: TrainingProgress,
    gameConfig: GameConfig
): TrainingPair => {
    const untrainedTrainingHands = getUntrainedTrainingHands(
        trainingHands,
        trainingProgress,
        gameConfig.selectedHandsOnly ? gameConfig.selectedHands : undefined
    );

    const randomTrainingHand =
        untrainedTrainingHands.length > 0
            ? getRandomItem(untrainedTrainingHands)
            : getRandomItem(
                  getSelectedTrainingHands(
                      trainingHands,
                      gameConfig.selectedHandsOnly ? gameConfig.selectedHands : undefined
                  )
              ); // In case all hands have been passed

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
