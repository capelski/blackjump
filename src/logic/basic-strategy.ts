import {
    BaseDecisions,
    CasinoRules,
    DecisionEvaluation,
    DynamicConditions,
    DynamicDecision,
    DynamicDecisions,
    Hand,
    HandRepresentation,
    PlayerDecision,
    PlayerDecisions
} from '../types';
import { getHandEffectiveValue } from './hand';
import { handToHandRepresentation } from './hand-representation';
import { relevantHands } from './relevant-hands';

export const evaluateDecision = (
    playerHand: Hand,
    dealerHand: Hand,
    casinoRules: CasinoRules,
    dynamicConditions: DynamicConditions,
    playerDecision: PlayerDecision
): DecisionEvaluation => {
    const relevantHand = handToRelevantHand(playerHand);
    const dealerHandValue = getHandEffectiveValue(dealerHand);

    const dynamicDecision = relevantHand.decisionSet(casinoRules)[dealerHandValue];
    const optimalDecision = evaluateDynamicDecision(dynamicDecision, dynamicConditions);

    return {
        dealerHandValue,
        dynamicDecision,
        handName: relevantHand.name,
        isHit: playerDecision === optimalDecision
    };
};

const evaluateDynamicDecision = (
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

export const handRepresentationToRelevantHand = (handRepresentation: HandRepresentation) => {
    return relevantHands[handRepresentation];
};

const handToRelevantHand = (playerHand: Hand) => {
    const handRepresentation = handToHandRepresentation(playerHand);
    return handRepresentationToRelevantHand(handRepresentation);
};
