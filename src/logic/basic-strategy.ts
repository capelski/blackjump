import {
    BaseDecisions,
    CasinoRules,
    CasinoRulesDecision,
    CasinoRulesDecisions,
    CasinoRulesKeys,
    DynamicConditions,
    DynamicDecision,
    DynamicDecisions,
    Hand,
    HandRepresentation,
    OptimalDecision,
    PlayerDecision,
    PlayerDecisions
} from '../types';
import { decisionsDictionary } from './decisions-dictionary';
import { getHandEffectiveValue } from './hand';
import { handToHandRepresentation } from './hand-representation';

export const getOptimalDecision = (
    playerHand: Hand,
    dealerHand: Hand,
    casinoRules: CasinoRules,
    dynamicConditions: DynamicConditions
): OptimalDecision => {
    const relevantHand = handToRelevantHand(playerHand);
    const dealerHandValue = getHandEffectiveValue(dealerHand);

    const casinoRulesDecision = relevantHand.decisions[dealerHandValue];
    const dynamicDecision = mapCasinoRulesDecisionToDynamicDecision(
        casinoRulesDecision,
        casinoRules
    );
    const actualDecision: PlayerDecision = mapDynamicDecisionToPlayerDecision(
        dynamicDecision,
        dynamicConditions
    );

    return {
        decision: actualDecision,
        description: `${relevantHand.name} must ${dynamicDecision} against dealer's ${dealerHandValue}. See hand strategy ➡️`
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
        ? casinoRules[CasinoRulesKeys.canDoubleOnAnyInitialHand]
            ? DynamicDecisions.double_hit
            : BaseDecisions.hit
        : casinoRulesDecision === CasinoRulesDecisions.doubleIfAllowed_stand
        ? casinoRules[CasinoRulesKeys.canDoubleOnAnyInitialHand]
            ? DynamicDecisions.double_stand
            : BaseDecisions.stand
        : casinoRulesDecision === CasinoRulesDecisions.splitIfDasAllowed_hit
        ? casinoRules[CasinoRulesKeys.canDoubleAfterSplit]
            ? BaseDecisions.split
            : BaseDecisions.hit
        : casinoRulesDecision === CasinoRulesDecisions.surrenderIfAllowed_hit
        ? casinoRules[CasinoRulesKeys.canSurrender]
            ? DynamicDecisions.surrender_hit
            : BaseDecisions.hit
        : casinoRulesDecision;
