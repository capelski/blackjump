import {
    Card,
    GameConfig,
    GameSettings,
    Hand,
    HandRepresentation,
    NumericDictionary,
    SimpleCardSymbol,
    TrainedHands,
    TrainingPair
} from '../types';
import { TrainedHandStatus } from '../types/training';
import { getRandomItem } from '../utils';
import { getRandomCard, getRandomSuit, simpleSymbolToSymbol, valueToSymbol } from './card';
import { createHand, getHandValues } from './hand';
import {
    handRepresentationToHand,
    isSoftHandRepresentation,
    isSplitHandRepresentation
} from './hand-representation';
import { allPossibleDealerCards, trainingSets } from './training-sets';

// Called after player hitting, splitting or starting a split hand. It returns a card that
// turns the current player hand into another untrained hand (against the current dealer card).
// If there are no untrained hands (against the current dealer card) or no untrained hands can
// be reached from the current player hand (e.g. a Hard 20), returns a random card
export const getCardForUntrainedHand = (
    playerHand: Hand,
    dealerSymbol: SimpleCardSymbol,
    trainedHands: TrainedHands
): Card => {
    const isPlayerHandSoft = playerHand.values.length > 1;
    const playerHandValues = getHandValues(playerHand.cards);

    const valuesToUntrainedHands = trainingSets
        .map((trainingSet) => {
            const isHandUntrainedForDealerCard =
                trainedHands[trainingSet.playerHand.representation][dealerSymbol] ===
                TrainedHandStatus.untrained;

            let valueToReachThisHand: number;

            if (isSplitHandRepresentation(trainingSet.playerHand.representation)) {
                // Untrained split hands can never be reached after user action
                valueToReachThisHand = -1;
            } else if (isSoftHandRepresentation(trainingSet.playerHand.representation)) {
                const currentHandMinValue = parseInt(
                    trainingSet.playerHand.representation.split('/')[0],
                    10
                );
                const softDifference = currentHandMinValue - playerHandValues[0];

                if (isPlayerHandSoft) {
                    // E.g. Player hand = 3/13. Can reach 7/17 but not 2/12
                    valueToReachThisHand = softDifference > 0 ? softDifference : -1;
                } else {
                    // E.g. Player hand = 8. Can reach 9/19 but not 10/20
                    valueToReachThisHand = softDifference === 1 ? softDifference : -1;
                }
            } else {
                const currentHandHardValue = parseInt(trainingSet.playerHand.representation, 10);
                const hardDifference = currentHandHardValue - playerHandValues[0];

                if (isPlayerHandSoft) {
                    // E.g. Player hand = 5/15. Can reach 12 but not 11 or lower (would be 11/21; soft hand)
                    const makesSoftHand = playerHandValues[1] + hardDifference <= 21;
                    valueToReachThisHand =
                        !makesSoftHand && hardDifference > 1 && hardDifference <= 10
                            ? hardDifference
                            : -1;
                } else {
                    // E.g. Player hand = 7. Can reach 16 but not 6, 8 or 19
                    valueToReachThisHand =
                        hardDifference > 1 && hardDifference <= 10 ? hardDifference : -1;
                }
            }

            return isHandUntrainedForDealerCard && valueToReachThisHand > -1
                ? valueToReachThisHand
                : -1;
        })
        .filter((value) => value > -1);

    const nextCard: Card =
        valuesToUntrainedHands.length > 0
            ? {
                  suit: getRandomSuit(),
                  symbol: valueToSymbol(getRandomItem(valuesToUntrainedHands))
              }
            : getRandomCard();

    return nextCard;
};

export const getRandomTrainingPair = (
    gameConfig: GameConfig,
    trainedHands: TrainedHands
): TrainingPair => {
    const filteredTrainingSets = trainingSets.filter((trainingSet) => {
        const trainingSetLevel = trainingSet.playerHand.data.level(gameConfig.settings);
        const isTrainingSetLevelSelected = gameConfig.selectedLevels[trainingSetLevel];

        const trainedDealerHands = trainedHands[trainingSet.playerHand.representation];
        const doesHaveUntrainedDealerHands = Object.values(trainedDealerHands).some(
            (status) => status === TrainedHandStatus.untrained
        );

        return isTrainingSetLevelSelected && doesHaveUntrainedDealerHands;
    });

    const randomTrainingSet =
        filteredTrainingSets.length > 0
            ? getRandomItem(filteredTrainingSets)
            : getRandomItem(trainingSets); // In case all hands have been trained

    const dealerHandsDictionary = trainedHands[randomTrainingSet.playerHand.representation];
    const untrainedDealerHands = randomTrainingSet.dealerHands.filter(
        (hand) => dealerHandsDictionary[hand] === TrainedHandStatus.untrained
    );

    const randomDealerHand =
        untrainedDealerHands.length > 0
            ? getRandomItem(untrainedDealerHands)
            : getRandomItem(randomTrainingSet.dealerHands); // In case all hands have been trained

    return {
        dealer: createHand([
            { suit: getRandomSuit(), symbol: simpleSymbolToSymbol(randomDealerHand) }
        ]),
        player: handRepresentationToHand(randomTrainingSet.playerHand.representation)
    };
};

export const getSpecificTrainingPair = (
    handRepresentation: HandRepresentation,
    dealerSymbol: SimpleCardSymbol
): TrainingPair => {
    return {
        dealer: createHand([{ suit: getRandomSuit(), symbol: simpleSymbolToSymbol(dealerSymbol) }]),
        player: handRepresentationToHand(handRepresentation)
    };
};

export const getTrainingPairsNumber = (
    gameSettings: GameSettings,
    selectedLevels: NumericDictionary<boolean>
) =>
    allPossibleDealerCards.length *
    trainingSets.filter((ts) => selectedLevels[ts.playerHand.data.level(gameSettings)]).length;
