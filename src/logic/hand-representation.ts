import { CardSet, CardSymbol, Hand, HandRepresentation, SimpleCardSymbol } from '../types';
import { valueToSymbol, symbolToSimpleSymbol, simpleSymbolToSymbol } from './card';
import { extractCardFromCardSet } from './card-set';
import { createHand, getHandValidValues } from './hand';

const getHardHandSymbols = (handRepresentation: HandRepresentation): CardSymbol[] => {
    const value = parseInt(handRepresentation, 10);

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

    return [valueToSymbol(firstValue), valueToSymbol(secondValue)];
};

const getSoftHandSymbols = (handRepresentation: HandRepresentation): CardSymbol[] => {
    const handValues = handRepresentation.split('/').map((s) => parseInt(s, 10));
    const complementarySymbol = valueToSymbol(handValues[0] - 1);

    // Make Ace the second card sometimes by randomly reversing the symbols
    return Math.floor(Math.random() * 100) % 2
        ? [complementarySymbol, SimpleCardSymbol.Ace]
        : [SimpleCardSymbol.Ace, complementarySymbol];
};

const getSplitHandSymbols = (handRepresentation: HandRepresentation): CardSymbol[] => {
    const splitSymbols = handRepresentation.split(',') as SimpleCardSymbol[];
    return splitSymbols.map(simpleSymbolToSymbol);
};

export const handRepresentationToHand = (
    handRepresentation: HandRepresentation,
    cardSet: CardSet
): Hand => {
    const handSymbols = handRepresentation.includes(',')
        ? getSplitHandSymbols(handRepresentation)
        : handRepresentation.includes('/')
        ? getSoftHandSymbols(handRepresentation)
        : getHardHandSymbols(handRepresentation);

    return createHand(handSymbols.map((symbol) => extractCardFromCardSet(symbol, cardSet)));
};

export const handToHandRepresentation = (hand: Hand): HandRepresentation => {
    const handSymbols = hand.cards.map((c) => symbolToSimpleSymbol(c.symbol));
    const isSplitHand = handSymbols.length === 2 && handSymbols[0] === handSymbols[1];

    return isSplitHand
        ? (handSymbols.join(',') as HandRepresentation)
        : (getHandValidValues(hand).join('/') as HandRepresentation);
};
