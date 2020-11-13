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

export type TrainedHands = Dictionary<Dictionary<boolean, SimpleCardSymbol>, HandRepresentation>;

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
