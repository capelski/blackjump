import {
    BasicStrategyConditioningFactors,
    ConditionalDecision,
    Decision,
    DecisionsSet,
    Dictionary,
    Hand,
    OptimalDecision,
    RelevantHand
} from '../types';
import { numberRange } from '../utils';
import { getHandEffectiveValue, getHandValidValues } from './hand';
import { handToHandRepresentation } from './hand-representation';

const extendDecisionSet = (
    previousDecisionSet: DecisionsSet,
    decision: ConditionalDecision,
    startScore: number,
    endScore: number
) => {
    return numberRange(startScore, endScore).reduce(
        (target, propertyName) => ({
            ...target,
            [propertyName]: decision
        }),
        previousDecisionSet
    );
};

const createDecisionsSet = (
    decision: ConditionalDecision,
    startScore?: number,
    previousDecisionSet?: DecisionsSet
): DecisionsSet => {
    const currentDecisionsSet: DecisionsSet = {
        ...extendDecisionSet(
            // tslint:disable-next-line:no-object-literal-type-assertion
            previousDecisionSet || ({} as DecisionsSet),
            decision,
            startScore || 2,
            11
        ),
        until: {
            dealer: (limitScore) => {
                return {
                    then: {
                        double: createDecisionsSet('double', limitScore + 1, currentDecisionsSet),
                        doubleOtherwiseHit: createDecisionsSet(
                            'doubleOtherwiseHit',
                            limitScore + 1,
                            currentDecisionsSet
                        ),
                        doubleOtherwiseStand: createDecisionsSet(
                            'doubleOtherwiseStand',
                            limitScore + 1,
                            currentDecisionsSet
                        ),
                        hit: createDecisionsSet('hit', limitScore + 1, currentDecisionsSet),
                        split: createDecisionsSet('split', limitScore + 1, currentDecisionsSet),
                        splitIfDASOtherwiseHit: createDecisionsSet(
                            'splitIfDASOtherwiseHit',
                            limitScore + 1,
                            currentDecisionsSet
                        ),
                        stand: createDecisionsSet('stand', limitScore + 1, currentDecisionsSet),
                        surrenderOtherwiseHit: createDecisionsSet(
                            'surrenderOtherwiseHit',
                            limitScore + 1,
                            currentDecisionsSet
                        )
                    }
                };
            }
        }
    };
    return currentDecisionsSet;
};

const doubleOtherwiseHit = createDecisionsSet('doubleOtherwiseHit');
const hit = createDecisionsSet('hit');
const split = createDecisionsSet('split');
const splitIfDASOtherwiseHit = createDecisionsSet('splitIfDASOtherwiseHit');
const stand = createDecisionsSet('stand');

export const decisionsDictionary: Dictionary<RelevantHand> = {
    // Hard hands
    // '4', -> Only possible with 2,2, already covered in splitHands
    '5': { decisions: hit, level: () => 1 },
    '6': { decisions: hit, level: () => 1 },
    '7': { decisions: hit, level: () => 1 },
    '8': { decisions: hit, level: () => 1 },
    '9': {
        decisions: hit.until.dealer(2).then.doubleOtherwiseHit.until.dealer(6).then.hit,
        level: () => 3
    },
    '10': { decisions: doubleOtherwiseHit.until.dealer(9).then.hit, level: () => 2 },
    '11': { decisions: doubleOtherwiseHit.until.dealer(10).then.hit, level: () => 2 },
    '12': { decisions: hit.until.dealer(3).then.stand.until.dealer(6).then.hit, level: () => 3 },
    '13': { decisions: stand.until.dealer(6).then.hit, level: () => 2 },
    '14': { decisions: stand.until.dealer(6).then.hit, level: () => 2 },
    '15': {
        decisions: stand.until
            .dealer(6)
            .then.hit.until.dealer(9)
            .then.surrenderOtherwiseHit.until.dealer(10).then.hit,
        level: (gameConfig) => (gameConfig.canSurrender ? 4 : 2)
    },
    '16': {
        decisions: stand.until.dealer(6).then.hit.until.dealer(8).then.surrenderOtherwiseHit,
        level: (gameConfig) => (gameConfig.canSurrender ? 3 : 2)
    },
    '17': { decisions: stand, level: () => 1 },
    '18': { decisions: stand, level: () => 1 },
    '19': { decisions: stand, level: () => 1 },
    '20': { decisions: stand, level: () => 1 },
    // '21' -> Maximum score! This hand doesn't need training

    // Soft hands
    '3/13': {
        decisions: hit.until.dealer(4).then.doubleOtherwiseHit.until.dealer(6).then.hit,
        level: (gameConfig) => (gameConfig.canDoubleOnAnyInitialHand ? 3 : 1)
    },
    '4/14': {
        decisions: hit.until.dealer(4).then.doubleOtherwiseHit.until.dealer(6).then.hit,
        level: (gameConfig) => (gameConfig.canDoubleOnAnyInitialHand ? 3 : 1)
    },
    '5/15': {
        decisions: hit.until.dealer(3).then.doubleOtherwiseHit.until.dealer(6).then.hit,
        level: (gameConfig) => (gameConfig.canDoubleOnAnyInitialHand ? 3 : 1)
    },
    '6/16': {
        decisions: hit.until.dealer(3).then.doubleOtherwiseHit.until.dealer(6).then.hit,
        level: (gameConfig) => (gameConfig.canDoubleOnAnyInitialHand ? 3 : 1)
    },
    '7/17': {
        decisions: hit.until.dealer(2).then.doubleOtherwiseHit.until.dealer(6).then.hit,
        level: (gameConfig) => (gameConfig.canDoubleOnAnyInitialHand ? 3 : 1)
    },
    '8/18': {
        decisions: stand.until
            .dealer(2)
            .then.doubleOtherwiseStand.until.dealer(6)
            .then.stand.until.dealer(8).then.hit,
        level: (gameConfig) => (gameConfig.canDoubleOnAnyInitialHand ? 3 : 1)
    },
    '9/19': { decisions: stand, level: () => 1 },
    '10/20': { decisions: stand, level: () => 1 },
    // 'A,Figure' -> BlackJack! This hand doesn't need training

    // Split hands
    '2,2': {
        decisions: splitIfDASOtherwiseHit.until.dealer(3).then.split.until.dealer(7).then.hit,
        level: (gameConfig) => (gameConfig.canDoubleAfterSplit ? 2 : 3)
    },
    '3,3': {
        decisions: splitIfDASOtherwiseHit.until.dealer(3).then.split.until.dealer(7).then.hit,
        level: (gameConfig) => (gameConfig.canDoubleAfterSplit ? 2 : 3)
    },
    '4,4': {
        decisions: hit.until.dealer(4).then.splitIfDASOtherwiseHit.until.dealer(6).then.hit,
        level: (gameConfig) => (gameConfig.canDoubleAfterSplit ? 3 : 1)
    },
    '5,5': { decisions: doubleOtherwiseHit.until.dealer(9).then.hit, level: () => 2 }, // Always considered a hard 10
    '6,6': {
        decisions: splitIfDASOtherwiseHit.until.dealer(2).then.split.until.dealer(6).then.hit,
        level: (gameConfig) => (gameConfig.canDoubleAfterSplit ? 2 : 3)
    },
    '7,7': { decisions: split.until.dealer(7).then.hit, level: () => 2 },
    '8,8': { decisions: split, level: () => 1 },
    '9,9': {
        decisions: split.until.dealer(6).then.stand.until.dealer(7).then.split.until.dealer(9).then
            .stand,
        level: () => 4
    },
    'Figure,Figure': { decisions: stand, level: () => 1 }, // Always considered a hard 20
    'A,A': { decisions: split, level: () => 1 }
};

export const getOptimalDecision = (
    playerHand: Hand,
    dealerHand: Hand,
    conditioningFactors: BasicStrategyConditioningFactors
): OptimalDecision => {
    const handRepresentation = handToHandRepresentation(playerHand);
    const dealerHandValue = getHandEffectiveValue(dealerHand);
    const optimalDecision = decisionsDictionary[handRepresentation].decisions[dealerHandValue];

    const decision: Decision =
        optimalDecision === 'doubleOtherwiseHit'
            ? conditioningFactors.canDouble
                ? 'double'
                : 'hit'
            : optimalDecision === 'doubleOtherwiseStand'
            ? conditioningFactors.canDouble
                ? 'double'
                : 'stand'
            : optimalDecision === 'splitIfDASOtherwiseHit'
            ? conditioningFactors.canDoubleAfterSplit
                ? 'split'
                : 'hit'
            : optimalDecision === 'surrenderOtherwiseHit'
            ? conditioningFactors.canSurrender
                ? 'surrender'
                : 'hit'
            : optimalDecision;

    return {
        decision,
        description: `The optimal decision for ${getHandValidValues(playerHand).join(
            '/'
        )} (${playerHand.cards
            .map((c) => c.symbol)
            .join(',')}) against a dealer ${getHandValidValues(dealerHand).join(
            '/'
        )} is to ${decision}`
    };
};
