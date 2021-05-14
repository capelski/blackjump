import {
    GoldHandsLevels,
    HandCode,
    SimpleCardSymbol,
    TrainingHands,
    TrainingProgress,
    TrainingPair
} from '../types';
import { getObjectKeys, getRandomItem } from '../utils';
import { getRandomSuit, simpleSymbolToSymbol } from './card';
import { allDealerSymbols, getUntrainedDealerSymbols } from './dealer-symbols';
import { createHand, handCodeToHand } from './hand';
import { getActiveTrainingHands, getUntrainedTrainingHands } from './training-hand';

export const allTrainingPairsNumber = allDealerSymbols.length * Object.keys(HandCode).length;

export const getRandomTrainingPair = (
    trainingHands: TrainingHands,
    trainingProgress: TrainingProgress,
    goldHandsLevels: GoldHandsLevels
): TrainingPair => {
    const untrainedTrainingHands = getUntrainedTrainingHands(
        trainingHands,
        trainingProgress,
        goldHandsLevels
    );

    const randomTrainingHand =
        untrainedTrainingHands.length > 0
            ? getRandomItem(untrainedTrainingHands)
            : getRandomItem(getActiveTrainingHands(trainingHands, goldHandsLevels)); // In case all hands have been passed

    const trainingHandStatus = trainingProgress[randomTrainingHand.code];
    const untrainedDealerSymbols = getUntrainedDealerSymbols(trainingHandStatus);

    const randomDealerSymbol =
        untrainedDealerSymbols.length > 0
            ? getRandomItem(untrainedDealerSymbols)
            : getRandomItem(getObjectKeys(trainingHandStatus)); // In case all hands have been passed

    return {
        dealer: createHand([
            {
                isBlueCard: false,
                isGoldCard: true,
                suit: getRandomSuit(),
                symbol: simpleSymbolToSymbol(randomDealerSymbol)
            }
        ]),
        player: handCodeToHand(randomTrainingHand.code)
    };
};

export const getSpecificTrainingPair = (
    handCode: HandCode,
    dealerSymbol: SimpleCardSymbol
): TrainingPair => {
    return {
        dealer: createHand([
            {
                isBlueCard: false,
                isGoldCard: true,
                suit: getRandomSuit(),
                symbol: simpleSymbolToSymbol(dealerSymbol)
            }
        ]),
        player: handCodeToHand(handCode)
    };
};
