import { SimpleCardSymbol } from './card';
import { Hand, HandCode } from './hand';

export interface TrainingPair {
    dealer: Hand;
    player: Hand;
}

export interface TrainingPairRepresentation {
    dealerSymbol: SimpleCardSymbol;
    handCode: HandCode;
}

export enum TrainingPairStatus {
    untrained = 0,
    passed = 1,
    failed = 2
}
