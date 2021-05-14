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

export type TrainingProgress = Dictionary<DealerSymbols, HandCode>;

export interface TrainingStatus {
    attemptedHands: number;
    failedHands: FailedHand[];
    isCompleted: boolean;
    passedHands: number;
    progress: TrainingProgress;
}
