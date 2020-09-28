import { Hand, Card, CardSet } from '../types';
import { cartesianProduct, removeDuplicates } from '../utils';
import { getCardValues, extractNextCard } from './card-set';

export const createHand = (cards: Card[]): Hand => ({
    cards: cards,
    values: getHandValues(cards)
});

export const dealCard = (hand: Hand, cardSet: CardSet): Hand => {
    const nextCard = extractNextCard(cardSet);
    const nextHandCards = hand.cards.concat([nextCard]);
    return { cards: nextHandCards, values: getHandValues(nextHandCards) };
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
