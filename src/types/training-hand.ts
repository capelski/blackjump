import { SimpleCardSymbol } from './card';
import { CasinoRulesKeys } from './casino-rules';
import { HandDecisionSet } from './decisions';
import { Dictionary } from './dictionary';
import { HandCode } from './hand';
import { TrainingPairStatus } from './training-pair';

export interface TrainingHand {
    code: HandCode;
    decisionSet: HandDecisionSet;
    dependencies: CasinoRulesKeys[];
    level: number;
    name: string;
}

export type TrainingHands = Dictionary<TrainingHand, HandCode>;

export type TrainingHandStatus = Dictionary<TrainingPairStatus, SimpleCardSymbol>;
