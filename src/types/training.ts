import { SimpleCardSymbol } from './card';
import { CasinoRulesKeys } from './casino-rules';
import { HandDecisionSet } from './decisions';
import { Dictionary } from './dictionary';
import { Hand, HandCode } from './hand';

// TODO Rename to DealerSymbols
export type DealerCards = Dictionary<TrainedHandStatus, SimpleCardSymbol>;

export interface FailedHand {
    dealerSymbol: SimpleCardSymbol;
    handCode: HandCode;
}

export type TrainedHandsStats = {
    passed: number;
    trained: number;
};

// TODO Rename to TrainingHandStatus
export enum TrainedHandStatus {
    untrained = 0,
    passed = 1,
    failed = 2
}

export interface TrainingHand {
    code: HandCode;
    decisionSet: HandDecisionSet;
    dependencies: CasinoRulesKeys[];
    level: number;
    name: string;
}

export type TrainingHands = Dictionary<TrainingHand, HandCode>;

export interface TrainingPair {
    dealer: Hand;
    player: Hand;
}

export type TrainingProgress = Dictionary<DealerCards, HandCode>;

export interface TrainingStatus {
    failedHands: FailedHand[];
    isCompleted: boolean;
    progress: TrainingProgress;
    stats: TrainedHandsStats;
}
