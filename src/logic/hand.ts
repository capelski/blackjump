import {
    Card,
    CardSymbol,
    CasinoRules,
    CasinoRulesKeys,
    Doubling,
    Hand,
    HandCode,
    HandOutcome,
    SimpleCardSymbol,
    TrainingHands,
    TrainingPairStatus,
    TrainingProgress
} from '../types';
import { getRandomItem } from '../utils';
import {
    getCardEffectiveValue,
    getCardsValues,
    getRandomCard,
    getRandomSuit,
    revealHoleCard,
    symbolToSimpleSymbol,
    valueToSymbol
} from './card';
import {
    getHardHandSymbols,
    getSoftHandSymbols,
    getSplitHandSymbols,
    isSoftHandCode,
    isSplitHandCode
} from './hand-code';

export const canBeDealerBlackJack = (hand: Hand) => {
    const visibleCard = hand.cards[0];
    const cardSymbol = symbolToSimpleSymbol(visibleCard.symbol);
    return cardSymbol === SimpleCardSymbol.Ace || cardSymbol === SimpleCardSymbol.Ten;
};

export const canDouble = (hand: Hand, handsNumber: number, casinoRules: CasinoRules) => {
    const handEffectiveValue = getHandEffectiveValue(hand);
    const isHandWithTwoCards = hand.cards.length === 2;
    const isSingleHand = handsNumber === 1;

    const contains9To11 = hand.values.some((handValue) => [9, 10, 11].indexOf(handValue) > -1);
    const is10To11 = handEffectiveValue === 10 || handEffectiveValue === 11;
    const is9To11 = handEffectiveValue === 9 || is10To11;

    return (
        isHandWithTwoCards &&
        (casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair ||
            (casinoRules[CasinoRulesKeys.doubling] >= Doubling.nineToElevenSoft && contains9To11) ||
            (casinoRules[CasinoRulesKeys.doubling] >= Doubling.nineToEleven && is9To11) ||
            (casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven && is10To11)) &&
        (isSingleHand || casinoRules[CasinoRulesKeys.doubleAfterSplit])
    );
};

export const canSplit = (hand: Hand) =>
    hand.cards.length === 2 &&
    getCardEffectiveValue(hand.cards[0]) === getCardEffectiveValue(hand.cards[1]);

export const canSurrender = (hand: Hand, handsNumber: number, casinoRules: CasinoRules) =>
    handsNumber === 1 && hand.cards.length === 2 && casinoRules[CasinoRulesKeys.surrender];

export const createDealerHand = (casinoRules: CasinoRules, dealerSymbol?: CardSymbol) => {
    const dealerCards: Card[] = [
        dealerSymbol
            ? {
                  isBlueCard: false,
                  isGoldCard: true,
                  suit: getRandomSuit(),
                  symbol: dealerSymbol
              }
            : getRandomCard()
    ];

    if (casinoRules[CasinoRulesKeys.holeCard]) {
        dealerCards.push(getRandomCard({ isHoleCard: true }));
    }

    return createHand(dealerCards);
};

export const createHand = (cards: Card[], bet = 1): Hand => ({
    bet,
    cards: cards,
    values: getCardsValues(cards)
});

export const dealCard = (hand: Hand, card: Card) => {
    hand.cards.push(card);
    hand.values = getCardsValues(hand.cards);
};

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
                trainingProgress[trainingHand.code][dealerSymbol] === TrainingPairStatus.untrained;

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

export const getHandEffectiveValue = (hand: Hand) => {
    let effectiveValue = hand.values[0];
    if (hand.values.some((v) => v < 22)) {
        effectiveValue = [...hand.values].reverse().find((v) => v < 22)!;
    }
    return effectiveValue;
};

export const getHandValidValues = (hand: Hand): number[] => {
    return hand.values.some((v) => v < 22) ? hand.values.filter((v) => v < 22) : [hand.values[0]];
};

export const handCodeToHand = (handCode: HandCode): Hand => {
    const handSymbols = isSplitHandCode(handCode)
        ? getSplitHandSymbols(handCode)
        : isSoftHandCode(handCode)
        ? getSoftHandSymbols(handCode)
        : getHardHandSymbols(handCode);

    return createHand(
        handSymbols.map(
            (symbol): Card => ({
                isBlueCard: false,
                isGoldCard: true,
                suit: getRandomSuit(),
                symbol
            })
        )
    );
};

export const handToHandCode = (hand: Hand): HandCode => {
    const handSymbols = hand.cards.map((c) => symbolToSimpleSymbol(c.symbol));
    const isSplitHand = handSymbols.length === 2 && handSymbols[0] === handSymbols[1];

    return isSplitHand
        ? (handSymbols.join(',') as HandCode)
        : (getHandValidValues(hand).join('/') as HandCode);
};

export const hasHoleCard = (hand: Hand) => hand.cards.length > 1 && hand.cards[1].isHoleCard;

export const isBlackJack = (hand: Hand) => {
    return (
        hand.cards.length === 2 &&
        hand.values.length === 2 &&
        hand.values[0] === 11 &&
        hand.values[1] === 21
    );
};

export const isBust = (hand: Hand) => {
    return getHandEffectiveValue(hand) > 21;
};

export const isDealerBlackJack = (hand: Hand) => {
    const cardValues = getCardsValues(hand.cards, { peeking: true });
    return (
        hand.cards.length === 2 &&
        cardValues.length === 2 &&
        cardValues[0] === 11 &&
        cardValues[1] === 21
    );
};

export const isFinished = (hand: Hand) => {
    return getHandEffectiveValue(hand) >= 21;
};

export const resolveHand = (playerHand: Hand, dealerHand: Hand): HandOutcome => {
    const playerHandValue = getHandEffectiveValue(playerHand);
    const dealerHandValue = getHandEffectiveValue(dealerHand!);
    const handOutcome = isBust(playerHand)
        ? HandOutcome.bust
        : isBlackJack(playerHand) && isBlackJack(dealerHand!)
        ? HandOutcome.push
        : isBlackJack(playerHand)
        ? HandOutcome.blackjack
        : isBlackJack(dealerHand!)
        ? HandOutcome.dealerWins
        : isBust(dealerHand!)
        ? HandOutcome.playerWins
        : playerHandValue > dealerHandValue
        ? HandOutcome.playerWins
        : playerHandValue === dealerHandValue
        ? HandOutcome.push
        : HandOutcome.dealerWins;

    playerHand.outcome = handOutcome;
    return handOutcome;
};

export const revealDealerHoleCard = (hand: Hand) => {
    revealHoleCard(hand.cards[1]);
    hand.values = getCardsValues(hand.cards);
};
