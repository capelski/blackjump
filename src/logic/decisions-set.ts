import { DecisionsSet, GameSettingsDecision } from '../types';
import { numberRange } from '../utils';

export const extendDecisionSet = (
    previousDecisionSet: DecisionsSet,
    decision: GameSettingsDecision,
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

export const createDecisionsSet = (
    decision: GameSettingsDecision,
    startScore?: number,
    previousDecisionSet?: DecisionsSet
): DecisionsSet => {
    const currentDecisionsSet: DecisionsSet = {
        ...extendDecisionSet(
            previousDecisionSet || ({} as DecisionsSet),
            decision,
            startScore || 2,
            11
        ),
        until: {
            dealer: (limitScore) => {
                return {
                    then: {
                        double_hit: createDecisionsSet(
                            'double/hit',
                            limitScore + 1,
                            currentDecisionsSet
                        ),
                        doubleIfAllowed_hit: createDecisionsSet(
                            'doubleIfAllowed/hit',
                            limitScore + 1,
                            currentDecisionsSet
                        ),
                        doubleIfAllowed_stand: createDecisionsSet(
                            'doubleIfAllowed/stand',
                            limitScore + 1,
                            currentDecisionsSet
                        ),
                        hit: createDecisionsSet('hit', limitScore + 1, currentDecisionsSet),
                        split: createDecisionsSet('split', limitScore + 1, currentDecisionsSet),
                        splitIfDasAllowed_hit: createDecisionsSet(
                            'splitIfDasAllowed/hit',
                            limitScore + 1,
                            currentDecisionsSet
                        ),
                        stand: createDecisionsSet('stand', limitScore + 1, currentDecisionsSet),
                        surrenderIfAllowed_hit: createDecisionsSet(
                            'surrenderIfAllowed/hit',
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
