import {
    BaseDecisions,
    CasinoRules,
    CasinoRulesDecision,
    CasinoRulesDecisions,
    CasinoRulesKeys,
    DecisionEvaluation,
    Doubling,
    DynamicConditions,
    DynamicDecision,
    DynamicDecisions,
    Hand,
    HandRepresentation,
    PlayerDecision,
    PlayerDecisions
} from '../types';
import { decisionsDictionary } from './decisions-dictionary';
import { getHandEffectiveValue } from './hand';
import { handToHandRepresentation } from './hand-representation';

export const evaluateDecision = (
    playerHand: Hand,
    dealerHand: Hand,
    casinoRules: CasinoRules,
    dynamicConditions: DynamicConditions,
    playerDecision: PlayerDecision
): DecisionEvaluation => {
    const relevantHand = handToRelevantHand(playerHand);
    const dealerHandValue = getHandEffectiveValue(dealerHand);

    const casinoRulesDecision = relevantHand.decisions[dealerHandValue];
    const dynamicDecision = mapCasinoRulesDecisionToDynamicDecision(
        casinoRulesDecision,
        casinoRules
    );
    const optimalDecision: PlayerDecision = mapDynamicDecisionToPlayerDecision(
        dynamicDecision,
        dynamicConditions
    );

    return {
        dealerHandValue,
        dynamicDecision,
        handName: relevantHand.name,
        isHit: playerDecision === optimalDecision
    };
};

export const handRepresentationToRelevantHand = (handRepresentation: HandRepresentation) => {
    return decisionsDictionary[handRepresentation];
};

export const handToRelevantHand = (playerHand: Hand) => {
    const handRepresentation = handToHandRepresentation(playerHand);
    return decisionsDictionary[handRepresentation];
};

export const mapDynamicDecisionToPlayerDecision = (
    dynamicDecision: DynamicDecision,
    dynamicConditions: DynamicConditions
): PlayerDecision =>
    dynamicDecision === DynamicDecisions.double_hit
        ? dynamicConditions.canDouble
            ? PlayerDecisions.double
            : BaseDecisions.hit
        : dynamicDecision === DynamicDecisions.double_stand
        ? dynamicConditions.canDouble
            ? PlayerDecisions.double
            : BaseDecisions.stand
        : dynamicDecision === DynamicDecisions.surrender_hit
        ? dynamicConditions.canSurrender
            ? PlayerDecisions.surrender
            : BaseDecisions.hit
        : dynamicDecision;

export const mapCasinoRulesDecisionToDynamicDecision = (
    casinoRulesDecision: CasinoRulesDecision,
    casinoRules: CasinoRules
): DynamicDecision =>
    casinoRulesDecision === CasinoRulesDecisions.doubleIfAllowed_hit
        ? casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair
            ? DynamicDecisions.double_hit
            : BaseDecisions.hit
        : casinoRulesDecision === CasinoRulesDecisions.doubleIfAllowed_stand
        ? casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair
            ? DynamicDecisions.double_stand
            : BaseDecisions.stand
        : casinoRulesDecision === CasinoRulesDecisions.splitIfDasAllowed_hit
        ? casinoRules[CasinoRulesKeys.doubleAfterSplit]
            ? BaseDecisions.split
            : BaseDecisions.hit
        : casinoRulesDecision === CasinoRulesDecisions.surrenderIfAllowed_hit
        ? casinoRules[CasinoRulesKeys.surrender]
            ? DynamicDecisions.surrender_hit
            : BaseDecisions.hit
        : casinoRulesDecision;
