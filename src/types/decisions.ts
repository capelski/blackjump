import { SimpleCardSymbol } from './card';
import { CasinoRules } from './casino-rules';
import { Dictionary } from './dictionary';
import { HandCode } from './hand';

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

export type HandDecisionSetGetters = Dictionary<
    (casinoRules: CasinoRules) => HandDecisionSet,
    HandCode
>;

export interface HandDecisionSet {
    [SimpleCardSymbol.Two]: DynamicDecision;
    [SimpleCardSymbol.Three]: DynamicDecision;
    [SimpleCardSymbol.Four]: DynamicDecision;
    [SimpleCardSymbol.Five]: DynamicDecision;
    [SimpleCardSymbol.Six]: DynamicDecision;
    [SimpleCardSymbol.Seven]: DynamicDecision;
    [SimpleCardSymbol.Eight]: DynamicDecision;
    [SimpleCardSymbol.Nine]: DynamicDecision;
    [SimpleCardSymbol.Ten]: DynamicDecision;
    [SimpleCardSymbol.Ace]: DynamicDecision;
}

export type PlayerDecision = BaseDecisions | PlayerDecisions;

export enum PlayerDecisions {
    double = 'Double',
    surrender = 'Surrender'
}
