// TODO Split the file into multiple

export enum BaseDecisions {
    hit = 'Hit',
    split = 'Split',
    stand = 'Stand'
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

export enum DynamicDecisions {
    double_hit = 'Double / Hit',
    double_stand = 'Double / Stand',
    surrender_hit = 'Surrender / Hit'
}

export type DynamicDecision = BaseDecisions | DynamicDecisions;

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
    canDoubleAfterSplit = 'Can double after split',
    canDoubleOnAnyInitialHand = 'Can double on any initial hand',
    canSurrender = 'Can surrender'
}

export enum GameSettingsDecisions {
    doubleIfAllowed_hit = 'doubleIfAllowed/hit',
    doubleIfAllowed_stand = 'doubleIfAllowed/stand',
    splitIfDasAllowed_hit = 'splitIfDasAllowed/hit',
    surrenderIfAllowed_hit = 'surrenderIfAllowed/hit'
}

export type GameSettingsDecision = DynamicDecision | GameSettingsDecisions;

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

export enum PlayerDecisions {
    double = 'Double',
    surrender = 'Surrender'
}

export type PlayerDecision = BaseDecisions | PlayerDecisions;

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
