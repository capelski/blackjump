import { SimpleCardSymbol } from './card';
import { CasinoRulesKeys } from './casino-rules';
import { HandDecisionSet } from './decisions';
import { Dictionary } from './dictionary';
import { Hand, HandRepresentation } from './hand';

export type DealerCards = Dictionary<TrainedHandStatus, SimpleCardSymbol>;

export interface FailedHand {
    dealerSymbol: SimpleCardSymbol;
    handRepresentation: HandRepresentation;
}

export type TrainedHandsStats = {
    passed: number;
    trained: number;
};

export enum TrainedHandStatus {
    untrained = 0,
    passed = 1,
    failed = 2
}

export interface TrainingHand {
    decisionSet: HandDecisionSet;
    dependencies: CasinoRulesKeys[];
    level: number;
    name: string;
    representation: HandRepresentation;
}

export type TrainingHands = Dictionary<TrainingHand, HandRepresentation>;

export interface TrainingPair {
    dealer: Hand;
    player: Hand;
}

export type TrainingProgress = Dictionary<DealerCards, HandRepresentation>;

export interface TrainingStatus {
    failed: FailedHand[]; // TODO Rename to failedHands
    isCompleted: boolean;
    progress: TrainingProgress;
    stats: TrainedHandsStats;
}
