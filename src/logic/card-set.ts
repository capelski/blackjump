import { CardSet, Dictionary, Card } from '../types';
import { shuffleArray, cartesianProduct } from '../utils';

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

export const collectPlayedCards = (cardSet: CardSet) => {
    cardSet.discardPile.push(...cardSet.beingPlayed);
    cardSet.beingPlayed = [];
    if (cardSet.discardPile.length > 100) {
        cardSet.unusedCards.push(...cardSet.discardPile);
        cardSet.discardPile = [];
        shuffleArray(cardSet.unusedCards);
    }
};

export const extractCardFromCardSet = (symbol: string, cardSet: CardSet): Card => {
    // We search for the cards in the discardPile first to minimize the game interfering
    let card = extractCardFromCollection(symbol, cardSet.discardPile);
    if (!card) {
        card = extractCardFromCollection(symbol, cardSet.unusedCards);
    }
    cardSet.beingPlayed.push(card!);
    return card!;
};

const extractCardFromCollection = (symbol: string, cards: Card[]): Card | undefined => {
    let targetCard: Card | undefined;
    // We iterate the cards set from end to beginning to minimize the game interfering
    for (let i = cards.length - 1; i >= 0; --i) {
        const card = cards[i];
        if (symbol === card.symbol) {
            targetCard = card;
            cards.splice(i, 1);
            break;
        }
    }
    return targetCard;
};

export const extractNextCard = (cardSet: CardSet) => {
    const nextCard = cardSet.unusedCards.splice(0, 1)[0];
    cardSet.beingPlayed.push(nextCard);
    return nextCard;
};

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
