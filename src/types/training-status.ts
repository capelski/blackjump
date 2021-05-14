import { SimpleCardSymbol } from './card';
import { Dictionary } from './dictionary';
import { HandCode } from './hand';
import { TrainingHandStatus } from './training-hand';

// TODO Rename to DealerSymbols
export type DealerCards = Dictionary<TrainingHandStatus, SimpleCardSymbol>;

export interface FailedHand {
    dealerSymbol: SimpleCardSymbol;
    handCode: HandCode;
}

export type TrainedHandsStats = {
    passed: number;
    trained: number;
};

export type TrainingProgress = Dictionary<DealerCards, HandCode>;

export interface TrainingStatus {
    failedHands: FailedHand[];
    isCompleted: boolean;
    progress: TrainingProgress;
    stats: TrainedHandsStats;
}
