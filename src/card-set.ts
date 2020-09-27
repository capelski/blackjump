import { shuffleArray, cartesianProduct } from './utils';
import { CardSet, Dictionary, Card } from './types';

const cardsValue: Dictionary<number[]> = {
    A: [1, 11],
    '2': [2],
    '3': [3],
    '4': [4],
    '5': [5],
    '6': [6],
    '7': [7],
    '8': [8],
    '9': [9],
    '10': [10],
    J: [10],
    Q: [10],
    K: [10]
};

const symbols = Object.keys(cardsValue);

const suits = ['\u2663', '\u2666', '\u2665', '\u2660'];

const createDeck = (): Card[] =>
    cartesianProduct(suits, symbols, (suit, symbol) => ({ suit, symbol }));

export const getCardSet = (decksNumber = 6): CardSet => {
    const cards = ' '
        .repeat(decksNumber)
        .split('')
        .map((_) => createDeck())
        .reduce((x, y) => x.concat(y), []);

    shuffleArray(cards);

    return {
        beingPlayed: [],
        discardPile: [],
        unusedCards: cards
    };
};

export const getCardValue = (card: Card) => cardsValue[card.symbol];
