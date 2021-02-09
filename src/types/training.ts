import { SimpleCardSymbol } from './card';
import { CasinoRules, CasinoRulesKeys } from './casino-rules';
import { DecisionsSet } from './decisions';
import { Dictionary } from './dictionary';
import { FailedHand, Hand, HandRepresentation } from './hand';

export interface RelevantHand {
    decisions: DecisionsSet;
    dependencies: CasinoRulesKeys[];
    level: (casinoRules: CasinoRules) => number;
    name: string;
}

export type TrainedHands = Dictionary<
    Dictionary<TrainedHandStatus, SimpleCardSymbol>,
    HandRepresentation
>;

export type TrainedHandsStats = {
    passed: number;
    trained: number;
};

export enum TrainedHandStatus {
    untrained = 0,
    passed = 1,
    failed = 2
}

export interface TrainingHands {
    failed: FailedHand[];
    isCompleted: boolean;
    stats: TrainedHandsStats;
    trained: TrainedHands;
}

export interface TrainingPair {
    dealer: Hand;
    player: Hand;
}

export interface TrainingSet {
    dealerHands: SimpleCardSymbol[];
    playerHand: {
        data: RelevantHand;
        representation: HandRepresentation;
    };
}
