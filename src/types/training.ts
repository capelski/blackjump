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

export interface RelevantHand {
    decisionSet: HandDecisionSet;
    dependencies: CasinoRulesKeys[];
    level: number;
    name: string;
    representation: HandRepresentation;
}

export type RelevantHands = Dictionary<RelevantHand, HandRepresentation>;

export type TrainedHands = Dictionary<DealerCards, HandRepresentation>;

export type TrainedHandsStats = {
    passed: number;
    trained: number;
};

export enum TrainedHandStatus {
    untrained = 0,
    passed = 1,
    failed = 2
}

export interface TrainingPair {
    dealer: Hand;
    player: Hand;
}

export interface TrainingStatus {
    failed: FailedHand[];
    isCompleted: boolean;
    stats: TrainedHandsStats;
    trained: TrainedHands;
}
