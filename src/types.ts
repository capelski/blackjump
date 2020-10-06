export interface BasicStrategyConditioningFactors {
    canDouble: boolean;
    canDoubleAfterSplit: boolean;
}

export interface Card {
    suit: string;
    symbol: string;
}

export interface CardSet {
    beingPlayed: Card[];
    discardPile: Card[];
    unusedCards: Card[];
}

export type ConditionalDecision =
    | Decision
    | 'doubleOtherwiseHit'
    | 'doubleOtherwiseStand'
    | 'splitIfDASOtherwiseHit';

export type Decision = 'double' | 'hit' | 'split' | 'stand';

export type DecisionEvaluation =
    | { hit: true }
    | {
          hit: false;
          failureReason: string;
      };

export interface DecisionsSet {
    [key: number]: ConditionalDecision;
    until: {
        dealer: (
            limit: number
        ) => {
            then: {
                double: DecisionsSet;
                doubleOtherwiseHit: DecisionsSet;
                doubleOtherwiseStand: DecisionsSet;
                hit: DecisionsSet;
                split: DecisionsSet;
                splitIfDASOtherwiseHit: DecisionsSet;
                stand: DecisionsSet;
            };
        };
    };
}

export type Dictionary<T> = { [key: string]: T };

export interface GameConfig {
    canDoubleOnAnyInitialHand: boolean;
    canDoubleAfterSplit: boolean;
}

export interface Hand {
    cards: Card[];
    values: number[];
}

export type HandRepresentation = string;

export type NumericDictionary<T> = { [key: number]: T };

export interface OptimalDecision {
    decision: Decision;
    description: string;
}

export enum Phases {
    dealer = 'dealer',
    finished = 'finished',
    player = 'player'
}

export enum ScreenTypes {
    table = 'table',
    config = 'config'
}

export interface TrainingHand {
    dealerHand: Hand;
    playerHands: Hand[];
}

export interface TrainingPair {
    dealerHand: HandRepresentation;
    playerHand: HandRepresentation;
}
