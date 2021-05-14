import { Card, CardSymbol, Hand, HandCode, SimpleCardSymbol } from '../types';
import { valueToSymbol, symbolToSimpleSymbol, simpleSymbolToSymbol, getRandomSuit } from './card';
import { createHand, getHandValidValues } from './hand';

const getHardHandSymbols = (handCode: HandCode): CardSymbol[] => {
    const value = parseInt(handCode, 10);

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

const getSoftHandSymbols = (handCode: HandCode): CardSymbol[] => {
    const handValues = handCode.split('/').map((s) => parseInt(s, 10));
    const complementarySymbol = valueToSymbol(handValues[0] - 1);

    // Make Ace the second card sometimes by randomly reversing the symbols
    return Math.floor(Math.random() * 100) % 2
        ? [complementarySymbol, SimpleCardSymbol.Ace]
        : [SimpleCardSymbol.Ace, complementarySymbol];
};

const getSplitHandSymbols = (handCode: HandCode): CardSymbol[] => {
    const splitSymbols = handCode.split(',') as SimpleCardSymbol[];
    return splitSymbols.map(simpleSymbolToSymbol);
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

export const isSoftHandCode = (handCode: HandCode) => handCode.includes('/');

export const isSplitHandCode = (handCode: HandCode) => handCode.includes(',');
