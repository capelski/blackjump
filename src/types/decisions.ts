import { SimpleCardSymbol } from './card';

export enum BaseDecisions {
  hit = 'Hit',
  stand = 'Stand',
}

export interface DecisionEvaluation {
  dealerSymbol: SimpleCardSymbol;
  dynamicDecision: DynamicDecision;
  handName: string;
  isHit: boolean;
}

export interface DynamicConditions {
  canDouble: boolean;
  canSplit: boolean;
  canSurrender: boolean;
}

export type DynamicDecision = BaseDecisions | DynamicDecisions;

export enum DynamicDecisions {
  double_hit = 'Double / Hit',
  double_stand = 'Double / Stand',
  split_hit = 'Split / Hit',
  split_stand = 'Split / Stand',
  split_surrender_hit = 'Split / Surrender',
  surrender_hit = 'Surrender / Hit',
  surrender_split_hit = 'Surrender / Split',
  surrender_stand = 'Surrender / Stand',
}

export type PlayerDecision = BaseDecisions | PlayerDecisions;

export enum PlayerDecisions {
  double = 'Double',
  split = 'Split',
  surrender = 'Surrender',
}
