import { SimpleCardSymbol } from './card';
import { CasinoRules } from './casino-rules';
import { DynamicDecision } from './decisions';
import { Dictionary } from './dictionary';
import { HandCode } from './hand';

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
