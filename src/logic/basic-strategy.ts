import {
    BaseDecisions,
    DecisionEvaluation,
    DynamicConditions,
    DynamicDecision,
    DynamicDecisions,
    Hand,
    PlayerDecision,
    PlayerDecisions,
    TrainingHands
} from '../types';
import { symbolToSimpleSymbol } from './card';
import { handToHandCode } from './hand';

export const evaluateDecision = (
    playerHand: Hand,
    dealerHand: Hand,
    trainingHands: TrainingHands,
    dynamicConditions: DynamicConditions,
    playerDecision: PlayerDecision
): DecisionEvaluation => {
    const handCode = handToHandCode(playerHand);
    const trainingHand = trainingHands[handCode];
    const dealerSymbol = symbolToSimpleSymbol(dealerHand.cards[0].symbol);

    const dynamicDecision = trainingHand.decisionSet[dealerSymbol];
    const optimalDecision = evaluateDynamicDecision(dynamicDecision, dynamicConditions);

    return {
        dealerSymbol,
        dynamicDecision,
        handName: trainingHand.name,
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
        : dynamicDecision === DynamicDecisions.split_hit
        ? dynamicConditions.canSplit
            ? PlayerDecisions.split
            : BaseDecisions.hit
        : dynamicDecision === DynamicDecisions.split_stand
        ? dynamicConditions.canSplit
            ? PlayerDecisions.split
            : BaseDecisions.stand
        : dynamicDecision === DynamicDecisions.split_surrender_hit
        ? dynamicConditions.canSplit
            ? PlayerDecisions.split
            : dynamicConditions.canSurrender
            ? PlayerDecisions.surrender
            : BaseDecisions.hit
        : dynamicDecision === DynamicDecisions.surrender_hit
        ? dynamicConditions.canSurrender
            ? PlayerDecisions.surrender
            : BaseDecisions.hit
        : dynamicDecision === DynamicDecisions.surrender_stand
        ? dynamicConditions.canSurrender
            ? PlayerDecisions.surrender
            : BaseDecisions.stand
        : dynamicDecision;
