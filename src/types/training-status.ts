import { Dictionary } from './dictionary';
import { HandCode } from './hand';
import { TrainingHandStatus } from './training-hand';
import { TrainingPairRepresentation } from './training-pair';

export type TrainingProgress = Dictionary<TrainingHandStatus, HandCode>;

export interface TrainingStatus {
    attemptedTrainingPairs: number;
    failedTrainingPairs: TrainingPairRepresentation[];
    isCompleted: boolean;
    passedTrainingPairs: number;
    trainingProgress: TrainingProgress;
}
