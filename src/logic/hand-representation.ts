import { CardSet, Hand, HandRepresentation } from '../types';
import { extractCardFromCardSet } from './card-set';
import { createHand, getHandValidValues } from './hand';

const figureSymbols = ['10', 'J', 'Q', 'K'];

const cardValueToCardSymbol = (number: number) =>
    number === 10 ? getFigureSymbol() : String(number);

export const figuresToSymbols = (handRepresentation: HandRepresentation) =>
    handRepresentation.replace(/Figure/, getFigureSymbol()).replace(/Figure/, getFigureSymbol());

const getFigureSymbol = (): string => {
    const randomIndex = Math.floor(Math.random() * 3);
    return figureSymbols[randomIndex];
};

const getHardHandSymbols = (value: number): string[] => {
    const minValue = Math.max(2, value - 10);
    const maxValue = Math.min(value - minValue, 10);

    let firstValue = Math.floor(Math.random() * (maxValue - minValue) + minValue);
    let secondValue = value - firstValue;

    // If numbers are equal, we would be training a splittable hand. Change them when possible
    // E.g. Transform a 7,7 (for 14) into a 6,8. Do not transform a 10,10 for 20
    if (firstValue === secondValue && firstValue > minValue && firstValue < maxValue) {
        firstValue++;
        secondValue--;
    }

    return [cardValueToCardSymbol(firstValue), cardValueToCardSymbol(secondValue)];
};

export const handRepresentationToHand = (
    handRepresentation: HandRepresentation,
    cardSet: CardSet
): Hand => {
    const handSymbols = handRepresentation.includes(',')
        ? figuresToSymbols(handRepresentation).split(',') // Split hand
        : handRepresentation.includes('/')
        ? ['A', cardValueToCardSymbol(parseInt(handRepresentation.split('/')[0], 10) - 1)] // Soft hand
        : getHardHandSymbols(parseInt(handRepresentation, 10)); // Hard hand

    // In order for soft hands to sometimes have the A in second place,
    // we reverse the symbols 50% of the times
    const binaryRandom = Math.floor(Math.random() * 100) % 2;
    const cardSymbols = binaryRandom ? handSymbols.reverse() : handSymbols;
    return createHand(cardSymbols.map((symbol) => extractCardFromCardSet(symbol, cardSet)));
};

export const handToHandRepresentation = (hand: Hand): HandRepresentation => {
    const handSymbols = hand.cards.map((c) => c.symbol);
    const handValues = getHandValidValues(hand).join('/');
    return handSymbols.length === 2 && handSymbols[0] === handSymbols[1]
        ? handSymbols.join(',')
        : handValues;
};
