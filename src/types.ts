// TODO Split the file into multiple

type BaseDecision = 'hit' | 'split' | 'stand';

export interface Card {
    suit: string;
    symbol: string;
}

export interface CardSet {
    beingPlayed: Card[];
    discardPile: Card[];
    unusedCards: Card[];
}

export type DecisionEvaluation =
    | { hit: true }
    | {
          hit: false;
          failureReason: string;
      };

export interface DecisionsSet {
    [key: number]: GameSettingsDecision;
    until: {
        dealer: (
            limit: number
        ) => {
            then: {
                double_hit: DecisionsSet;
                // double_stand: DecisionsSet; Not used
                doubleIfAllowed_hit: DecisionsSet;
                doubleIfAllowed_stand: DecisionsSet;
                hit: DecisionsSet;
                split: DecisionsSet;
                splitIfDasAllowed_hit: DecisionsSet;
                stand: DecisionsSet;
                surrenderIfAllowed_hit: DecisionsSet;
            };
        };
    };
}

export type Dictionary<T> = { [key: string]: T };

export type DynamicDecision = BaseDecision | 'double/hit' | 'double/stand' | 'surrender/hit';

export interface DynamicConditions {
    canDouble: boolean;
    canSurrender: boolean;
}

export interface GameSettings {
    [GameSettingsKeys.canDoubleOnAnyInitialHand]: boolean;
    [GameSettingsKeys.canDoubleAfterSplit]: boolean;
    [GameSettingsKeys.canSurrender]: boolean;
}

export enum GameSettingsKeys {
    canDoubleOnAnyInitialHand = 'Can double on any initial hand',
    canDoubleAfterSplit = 'Can double after split',
    canSurrender = 'Can surrender'
}

export type GameSettingsDecision =
    | DynamicDecision
    | 'doubleIfAllowed/hit'
    | 'doubleIfAllowed/stand'
    | 'splitIfDasAllowed/hit'
    | 'surrenderIfAllowed/hit';

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
    decision: PlayerDecision;
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
    lastActionHand?: Hand;
}

export type PlayerDecision = BaseDecision | 'double' | 'surrender';

export interface RelevantHand {
    decisions: DecisionsSet;
    dependencies: GameSettingsKeys[];
    level: (gameSettings: GameSettings) => number;
    name: string;
}

export enum ScreenTypes {
    config = 'config',
    decisions = 'decisions',
    table = 'table'
}

export interface TrainingHand {
    dealerHand: Hand;
    playerHand: Hand;
}

export interface TrainingPair {
    dealerHand: HandRepresentation;
    playerHand: HandRepresentation;
}

export interface TrainingStatus {
    currentTrainingPair: number;
    gameSettings: GameSettings;
    selectedLevels: NumericDictionary<boolean>;
    selectedTrainingPairs: TrainingPair[];
}
