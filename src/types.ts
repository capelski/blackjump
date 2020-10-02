export interface Card {
    suit: string;
    symbol: string;
}

export interface CardSet {
    beingPlayed: Card[];
    discardPile: Card[];
    unusedCards: Card[];
}

export type Decision = 'double' | 'hit' | 'split' | 'stand';

export interface DecisionsSet {
    [key: number]: string;
    until: {
        dealer: (
            limit: number
        ) => {
            then: {
                double: DecisionsSet;
                hit: DecisionsSet;
                split: DecisionsSet;
                stand: DecisionsSet;
            };
        };
    };
}

export type Dictionary<T> = { [key: string]: T };

export interface Hand {
    cards: Card[];
    values: number[];
}

export type HandRepresentation = string;

export type NumericDictionary<T> = { [key: number]: T };

export interface OptimalDecision {
    decision: string;
    description: string;
}

export enum Phases {
    dealer = 'dealer',
    finished = 'finished',
    player = 'player'
}

export interface TrainingHand {
    dealerHand: Hand;
    playerHands: Hand[];
}

export interface TrainingPair {
    dealerHand: HandRepresentation;
    playerHand: HandRepresentation;
}
