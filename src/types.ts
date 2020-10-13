// TODO Split the file into multiple

export interface BasicStrategyConditioningFactors {
    canDouble: boolean;
    canDoubleAfterSplit: boolean;
    canSurrender: boolean;
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
    | 'splitIfDASOtherwiseHit'
    | 'surrenderOtherwiseHit';

export type Decision = 'double' | 'hit' | 'split' | 'stand' | 'surrender';

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
                surrenderOtherwiseHit: DecisionsSet;
            };
        };
    };
}

export type Dictionary<T> = { [key: string]: T };

export interface GameConfig {
    canDoubleOnAnyInitialHand: boolean;
    canDoubleAfterSplit: boolean;
    canSurrender: boolean;
    currentTrainingPair: number;
    selectedLevels: NumericDictionary<boolean>;
    selectedTrainingPairs: TrainingPair[];
}

export interface Hand {
    bet: number;
    cards: Card[];
    outcome?: string;
    values: number[];
}

export enum HandOutcome {
    blackjack = 'Blackjack',
    bust = 'Bust',
    dealerWins = 'Dealer wins',
    playerWins = 'Player wins',
    push = 'Push'
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

export interface Player {
    cash: number;
    handIndex: number;
    hands: Hand[];
}

export interface RelevantHand {
    decisions: DecisionsSet;
    level: (gameConfig: GameConfig) => number;
    name: string;
}

export enum ScreenTypes {
    table = 'table',
    config = 'config'
}

export interface TrainingHand {
    dealerHand: Hand;
    playerHand: Hand;
}

export interface TrainingPair {
    dealerHand: HandRepresentation;
    playerHand: HandRepresentation;
}
