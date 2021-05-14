import { CasinoRulesKeys } from './casino-rules';
import { HandDecisionSet } from './decisions';
import { Dictionary } from './dictionary';
import { HandCode } from './hand';

export interface TrainingHand {
    code: HandCode;
    decisionSet: HandDecisionSet;
    dependencies: CasinoRulesKeys[];
    level: number;
    name: string;
}

export type TrainingHands = Dictionary<TrainingHand, HandCode>;

export enum TrainingHandStatus {
    untrained = 0,
    passed = 1,
    failed = 2
}
