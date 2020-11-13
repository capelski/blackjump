import {
    CardSet,
    GameConfig,
    GameSettings,
    NumericDictionary,
    TrainedHands,
    TrainingPair
} from '../types';
import { getRandomItem } from '../utils';
import { simpleSymbolToSymbol } from './card';
import { extractCardFromCardSet } from './card-set';
import { createHand } from './hand';
import { handRepresentationToHand } from './hand-representation';
import { allPossibleDealerCards, trainingSets } from './training-sets';

export const getRandomTrainingPair = (
    gameConfig: GameConfig,
    trainedHands: TrainedHands,
    cardSet: CardSet
): TrainingPair => {
    const filteredTrainingSets = trainingSets.filter((trainingSet) => {
        const trainingSetLevel = trainingSet.playerHand.data.level(gameConfig.settings);
        const isTrainingSetLevelSelected = gameConfig.selectedLevels[trainingSetLevel];
        const trainedDealerHands = trainedHands[trainingSet.playerHand.representation];

        const doesHaveUntrainedDealerHands = Object.values(trainedDealerHands).some(
            (isHandCovered) => !isHandCovered
        );

        return isTrainingSetLevelSelected && doesHaveUntrainedDealerHands;
    });
    const randomTrainingSet = getRandomItem(filteredTrainingSets);

    const dealerHandsDictionary = trainedHands[randomTrainingSet.playerHand.representation];
    const untrainedDealerHands = randomTrainingSet.dealerHands.filter(
        (hand) => !dealerHandsDictionary[hand]
    );
    const randomDealerHand = getRandomItem(untrainedDealerHands);

    return {
        dealer: createHand([
            extractCardFromCardSet(simpleSymbolToSymbol(randomDealerHand), cardSet)
        ]),
        player: handRepresentationToHand(randomTrainingSet.playerHand.representation, cardSet)
    };
};

export const getTrainingPairsNumber = (
    gameSettings: GameSettings,
    selectedLevels: NumericDictionary<boolean>
) =>
    allPossibleDealerCards.length *
    trainingSets.filter((ts) => selectedLevels[ts.playerHand.data.level(gameSettings)]).length;
