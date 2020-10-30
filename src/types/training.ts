import { DecisionsSet } from './decisions';
import { NumericDictionary } from './dictionary';
import { GameSettingsKeys, GameSettings } from './game-settings';
import { Hand, HandRepresentation } from './hand';

export interface RelevantHand {
    decisions: DecisionsSet;
    dependencies: GameSettingsKeys[];
    level: (gameSettings: GameSettings) => number;
    name: string;
}

export interface TrainingHand {
    dealerHand: Hand;
    playerHand: Hand;
}

export interface TrainingPair {
    dealerHand: HandRepresentation;
    playerHand: HandRepresentation;
}

export interface TrainingStatus {
    currentTrainingPair: number;
    gameSettings: GameSettings;
    selectedLevels: NumericDictionary<boolean>;
    selectedTrainingPairs: TrainingPair[];
}
