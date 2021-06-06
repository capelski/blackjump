import { Dictionary } from './dictionary';
import { HandCode } from './hand';
import { TrainingHandStatus } from './training-hand';
import { TrainingPairRepresentation } from './training-pair';

export type TrainingProgress = Dictionary<TrainingHandStatus, HandCode>;

export interface TrainingStatus {
    attemptedTrainingPairs: number;
    isCompleted: boolean;
    isProgressBlocked: boolean;
    missedTrainingPairs: TrainingPairRepresentation[];
    passedTrainingPairs: number;
    trainingProgress: TrainingProgress;
}
