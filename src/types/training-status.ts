import { SimpleCardSymbol } from './card';
import { Dictionary } from './dictionary';
import { HandCode } from './hand';
import { TrainingHandStatus } from './training-hand';

export type DealerSymbols = Dictionary<TrainingHandStatus, SimpleCardSymbol>;

// TODO Rename to FailedTrainingPair. Move to TrainingPair
export interface FailedHand {
    dealerSymbol: SimpleCardSymbol;
    handCode: HandCode;
}

// TODO Rename
export type TrainedHandsStats = {
    passed: number;
    trained: number;
};

export type TrainingProgress = Dictionary<DealerSymbols, HandCode>;

export interface TrainingStatus {
    failedHands: FailedHand[];
    isCompleted: boolean;
    progress: TrainingProgress;
    stats: TrainedHandsStats;
}
