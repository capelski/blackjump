import {
    HandDecisionSet,
    BaseDecisions,
    HandRepresentation,
    CasinoRulesKeys,
    CasinoRules,
    Dictionary,
    Doubling,
    DynamicDecisions
} from '../types';

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

export const handDecisionSetGetters: Dictionary<
    (casinoRules: CasinoRules) => HandDecisionSet,
    HandRepresentation
> = {
    [HandRepresentation.Hard5]: () => alwaysHit,
    [HandRepresentation.Hard6]: () => alwaysHit,
    [HandRepresentation.Hard7]: () => alwaysHit,
    [HandRepresentation.Hard8]: () => alwaysHit,
    [HandRepresentation.Hard9]: (casinoRules) => ({
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
    [HandRepresentation.Hard10]: (casinoRules) => ({
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
    [HandRepresentation.Hard11]: (casinoRules) => ({
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
    [HandRepresentation.Hard12]: () => ({
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
    [HandRepresentation.Hard13]: () => ({
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
    [HandRepresentation.Hard14]: () => ({
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
    [HandRepresentation.Hard15]: (casinoRules) => ({
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
    [HandRepresentation.Hard16]: (casinoRules) => ({
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
    [HandRepresentation.Hard17]: () => alwaysStand,
    [HandRepresentation.Hard18]: () => alwaysStand,
    [HandRepresentation.Hard19]: () => alwaysStand,
    [HandRepresentation.Hard20]: () => alwaysStand,
    [HandRepresentation.Soft13]: (casinoRules) => ({
        2: BaseDecisions.hit,
        3: BaseDecisions.hit,
        4: BaseDecisions.hit,
        5:
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        6:
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        7: BaseDecisions.hit,
        8: BaseDecisions.hit,
        9: BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandRepresentation.Soft14]: (casinoRules) => ({
        2: BaseDecisions.hit,
        3: BaseDecisions.hit,
        4: BaseDecisions.hit,
        5:
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        6:
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        7: BaseDecisions.hit,
        8: BaseDecisions.hit,
        9: BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandRepresentation.Soft15]: (casinoRules) => ({
        2: BaseDecisions.hit,
        3: BaseDecisions.hit,
        4:
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        5:
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        6:
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        7: BaseDecisions.hit,
        8: BaseDecisions.hit,
        9: BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandRepresentation.Soft16]: (casinoRules) => ({
        2: BaseDecisions.hit,
        3: BaseDecisions.hit,
        4:
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        5:
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        6:
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        7: BaseDecisions.hit,
        8: BaseDecisions.hit,
        9: BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandRepresentation.Soft17]: (casinoRules) => ({
        2: BaseDecisions.hit,
        3:
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        4:
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        5:
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        6:
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        7: BaseDecisions.hit,
        8: BaseDecisions.hit,
        9: BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandRepresentation.Soft18]: (casinoRules) => ({
        2: BaseDecisions.stand,
        3:
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair
                ? DynamicDecisions.double_stand
                : BaseDecisions.stand,
        4:
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair
                ? DynamicDecisions.double_stand
                : BaseDecisions.stand,
        5:
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair
                ? DynamicDecisions.double_stand
                : BaseDecisions.stand,
        6:
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair
                ? DynamicDecisions.double_stand
                : BaseDecisions.stand,
        7: BaseDecisions.stand,
        8: BaseDecisions.stand,
        9: BaseDecisions.hit,
        10: BaseDecisions.hit,
        11: BaseDecisions.hit
    }),
    [HandRepresentation.Soft19]: () => alwaysStand,
    [HandRepresentation.Soft20]: () => alwaysStand,
    [HandRepresentation.Split2s]: (casinoRules) => ({
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
    [HandRepresentation.Split3s]: (casinoRules) => ({
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
    [HandRepresentation.Split4s]: (casinoRules) => ({
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
    [HandRepresentation.Split5s]: (casinoRules) => ({
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
    [HandRepresentation.Split6s]: (casinoRules) => ({
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
    [HandRepresentation.Split7s]: () => ({
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
    [HandRepresentation.Split8s]: () => alwaysSplit,
    [HandRepresentation.Split9s]: () => ({
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
    [HandRepresentation.Split10s]: () => alwaysStand,
    [HandRepresentation.SplitAs]: () => alwaysSplit
};
