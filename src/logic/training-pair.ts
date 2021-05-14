import {
    Card,
    DealerSymbols,
    GameConfig,
    GoldHandsLevels,
    Hand,
    HandCode,
    SimpleCardSymbol,
    TrainingHands,
    TrainingHandStatus,
    TrainingProgress,
    TrainingPair
} from '../types';
import { getObjectKeys, getRandomItem } from '../utils';
import {
    getCardsValues,
    getRandomCard,
    getRandomSuit,
    simpleSymbolToSymbol,
    valueToSymbol
} from './card';
import { createHand } from './hand';
import { handCodeToHand, isSoftHandCode, isSplitHandCode } from './hand-code';

export const allDealerSymbols: SimpleCardSymbol[] = [
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

export const allTrainingPairsNumber = allDealerSymbols.length * Object.keys(HandCode).length;

const getActiveTrainingHands = (trainingHands: TrainingHands, goldHandsLevels: GoldHandsLevels) =>
    Object.values(trainingHands).filter((hand) => goldHandsLevels[hand.level]);

export const getAreGoldHandsBlockingProgress = (
    gameConfig: GameConfig,
    trainingHands: TrainingHands,
    trainingProgress: TrainingProgress,
    progress: number
) =>
    gameConfig.useGoldHands
        ? progress < 100 &&
          getUntrainedTrainingHands(trainingHands, trainingProgress, gameConfig.goldHandsLevels)
              .length === 0
        : false;

// Called after player hitting, splitting or starting a split hand. It returns a card that
// turns the current player hand into another untrained hand (against the current dealer card).
// If there are no untrained hands (against the current dealer card) or no untrained hands can
// be reached from the current player hand (e.g. a Hard 20), returns a random card
export const getCardForUntrainedHand = (
    playerHand: Hand,
    dealerSymbol: SimpleCardSymbol,
    trainingHands: TrainingHands,
    trainingProgress: TrainingProgress
): Card => {
    const isPlayerHandSoft = playerHand.values.length > 1;
    const playerHandValues = getCardsValues(playerHand.cards);

    const valuesToUntrainedHands = Object.values(trainingHands)
        .map((trainingHand) => {
            const isHandUntrainedForDealerSymbol =
                trainingProgress[trainingHand.code][dealerSymbol] === TrainingHandStatus.untrained;

            let valueToReachThisHand: number;

            if (isSplitHandCode(trainingHand.code)) {
                // Untrained split hands can never be reached after user action
                valueToReachThisHand = -1;
            } else if (isSoftHandCode(trainingHand.code)) {
                const currentHandMinValue = parseInt(trainingHand.code.split('/')[0], 10);
                const softDifference = currentHandMinValue - playerHandValues[0];

                if (isPlayerHandSoft) {
                    // E.g. Player hand = 3/13. Can reach 4/14+ but not 3/13- (equal or lower)
                    valueToReachThisHand = softDifference > 0 ? softDifference : -1;
                } else {
                    // E.g. Player hand = 8. Can only 9/19 (soft hand)
                    valueToReachThisHand = softDifference === 1 ? softDifference : -1;
                }
            } else {
                const currentHandHardValue = parseInt(trainingHand.code, 10);
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

            return isHandUntrainedForDealerSymbol && valueToReachThisHand > -1
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
    trainingHands: TrainingHands,
    goldHandsLevels: GoldHandsLevels
) => allDealerSymbols.length * getActiveTrainingHands(trainingHands, goldHandsLevels).length;

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

const getUntrainedDealerSymbols = (dealerSymbols: DealerSymbols) =>
    getObjectKeys(dealerSymbols).filter(
        (dealerSymbol) => dealerSymbols[dealerSymbol] !== TrainingHandStatus.passed
    );

const getUntrainedTrainingHands = (
    trainingHands: TrainingHands,
    trainingProgress: TrainingProgress,
    goldHandsLevels: GoldHandsLevels
) =>
    getActiveTrainingHands(trainingHands, goldHandsLevels).filter(
        (trainingHand) => getUntrainedDealerSymbols(trainingProgress[trainingHand.code]).length > 0
    );
