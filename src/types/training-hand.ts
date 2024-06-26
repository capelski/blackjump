import { SimpleCardSymbol } from './card';
import { CasinoRulesKeys } from './casino-rules';
import { Dictionary } from './dictionary';
import { HandCode } from './hand';
import { HandDecisionSet } from './hand-decision-set';
import { TrainingPairStatus } from './training-pair';

export interface TrainingHand {
  code: HandCode;
  decisionSet: HandDecisionSet;
  dependencies: CasinoRulesKeys[];
  name: string;
}

export type TrainingHands = Dictionary<TrainingHand, HandCode>;

export type TrainingHandStatus = Dictionary<TrainingPairStatus, SimpleCardSymbol>;
