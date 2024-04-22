import { CardSymbol, HandCode, SimpleCardSymbol } from '../types';
import { simpleSymbolToSymbol, valueToSymbol } from './card';

export const getHardHandSymbols = (handCode: HandCode): CardSymbol[] => {
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

export const getSoftHandSymbols = (handCode: HandCode): CardSymbol[] => {
  const handValues = handCode.split('/').map((s) => parseInt(s, 10));
  const complementarySymbol = valueToSymbol(handValues[0] - 1);

  // Make Ace the second card sometimes by randomly reversing the symbols
  return Math.floor(Math.random() * 100) % 2
    ? [complementarySymbol, SimpleCardSymbol.Ace]
    : [SimpleCardSymbol.Ace, complementarySymbol];
};

export const getSplitHandSymbols = (handCode: HandCode): CardSymbol[] => {
  const splitSymbols = handCode.split(',') as SimpleCardSymbol[];
  return splitSymbols.map(simpleSymbolToSymbol);
};

export const isSoftHandCode = (handCode: HandCode) => handCode.includes('/');

export const isSplitHandCode = (handCode: HandCode) => handCode.includes(',');
