import { Hand, Card } from '../types';
import { cartesianProduct, removeDuplicates } from '../utils';
import { getCardValue } from './card-set';

export const getHandEffectiveValue = (hand: Hand) => {
    let effectiveValue = hand.values[0];
    if (hand.values.some((v) => v < 22)) {
        effectiveValue = [...hand.values].reverse().find((v) => v < 22)!;
    }
    return effectiveValue;
};

export const getHandValidValues = (hand: Hand) => {
    return hand.values.filter((v) => v < 22);
};

export const getHandValues = (cards: Card[]) => {
    const cardsValues = cards.map((card) => getCardValue(card));
    const cardsAggregatedValues = cardsValues.reduce(
        (reducedValues, currentValues) =>
            cartesianProduct(reducedValues, currentValues, (x, y) => x + y),
        [0]
    );
    return removeDuplicates(cardsAggregatedValues);
};
