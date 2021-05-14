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
import { createHand } from './hand';
import { handCodeToHand } from './hand-code';
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

    const dealerSymbols = trainingProgress[randomTrainingHand.code];
    const untrainedDealerSymbols = getUntrainedDealerSymbols(dealerSymbols);

    const randomDealerSymbol =
        untrainedDealerSymbols.length > 0
            ? getRandomItem(untrainedDealerSymbols)
            : getRandomItem(getObjectKeys(dealerSymbols)); // In case all hands have been passed

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
