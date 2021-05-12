import {
    BaseDecisions,
    DecisionEvaluation,
    DynamicConditions,
    DynamicDecision,
    DynamicDecisions,
    Hand,
    PlayerDecision,
    PlayerDecisions,
    RelevantHands
} from '../types';
import { getHandEffectiveValue } from './hand';
import { handToHandRepresentation } from './hand-representation';

export const evaluateDecision = (
    playerHand: Hand,
    dealerHand: Hand,
    relevantHands: RelevantHands,
    dynamicConditions: DynamicConditions,
    playerDecision: PlayerDecision
): DecisionEvaluation => {
    const handRepresentation = handToHandRepresentation(playerHand);
    const relevantHand = relevantHands[handRepresentation];
    const dealerHandValue = getHandEffectiveValue(dealerHand);

    const dynamicDecision = relevantHand.decisionSet[dealerHandValue];
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
