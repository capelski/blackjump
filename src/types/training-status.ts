import { SimpleCardSymbol } from './card';
import { Dictionary } from './dictionary';
import { HandCode } from './hand';
import { TrainingHandStatus } from './training-hand';

// TODO Rename to FailedTrainingPair. Move to TrainingPair
export interface FailedHand {
    dealerSymbol: SimpleCardSymbol;
    handCode: HandCode;
}

export type TrainingProgress = Dictionary<TrainingHandStatus, HandCode>;

export interface TrainingStatus {
    attemptedHands: number; // TODO Rename to attemptedTrainingPairs
    failedHands: FailedHand[]; // TODO Rename to failedTrainingPairs
    isCompleted: boolean;
    passedHands: number; // TODO Rename to passedTrainingPairs
    progress: TrainingProgress; // TODO Rename to trainingPairsProgress
}
