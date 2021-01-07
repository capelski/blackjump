import {
    Card,
    CasinoRules,
    GameConfig,
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

export const allTrainingPairsNumber = allPossibleDealerCards.length * trainingSets.length;

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
                    // E.g. Player hand = 3/13. Can reach 4/14+ but not 3/13- (equal or lower)
                    valueToReachThisHand = softDifference > 0 ? softDifference : -1;
                } else {
                    // E.g. Player hand = 8. Can only 9/19 (soft hand)
                    valueToReachThisHand = softDifference === 1 ? softDifference : -1;
                }
            } else {
                const currentHandHardValue = parseInt(trainingSet.playerHand.representation, 10);
                const hardDifference = currentHandHardValue - playerHandValues[0];

                if (isPlayerHandSoft) {
                    // E.g. Player hand = 5/15. Can reach 12-15 but not 11- (soft hand) neither
                    // 16+ (soft hand)
                    const makesSoftHand = playerHandValues[1] + hardDifference <= 21;
                    valueToReachThisHand =
                        !makesSoftHand && hardDifference > 1 && hardDifference <= 10
                            ? hardDifference
                            : -1;
                } else {
                    // E.g. Player hand = 7. Can reach 9-17 but not 7- (equal or lower),
                    // 8 (soft hand), 14 (split hand) neither 18+ (out of scope)
                    valueToReachThisHand =
                        hardDifference > 1 && // Lower & Soft hand
                        hardDifference <= 10 && // Out of scope
                        hardDifference !== playerHandValues[0] // Split hand
                            ? hardDifference
                            : -1;
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
    const selectedTrainingSets = trainingSets.filter((trainingSet) => {
        const trainingSetLevel = trainingSet.playerHand.data.level(gameConfig.casinoRules);
        return gameConfig.selectedLevels[trainingSetLevel];
    });

    const untrainedTrainingSets = selectedTrainingSets.filter((trainingSet) => {
        const trainedDealerHands = trainedHands[trainingSet.playerHand.representation];
        return Object.values(trainedDealerHands).some(
            (status) => status === TrainedHandStatus.untrained
        );
    });

    const randomTrainingSet =
        untrainedTrainingSets.length > 0
            ? getRandomItem(untrainedTrainingSets)
            : getRandomItem(selectedTrainingSets); // In case all hands have been trained

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
    casinoRules: CasinoRules,
    selectedLevels: NumericDictionary<boolean>
) =>
    allPossibleDealerCards.length *
    trainingSets.filter((ts) => selectedLevels[ts.playerHand.data.level(casinoRules)]).length;
