import { Hand, Card, CardSet, HandOutcome, GameSettings, GameSettingsKeys } from '../types';
import { cartesianProduct, removeDuplicates } from '../utils';
import { getCardEffectiveValue, getCardValues } from './card';
import { extractNextCard } from './card-set';

export const canDouble = (hand: Hand, handsNumber: number, gameSettings: GameSettings) =>
    hand.cards.length === 2 &&
    (gameSettings[GameSettingsKeys.canDoubleAfterSplit] || handsNumber === 1) &&
    (gameSettings[GameSettingsKeys.canDoubleOnAnyInitialHand] ||
        [9, 10, 11].indexOf(getHandEffectiveValue(hand)) > -1);

export const canSplit = (hand: Hand) =>
    hand.cards.length === 2 &&
    getCardEffectiveValue(hand.cards[0]) === getCardEffectiveValue(hand.cards[1]);

export const canSurrender = (hand: Hand, handsNumber: number, gameSettings: GameSettings) =>
    handsNumber === 1 && hand.cards.length === 2 && gameSettings[GameSettingsKeys.canSurrender];

export const createHand = (cards: Card[], bet = 1): Hand => ({
    bet,
    cards: cards,
    values: getHandValues(cards)
});

export const dealCard = (hand: Hand, cardSet: CardSet) => {
    const nextCard = extractNextCard(cardSet);
    hand.cards.push(nextCard);
    hand.values = getHandValues(hand.cards);
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

export const getHandValues = (cards: Card[]) => {
    const cardsValues = cards.map((card) => getCardValues(card));
    const cardsAggregatedValues = cardsValues.reduce(
        (reducedValues, currentValues) =>
            cartesianProduct(reducedValues, currentValues, (x, y) => x + y),
        [0]
    );
    return removeDuplicates(cardsAggregatedValues);
};

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

export const isFinished = (hand: Hand) => {
    return getHandEffectiveValue(hand) >= 21;
};

export const resolveHand = (playerHand: Hand, dealerHand: Hand): HandOutcome => {
    const playerHandValue = getHandEffectiveValue(playerHand);
    const dealerHandValue = getHandEffectiveValue(dealerHand!);
    const handOutcome = isBust(playerHand)
        ? HandOutcome.bust
        : isBust(dealerHand!)
        ? HandOutcome.playerWins
        : isBlackJack(playerHand) && isBlackJack(dealerHand!)
        ? HandOutcome.push
        : isBlackJack(dealerHand!)
        ? HandOutcome.dealerWins
        : isBlackJack(playerHand)
        ? HandOutcome.blackjack
        : playerHandValue > dealerHandValue
        ? HandOutcome.playerWins
        : playerHandValue === dealerHandValue
        ? HandOutcome.push
        : HandOutcome.dealerWins;

    playerHand.outcome = handOutcome;
    return handOutcome;
};
