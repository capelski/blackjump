import { SimpleCardSymbol } from './card';
import { DecisionsSet } from './decisions';
import { Dictionary } from './dictionary';
import { GameSettingsKeys, GameSettings } from './game-settings';
import { Hand, HandRepresentation } from './hand';

export interface RelevantHand {
    decisions: DecisionsSet;
    dependencies: GameSettingsKeys[];
    level: (gameSettings: GameSettings) => number;
    name: string;
}

export enum TrainedHandStatus {
    untrained = 0,
    passed = 1,
    failed = 2
}

export type TrainedHands = Dictionary<
    Dictionary<TrainedHandStatus, SimpleCardSymbol>,
    HandRepresentation
>;

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
