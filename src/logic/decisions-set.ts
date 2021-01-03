import {
    BaseDecisions,
    CasinoRulesDecision,
    CasinoRulesDecisions,
    DecisionsSet,
    DynamicDecisions
} from '../types';
import { numberRange } from '../utils';

export const extendDecisionSet = (
    previousDecisionSet: DecisionsSet,
    decision: CasinoRulesDecision,
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
    decision: CasinoRulesDecision,
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
                            DynamicDecisions.double_hit,
                            limitScore + 1,
                            currentDecisionsSet
                        ),
                        doubleIfAllowed_hit: createDecisionsSet(
                            CasinoRulesDecisions.doubleIfAllowed_hit,
                            limitScore + 1,
                            currentDecisionsSet
                        ),
                        doubleIfAllowed_stand: createDecisionsSet(
                            CasinoRulesDecisions.doubleIfAllowed_stand,
                            limitScore + 1,
                            currentDecisionsSet
                        ),
                        hit: createDecisionsSet(
                            BaseDecisions.hit,
                            limitScore + 1,
                            currentDecisionsSet
                        ),
                        split: createDecisionsSet(
                            BaseDecisions.split,
                            limitScore + 1,
                            currentDecisionsSet
                        ),
                        splitIfDasAllowed_hit: createDecisionsSet(
                            CasinoRulesDecisions.splitIfDasAllowed_hit,
                            limitScore + 1,
                            currentDecisionsSet
                        ),
                        stand: createDecisionsSet(
                            BaseDecisions.stand,
                            limitScore + 1,
                            currentDecisionsSet
                        ),
                        surrenderIfAllowed_hit: createDecisionsSet(
                            CasinoRulesDecisions.surrenderIfAllowed_hit,
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
