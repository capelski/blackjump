import {
    Card,
    Dictionary,
    GameConfig,
    Hand,
    HandRepresentation,
    NumericDictionary,
    RelevantHands,
    SimpleCardSymbol,
    TrainedHands,
    TrainedHandStatus,
    TrainingPair
} from '../types';
import { getRandomItem } from '../utils';
import {
    getCardsValues,
    getRandomCard,
    getRandomSuit,
    simpleSymbolToSymbol,
    valueToSymbol
} from './card';
import { createHand } from './hand';
import {
    handRepresentationToHand,
    isSoftHandRepresentation,
    isSplitHandRepresentation
} from './hand-representation';

export const allPossibleDealerCards: SimpleCardSymbol[] = [
    SimpleCardSymbol.Ace,
    SimpleCardSymbol.Two,
    SimpleCardSymbol.Three,
    SimpleCardSymbol.Four,
    SimpleCardSymbol.Five,
    SimpleCardSymbol.Six,
    SimpleCardSymbol.Seven,
    SimpleCardSymbol.Eight,
    SimpleCardSymbol.Nine,
    SimpleCardSymbol.Ten
];

export const allTrainingPairsNumber =
    allPossibleDealerCards.length * Object.keys(HandRepresentation).length;

const getActiveRelevantHands = (
    relevantHands: RelevantHands,
    goldHandsLevels: NumericDictionary<boolean>
) => Object.values(relevantHands).filter((hand) => goldHandsLevels[hand.level]);

export const getAreGoldHandsBlockingProgress = (
    gameConfig: GameConfig,
    relevantHands: RelevantHands,
    trainedHands: TrainedHands,
    progress: number
) =>
    gameConfig.useGoldHands
        ? progress < 100 &&
          getUntrainedRelevantHands(relevantHands, trainedHands, gameConfig.goldHandsLevels)
              .length === 0
        : false;

// Called after player hitting, splitting or starting a split hand. It returns a card that
// turns the current player hand into another untrained hand (against the current dealer card).
// If there are no untrained hands (against the current dealer card) or no untrained hands can
// be reached from the current player hand (e.g. a Hard 20), returns a random card
export const getCardForUntrainedHand = (
    playerHand: Hand,
    dealerSymbol: SimpleCardSymbol,
    relevantHands: RelevantHands,
    trainedHands: TrainedHands
): Card => {
    const isPlayerHandSoft = playerHand.values.length > 1;
    const playerHandValues = getCardsValues(playerHand.cards);

    const valuesToUntrainedHands = Object.values(relevantHands)
        .map((relevantHand) => {
            const isHandUntrainedForDealerCard =
                trainedHands[relevantHand.representation][dealerSymbol] ===
                TrainedHandStatus.untrained;

            let valueToReachThisHand: number;

            if (isSplitHandRepresentation(relevantHand.representation)) {
                // Untrained split hands can never be reached after user action
                valueToReachThisHand = -1;
            } else if (isSoftHandRepresentation(relevantHand.representation)) {
                const currentHandMinValue = parseInt(relevantHand.representation.split('/')[0], 10);
                const softDifference = currentHandMinValue - playerHandValues[0];

                if (isPlayerHandSoft) {
                    // E.g. Player hand = 3/13. Can reach 4/14+ but not 3/13- (equal or lower)
                    valueToReachThisHand = softDifference > 0 ? softDifference : -1;
                } else {
                    // E.g. Player hand = 8. Can only 9/19 (soft hand)
                    valueToReachThisHand = softDifference === 1 ? softDifference : -1;
                }
            } else {
                const currentHandHardValue = parseInt(relevantHand.representation, 10);
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
                  isBlueCard: true,
                  isGoldCard: false,
                  suit: getRandomSuit(),
                  symbol: valueToSymbol(getRandomItem(valuesToUntrainedHands))
              }
            : getRandomCard();

    return nextCard;
};

export const getGoldHandsNumber = (
    relevantHands: RelevantHands,
    goldHandsLevels: NumericDictionary<boolean>
) => allPossibleDealerCards.length * getActiveRelevantHands(relevantHands, goldHandsLevels).length;

export const getRandomTrainingPair = (
    relevantHands: RelevantHands,
    trainedHands: TrainedHands,
    goldHandsLevels: NumericDictionary<boolean>
): TrainingPair => {
    const untrainedRelevantHands = getUntrainedRelevantHands(
        relevantHands,
        trainedHands,
        goldHandsLevels
    );

    const randomRelevantHand =
        untrainedRelevantHands.length > 0
            ? getRandomItem(untrainedRelevantHands)
            : getRandomItem(getActiveRelevantHands(relevantHands, goldHandsLevels)); // In case all hands have been passed

    const dealerHands = trainedHands[randomRelevantHand.representation];
    const untrainedDealerHands = getUntrainedDealerHands(dealerHands);

    const randomDealerHand =
        untrainedDealerHands.length > 0
            ? getRandomItem(untrainedDealerHands)
            : getRandomItem(Object.keys(dealerHands) as SimpleCardSymbol[]); // In case all hands have been passed

    return {
        dealer: createHand([
            {
                isBlueCard: false,
                isGoldCard: true,
                suit: getRandomSuit(),
                symbol: simpleSymbolToSymbol(randomDealerHand)
            }
        ]),
        player: handRepresentationToHand(randomRelevantHand.representation)
    };
};

export const getSpecificTrainingPair = (
    handRepresentation: HandRepresentation,
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
        player: handRepresentationToHand(handRepresentation)
    };
};

const getUntrainedDealerHands = (dealerHands: Dictionary<TrainedHandStatus, SimpleCardSymbol>) =>
    Object.keys(dealerHands).filter(
        (cardSymbol) => dealerHands[cardSymbol as SimpleCardSymbol] !== TrainedHandStatus.passed
    ) as SimpleCardSymbol[];

const getUntrainedRelevantHands = (
    relevantHands: RelevantHands,
    trainedHands: TrainedHands,
    goldHandsLevels: NumericDictionary<boolean>
) =>
    getActiveRelevantHands(relevantHands, goldHandsLevels).filter(
        (relevantHand) =>
            getUntrainedDealerHands(trainedHands[relevantHand.representation]).length > 0
    );
