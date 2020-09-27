import { getCardValue } from './card-set';
import { Card } from './types';
import { cartesianProduct, removeDuplicates } from './utils';

export const getHandValues = (cards: Card[]) => {
    const cardsValues = cards.map((card) => getCardValue(card));
    const cardsAggregatedValues = cardsValues.reduce(
        (reducedValues, currentValues) =>
            cartesianProduct(reducedValues, currentValues, (x, y) => x + y),
        [0]
    );
    const uniqueValues = removeDuplicates(cardsAggregatedValues);
    // const validValues = uniqueValues.filter((value) => value < 22);
    const isBlackJackOrMaxScore = uniqueValues.indexOf(21) > -1;

    return isBlackJackOrMaxScore ? [21] : uniqueValues; // validValues;
};
