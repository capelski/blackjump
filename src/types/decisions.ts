import { SimpleCardSymbol } from './card';

export enum BaseDecisions {
    hit = 'Hit',
    split = 'Split',
    stand = 'Stand'
}

export interface DecisionEvaluation {
    dealerSymbol: SimpleCardSymbol;
    dynamicDecision: DynamicDecision;
    handName: string;
    isHit: boolean;
}

export interface DynamicConditions {
    canDouble: boolean;
    canSurrender: boolean;
}

export type DynamicDecision = BaseDecisions | DynamicDecisions;

export enum DynamicDecisions {
    double_hit = 'Double / Hit',
    double_stand = 'Double / Stand',
    surrender_hit = 'Surrender / Hit'
}

export type PlayerDecision = BaseDecisions | PlayerDecisions;

export enum PlayerDecisions {
    double = 'Double',
    surrender = 'Surrender'
}
