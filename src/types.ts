export interface Card {
    suit: string;
    symbol: string;
}

export interface CardSet {
    beingPlayed: Card[];
    discardPile: Card[];
    unusedCards: Card[];
}

export interface Hand {
    cards: Card[];
    values: number[];
}

export type HandRepresentation = string;

export type Dictionary<T> = { [key: string]: T };

export interface TrainingHand {
    dealerHand: Hand;
    playerHands: Hand[];
}

export interface TrainingPair {
    dealerHand: HandRepresentation;
    playerHand: HandRepresentation;
}
