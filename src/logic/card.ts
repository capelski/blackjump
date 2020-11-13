import {
    Card,
    CardSuit,
    CardSymbol,
    Dictionary,
    SimpleCardSymbol,
    SpecialCardSymbol,
    TenPointsCardSymbol
} from '../types';
import { cartesianProduct, getRandomItem } from '../utils';

const cardsValue: Dictionary<number[], CardSymbol> = {
    [SimpleCardSymbol.Ace]: [1, 11],
    [SimpleCardSymbol.Two]: [2],
    [SimpleCardSymbol.Three]: [3],
    [SimpleCardSymbol.Four]: [4],
    [SimpleCardSymbol.Five]: [5],
    [SimpleCardSymbol.Six]: [6],
    [SimpleCardSymbol.Seven]: [7],
    [SimpleCardSymbol.Eight]: [8],
    [SimpleCardSymbol.Nine]: [9],
    [SimpleCardSymbol.Ten]: [10],
    [SpecialCardSymbol.Jack]: [10],
    [SpecialCardSymbol.Queen]: [10],
    [SpecialCardSymbol.King]: [10]
};

const suits = [CardSuit.clubs, CardSuit.diamonds, CardSuit.hearts, CardSuit.spades];

const symbols = Object.keys(cardsValue) as CardSymbol[];

export const createDeck = (): Card[] =>
    cartesianProduct(suits, symbols, (suit, symbol) => ({ suit, symbol }));

export const getCardEffectiveValue = (card: Card): number => {
    const values = getCardValues(card);
    return values[values.length - 1];
};

export const getCardValues = (card: Card): number[] => cardsValue[card.symbol];

export const simpleSymbolToSymbol = (simpleSymbol: SimpleCardSymbol): CardSymbol =>
    simpleSymbol === SimpleCardSymbol.Ten ? getRandomItem(tenPointsSymbols) : simpleSymbol;

export const symbolToSimpleSymbol = (symbol: CardSymbol): SimpleCardSymbol =>
    symbol in SpecialCardSymbol ? SimpleCardSymbol.Ten : (symbol as SimpleCardSymbol);

const tenPointsSymbols: TenPointsCardSymbol[] = [
    SimpleCardSymbol.Ten,
    SpecialCardSymbol.Jack,
    SpecialCardSymbol.Queen,
    SpecialCardSymbol.King
];

export const valueToSymbol = (number: number): CardSymbol =>
    number === 10 ? getRandomItem(tenPointsSymbols) : (String(number) as CardSymbol);
