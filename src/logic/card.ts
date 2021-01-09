import {
    Card,
    CardSuit,
    CardSymbol,
    Dictionary,
    SimpleCardSymbol,
    SpecialCardSymbol,
    TenPointsCardSymbol
} from '../types';
import { cartesianProduct, getRandomItem, removeDuplicates } from '../utils';

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

const deck = cartesianProduct(
    suits,
    symbols,
    (suit, symbol): Card => ({ isBlueCard: false, isGoldCard: false, suit, symbol })
);

export const getCardEffectiveValue = (card: Card): number => {
    const values = getCardValues(card);
    return values[values.length - 1];
};

export const getCardsValues = (cards: Card[]) => {
    const cardsValues = cards.map((card) => getCardValues(card));
    const cardsAggregatedValues = cardsValues.reduce(
        (reducedValues, currentValues) =>
            cartesianProduct(reducedValues, currentValues, (x, y) => x + y),
        [0]
    );
    return removeDuplicates(cardsAggregatedValues);
};

const getCardValues = (card: Card): number[] => cardsValue[card.symbol];

export const getRandomCard = () => getRandomItem(deck);

export const getRandomSuit = () => getRandomItem(suits);

export const simpleSymbolToSymbol = (simpleSymbol: SimpleCardSymbol): CardSymbol =>
    simpleSymbol === SimpleCardSymbol.Ten ? getRandomItem(tenPointsSymbols) : simpleSymbol;

export const symbolToSimpleSymbol = (symbol: CardSymbol): SimpleCardSymbol =>
    tenPointsSymbols.indexOf(symbol as SpecialCardSymbol) > -1
        ? SimpleCardSymbol.Ten
        : (symbol as SimpleCardSymbol);

const tenPointsSymbols: TenPointsCardSymbol[] = [
    SimpleCardSymbol.Ten,
    SpecialCardSymbol.Jack,
    SpecialCardSymbol.Queen,
    SpecialCardSymbol.King
];

export const valueToSymbol = (number: number): CardSymbol =>
    number === 10
        ? getRandomItem(tenPointsSymbols)
        : number === 1
        ? SimpleCardSymbol.Ace
        : (String(number) as CardSymbol);
