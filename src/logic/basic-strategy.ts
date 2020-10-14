import {
    DynamicConditions,
    DynamicDecision,
    GameSettings,
    GameSettingsDecision,
    Hand,
    OptimalDecision,
    PlayerDecision
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
        description: `${relevantHand.name} must ${dynamicDecision} against dealer's ${dealerHandValue}`
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
    dynamicDecision === 'double/hit'
        ? dynamicConditions.canDouble
            ? 'double'
            : 'hit'
        : dynamicDecision === 'double/stand'
        ? dynamicConditions.canDouble
            ? 'double'
            : 'stand'
        : dynamicDecision === 'surrender/hit'
        ? dynamicConditions.canSurrender
            ? 'surrender'
            : 'hit'
        : dynamicDecision;

export const mapGameSettingsDecisionToDynamicDecision = (
    gameSettingsDecision: GameSettingsDecision,
    gameSettings: GameSettings
): DynamicDecision =>
    gameSettingsDecision === 'doubleIfAllowed/hit'
        ? gameSettings.canDoubleOnAnyInitialHand
            ? 'double/hit'
            : 'hit'
        : gameSettingsDecision === 'doubleIfAllowed/stand'
        ? gameSettings.canDoubleOnAnyInitialHand
            ? 'double/stand'
            : 'stand'
        : gameSettingsDecision === 'splitIfDasAllowed/hit'
        ? gameSettings.canDoubleAfterSplit
            ? 'split'
            : 'hit'
        : gameSettingsDecision === 'surrenderIfAllowed/hit'
        ? gameSettings.canSurrender
            ? 'surrender/hit'
            : 'hit'
        : gameSettingsDecision;
