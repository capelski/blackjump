import { Hand } from './hand';

export interface TrainingPair {
    dealer: Hand;
    player: Hand;
}

export enum TrainingPairStatus {
    untrained = 0,
    passed = 1,
    failed = 2
}
