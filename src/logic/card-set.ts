import { Card, CardSet, CardSymbol } from '../types';
import { shuffleArray } from '../utils';
import { createDeck } from './card';

export const collectPlayedCards = (cardSet: CardSet) => {
    cardSet.discardPile.push(...cardSet.beingPlayed);
    cardSet.beingPlayed = [];
    if (cardSet.discardPile.length > 100) {
        cardSet.unusedCards.push(...cardSet.discardPile);
        cardSet.discardPile = [];
        shuffleArray(cardSet.unusedCards);
    }
};

export const extractCardFromCardSet = (symbol: CardSymbol, cardSet: CardSet): Card => {
    // We search for the cards in the discardPile first to minimize the game interfering
    let card = extractCardFromCollection(symbol, cardSet.discardPile);
    if (!card) {
        card = extractCardFromCollection(symbol, cardSet.unusedCards);
    }
    cardSet.beingPlayed.push(card!);
    return card!;
};

const extractCardFromCollection = (symbol: CardSymbol, cards: Card[]): Card | undefined => {
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
