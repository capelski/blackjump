import {
    HandDecisionSet,
    BaseDecisions,
    HandCode,
    CasinoRulesKeys,
    Doubling,
    DynamicDecisions
} from '../types';
import { HandDecisionSetGetters } from '../types/decisions';

const alwaysHit: HandDecisionSet = {
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

const alwaysSplit: HandDecisionSet = {
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

const alwaysStand: HandDecisionSet = {
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

export const getHandDecisionSetLevel = (decisionSet: HandDecisionSet) =>
    Object.values(decisionSet).reduce<{
        previousValue: string;
        level: number;
    }>(
        (reduced, next) => {
            return reduced.previousValue === next
                ? reduced
                : { previousValue: next, level: reduced.level + 1 };
        },
        {
            previousValue: '',
            level: 0
        }
    ).level;

export const handDecisionSetGetters: HandDecisionSetGetters = {
    [HandCode.Hard5]: () => alwaysHit,
    [HandCode.Hard6]: () => alwaysHit,
    [HandCode.Hard7]: () => alwaysHit,
    [HandCode.Hard8]: () => alwaysHit,
    [HandCode.Hard9]: (casinoRules) => ({
        2: BaseDecisions.hit,
        3:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.nineToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        4:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.nineToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        5:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.nineToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        6:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.nineToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        7: BaseDecisions.hit,
        8: BaseDecisions.hit,
        9: BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandCode.Hard10]: (casinoRules) => ({
        2:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        3:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        4:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        5:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        6:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        7:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        8:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        9:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandCode.Hard11]: (casinoRules) => ({
        2:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        3:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        4:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        5:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        6:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        7:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        8:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        9:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        10:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandCode.Hard12]: () => ({
        2: BaseDecisions.hit,
        3: BaseDecisions.hit,
        4: BaseDecisions.stand,
        5: BaseDecisions.stand,
        6: BaseDecisions.stand,
        7: BaseDecisions.hit,
        8: BaseDecisions.hit,
        9: BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandCode.Hard13]: () => ({
        2: BaseDecisions.stand,
        3: BaseDecisions.stand,
        4: BaseDecisions.stand,
        5: BaseDecisions.stand,
        6: BaseDecisions.stand,
        7: BaseDecisions.hit,
        8: BaseDecisions.hit,
        9: BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandCode.Hard14]: () => ({
        2: BaseDecisions.stand,
        3: BaseDecisions.stand,
        4: BaseDecisions.stand,
        5: BaseDecisions.stand,
        6: BaseDecisions.stand,
        7: BaseDecisions.hit,
        8: BaseDecisions.hit,
        9: BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandCode.Hard15]: (casinoRules) => ({
        2: BaseDecisions.stand,
        3: BaseDecisions.stand,
        4: BaseDecisions.stand,
        5: BaseDecisions.stand,
        6: BaseDecisions.stand,
        7: BaseDecisions.hit,
        8: BaseDecisions.hit,
        9: BaseDecisions.hit,
        10: casinoRules[CasinoRulesKeys.surrender]
            ? DynamicDecisions.surrender_hit
            : BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandCode.Hard16]: (casinoRules) => ({
        2: BaseDecisions.stand,
        3: BaseDecisions.stand,
        4: BaseDecisions.stand,
        5: BaseDecisions.stand,
        6: BaseDecisions.stand,
        7: BaseDecisions.hit,
        8: BaseDecisions.hit,
        9: casinoRules[CasinoRulesKeys.surrender]
            ? DynamicDecisions.surrender_hit
            : BaseDecisions.hit,
        10: casinoRules[CasinoRulesKeys.surrender]
            ? DynamicDecisions.surrender_hit
            : BaseDecisions.hit,
        11: casinoRules[CasinoRulesKeys.surrender]
            ? DynamicDecisions.surrender_hit
            : BaseDecisions.hit
    }),
    [HandCode.Hard17]: () => alwaysStand,
    [HandCode.Hard18]: () => alwaysStand,
    [HandCode.Hard19]: () => alwaysStand,
    [HandCode.Hard20]: () => alwaysStand,
    [HandCode.Soft13]: (casinoRules) => ({
        2: BaseDecisions.hit,
        3: BaseDecisions.hit,
        4: BaseDecisions.hit,
        5:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        6:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        7: BaseDecisions.hit,
        8: BaseDecisions.hit,
        9: BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandCode.Soft14]: (casinoRules) => ({
        2: BaseDecisions.hit,
        3: BaseDecisions.hit,
        4: BaseDecisions.hit,
        5:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        6:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        7: BaseDecisions.hit,
        8: BaseDecisions.hit,
        9: BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandCode.Soft15]: (casinoRules) => ({
        2: BaseDecisions.hit,
        3: BaseDecisions.hit,
        4:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        5:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        6:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        7: BaseDecisions.hit,
        8: BaseDecisions.hit,
        9: BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandCode.Soft16]: (casinoRules) => ({
        2: BaseDecisions.hit,
        3: BaseDecisions.hit,
        4:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        5:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        6:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        7: BaseDecisions.hit,
        8: BaseDecisions.hit,
        9: BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandCode.Soft17]: (casinoRules) => ({
        2: BaseDecisions.hit,
        3:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        4:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        5:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        6:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        7: BaseDecisions.hit,
        8: BaseDecisions.hit,
        9: BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandCode.Soft18]: (casinoRules) => ({
        2: BaseDecisions.stand,
        3:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_stand
                : BaseDecisions.stand,
        4:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_stand
                : BaseDecisions.stand,
        5:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_stand
                : BaseDecisions.stand,
        6:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_stand
                : BaseDecisions.stand,
        7: BaseDecisions.stand,
        8: BaseDecisions.stand,
        9: BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandCode.Soft19]: () => alwaysStand,
    [HandCode.Soft20]: () => alwaysStand,
    [HandCode.Split2s]: (casinoRules) => ({
        2: casinoRules[CasinoRulesKeys.doubleAfterSplit] ? BaseDecisions.split : BaseDecisions.hit,
        3: casinoRules[CasinoRulesKeys.doubleAfterSplit] ? BaseDecisions.split : BaseDecisions.hit,
        4: BaseDecisions.split,
        5: BaseDecisions.split,
        6: BaseDecisions.split,
        7: BaseDecisions.split,
        8: BaseDecisions.hit,
        9: BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandCode.Split3s]: (casinoRules) => ({
        2: casinoRules[CasinoRulesKeys.doubleAfterSplit] ? BaseDecisions.split : BaseDecisions.hit,
        3: casinoRules[CasinoRulesKeys.doubleAfterSplit] ? BaseDecisions.split : BaseDecisions.hit,
        4: BaseDecisions.split,
        5: BaseDecisions.split,
        6: BaseDecisions.split,
        7: BaseDecisions.split,
        8: BaseDecisions.hit,
        9: BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandCode.Split4s]: (casinoRules) => ({
        2: BaseDecisions.hit,
        3: BaseDecisions.hit,
        4: BaseDecisions.hit,
        5: casinoRules[CasinoRulesKeys.doubleAfterSplit] ? BaseDecisions.split : BaseDecisions.hit,
        6: casinoRules[CasinoRulesKeys.doubleAfterSplit] ? BaseDecisions.split : BaseDecisions.hit,
        7: BaseDecisions.hit,
        8: BaseDecisions.hit,
        9: BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandCode.Split5s]: (casinoRules) => ({
        2:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        3:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        4:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        5:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        6:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        7:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        8:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        9:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandCode.Split6s]: (casinoRules) => ({
        2: casinoRules[CasinoRulesKeys.doubleAfterSplit] ? BaseDecisions.split : BaseDecisions.hit,
        3: BaseDecisions.split,
        4: BaseDecisions.split,
        5: BaseDecisions.split,
        6: BaseDecisions.split,
        7: BaseDecisions.hit,
        8: BaseDecisions.hit,
        9: BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandCode.Split7s]: () => ({
        2: BaseDecisions.split,
        3: BaseDecisions.split,
        4: BaseDecisions.split,
        5: BaseDecisions.split,
        6: BaseDecisions.split,
        7: BaseDecisions.split,
        8: BaseDecisions.hit,
        9: BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandCode.Split8s]: () => alwaysSplit,
    [HandCode.Split9s]: () => ({
        2: BaseDecisions.split,
        3: BaseDecisions.split,
        4: BaseDecisions.split,
        5: BaseDecisions.split,
        6: BaseDecisions.split,
        7: BaseDecisions.stand,
        8: BaseDecisions.split,
        9: BaseDecisions.split,
        10: BaseDecisions.stand,
        11: BaseDecisions.stand
    }),
    [HandCode.Split10s]: () => alwaysStand,
    [HandCode.SplitAs]: () => alwaysSplit
};
