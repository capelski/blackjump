import {
    BaseDecisions,
    DecisionsSet,
    DynamicDecisions,
    GameSettingsDecision,
    GameSettingsDecisions
} from '../types';
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
                            DynamicDecisions.double_hit,
                            limitScore + 1,
                            currentDecisionsSet
                        ),
                        doubleIfAllowed_hit: createDecisionsSet(
                            GameSettingsDecisions.doubleIfAllowed_hit,
                            limitScore + 1,
                            currentDecisionsSet
                        ),
                        doubleIfAllowed_stand: createDecisionsSet(
                            GameSettingsDecisions.doubleIfAllowed_stand,
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
                            GameSettingsDecisions.splitIfDasAllowed_hit,
                            limitScore + 1,
                            currentDecisionsSet
                        ),
                        stand: createDecisionsSet(
                            BaseDecisions.stand,
                            limitScore + 1,
                            currentDecisionsSet
                        ),
                        surrenderIfAllowed_hit: createDecisionsSet(
                            GameSettingsDecisions.surrenderIfAllowed_hit,
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
