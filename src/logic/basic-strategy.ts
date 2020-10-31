import {
    BaseDecisions,
    DynamicConditions,
    DynamicDecision,
    DynamicDecisions,
    GameSettings,
    GameSettingsDecision,
    GameSettingsDecisions,
    GameSettingsKeys,
    Hand,
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
    gameSettings: GameSettings,
    dynamicConditions: DynamicConditions
): OptimalDecision => {
    const relevantHand = getRelevantHand(playerHand);
    const dealerHandValue = getHandEffectiveValue(dealerHand);

    const gameSettingsDecision = relevantHand.decisions[dealerHandValue];
    const dynamicDecision = mapGameSettingsDecisionToDynamicDecision(
        gameSettingsDecision,
        gameSettings
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

export const getRelevantHand = (playerHand: Hand) => {
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

export const mapGameSettingsDecisionToDynamicDecision = (
    gameSettingsDecision: GameSettingsDecision,
    gameSettings: GameSettings
): DynamicDecision =>
    gameSettingsDecision === GameSettingsDecisions.doubleIfAllowed_hit
        ? gameSettings[GameSettingsKeys.canDoubleOnAnyInitialHand]
            ? DynamicDecisions.double_hit
            : BaseDecisions.hit
        : gameSettingsDecision === GameSettingsDecisions.doubleIfAllowed_stand
        ? gameSettings[GameSettingsKeys.canDoubleOnAnyInitialHand]
            ? DynamicDecisions.double_stand
            : BaseDecisions.stand
        : gameSettingsDecision === GameSettingsDecisions.splitIfDasAllowed_hit
        ? gameSettings[GameSettingsKeys.canDoubleAfterSplit]
            ? BaseDecisions.split
            : BaseDecisions.hit
        : gameSettingsDecision === GameSettingsDecisions.surrenderIfAllowed_hit
        ? gameSettings[GameSettingsKeys.canSurrender]
            ? DynamicDecisions.surrender_hit
            : BaseDecisions.hit
        : gameSettingsDecision;
