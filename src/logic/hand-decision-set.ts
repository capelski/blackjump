import { HandDecisionSet, BaseDecisions } from '../types';

export const alwaysHit: HandDecisionSet = {
    2: BaseDecisions.hit,
    3: BaseDecisions.hit,
    4: BaseDecisions.hit,
    5: BaseDecisions.hit,
    6: BaseDecisions.hit,
    7: BaseDecisions.hit,
    8: BaseDecisions.hit,
    9: BaseDecisions.hit,
    10: BaseDecisions.hit,
    11: BaseDecisions.hit
};

export const alwaysSplit: HandDecisionSet = {
    2: BaseDecisions.split,
    3: BaseDecisions.split,
    4: BaseDecisions.split,
    5: BaseDecisions.split,
    6: BaseDecisions.split,
    7: BaseDecisions.split,
    8: BaseDecisions.split,
    9: BaseDecisions.split,
    10: BaseDecisions.split,
    11: BaseDecisions.split
};

export const alwaysStand: HandDecisionSet = {
    2: BaseDecisions.stand,
    3: BaseDecisions.stand,
    4: BaseDecisions.stand,
    5: BaseDecisions.stand,
    6: BaseDecisions.stand,
    7: BaseDecisions.stand,
    8: BaseDecisions.stand,
    9: BaseDecisions.stand,
    10: BaseDecisions.stand,
    11: BaseDecisions.stand
};
