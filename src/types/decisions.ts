export enum BaseDecisions {
    hit = 'Hit',
    split = 'Split',
    stand = 'Stand'
}

export interface DecisionEvaluation {
    dealerHandValue: number;
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

export interface HandDecisionSet {
    [key: number]: DynamicDecision;
    2: DynamicDecision;
    3: DynamicDecision;
    4: DynamicDecision;
    5: DynamicDecision;
    6: DynamicDecision;
    7: DynamicDecision;
    8: DynamicDecision;
    9: DynamicDecision;
    10: DynamicDecision;
    11: DynamicDecision;
}

export type PlayerDecision = BaseDecisions | PlayerDecisions;

export enum PlayerDecisions {
    double = 'Double',
    surrender = 'Surrender'
}
