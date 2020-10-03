import { Decision, DecisionsSet, Dictionary, Hand, OptimalDecision } from '../types';
import { numberRange } from '../utils';
import { getHandEffectiveValue, getHandValidValues } from './hand';
import { handToHandRepresentation } from './hand-representation';

const extendDecisionSet = (
    previousDecisionSet: DecisionsSet,
    decision: Decision,
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
    decision: Decision,
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
                        hit: createDecisionsSet('hit', limitScore + 1, currentDecisionsSet),
                        split: createDecisionsSet('split', limitScore + 1, currentDecisionsSet),
                        stand: createDecisionsSet('stand', limitScore + 1, currentDecisionsSet)
                    }
                };
            }
        }
    };
    return currentDecisionsSet;
};

const double = createDecisionsSet('double');
const hit = createDecisionsSet('hit');
const split = createDecisionsSet('split');
const stand = createDecisionsSet('stand');

export const decisionsDictionary: Dictionary<DecisionsSet> = {
    // Split hands
    '2,2': split.until.dealer(7).then.hit,
    '3,3': split.until.dealer(7).then.hit,
    '4,4': hit.until.dealer(4).then.split.until.dealer(6).then.hit,
    '5,5': double.until.dealer(9).then.hit,
    '6,6': split.until.dealer(6).then.hit,
    '7,7': split.until.dealer(7).then.hit,
    '8,8': split.until.dealer(9).then.hit,
    '9,9': split.until.dealer(6).then.stand.until.dealer(7).then.split.until.dealer(9).then.stand,
    'Figure,Figure': stand,
    'A,A': split.until.dealer(10).then.hit,
    // Soft hands
    '3/13': hit,
    '4/14': hit,
    '5/15': hit,
    '6/16': hit,
    '7/17': hit,
    '8/18': stand.until.dealer(8).then.hit,
    '9/19': stand,
    '10/20': stand,
    // 'A,Figure' -> BlackJack! This hand doesn't need training
    // Hard hands
    // '4', -> Only possible with 2,2, already covered in splitHands
    '5': hit,
    '6': hit,
    '7': hit,
    '8': hit,
    '9': hit.until.dealer(2).then.double.until.dealer(6).then.hit,
    '10': double.until.dealer(9).then.hit,
    '11': double.until.dealer(9).then.hit,
    '12': hit.until.dealer(3).then.stand.until.dealer(6).then.hit,
    '13': stand.until.dealer(6).then.hit,
    '14': stand.until.dealer(6).then.hit,
    '15': stand.until.dealer(6).then.hit,
    '16': stand.until.dealer(6).then.hit,
    '17': stand,
    '18': stand,
    '19': stand,
    '20': stand
    // '21' -> Maximum score! This hand doesn't need training
};

export const getOptimalDecision = (playerHand: Hand, dealerHand: Hand): OptimalDecision => {
    const handRepresentation = handToHandRepresentation(playerHand);
    const dealerHandValue = getHandEffectiveValue(dealerHand);
    const optimalDecision = decisionsDictionary[handRepresentation][dealerHandValue];

    return {
        decision: optimalDecision,
        description: `The optimal decision for ${getHandValidValues(playerHand).join(
            '/'
        )} (${playerHand.cards
            .map((c) => c.symbol)
            .join(',')}) against a dealer ${getHandValidValues(dealerHand).join(
            '/'
        )} is to ${optimalDecision}`
    };
};
