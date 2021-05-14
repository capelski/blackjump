import { Dictionary } from './dictionary';
import { HandCode } from './hand';
import { TrainingHandStatus } from './training-hand';
import { TrainingPairRepresentation } from './training-pair';

export type TrainingProgress = Dictionary<TrainingHandStatus, HandCode>;

export interface TrainingStatus {
    attemptedHands: number; // TODO Rename to attemptedTrainingPairs
    failedTrainingPairs: TrainingPairRepresentation[];
    isCompleted: boolean;
    passedHands: number; // TODO Rename to passedTrainingPairs
    progress: TrainingProgress; // TODO Rename to trainingPairsProgress
}
