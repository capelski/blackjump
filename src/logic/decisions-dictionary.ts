import {
    BaseDecisions,
    CasinoRules,
    CasinoRulesKeys,
    Dictionary,
    Doubling,
    DynamicDecisions,
    HandRepresentation,
    RelevantHand
} from '../types';
import { alwaysHit, alwaysSplit, alwaysStand } from './hand-decision-set';

export const decisionsDictionary: Dictionary<RelevantHand, HandRepresentation> = {
    /*** Hard hands ***/

    /* Hard 4 => Only possible with 2,2. Covered in Split hands */
    [HandRepresentation.Hard5]: {
        decisionSet: () => alwaysHit,
        dependencies: [],
        level: () => 1,
        name: 'Hard 5'
    },
    [HandRepresentation.Hard6]: {
        decisionSet: () => alwaysHit,
        dependencies: [],
        level: () => 1,
        name: 'Hard 6'
    },
    [HandRepresentation.Hard7]: {
        decisionSet: () => alwaysHit,
        dependencies: [],
        level: () => 1,
        name: 'Hard 7'
    },
    [HandRepresentation.Hard8]: {
        decisionSet: () => alwaysHit,
        dependencies: [],
        level: () => 1,
        name: 'Hard 8'
    },
    [HandRepresentation.Hard9]: {
        decisionSet: (casinoRules: CasinoRules) => ({
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
        dependencies: [CasinoRulesKeys.doubling],
        level: (casinoRules) =>
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.nineToEleven ? 3 : 1,
        name: 'Hard 9'
    },
    [HandRepresentation.Hard10]: {
        decisionSet: (casinoRules: CasinoRules) => ({
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
        dependencies: [CasinoRulesKeys.doubling],
        level: (casinoRules) =>
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven ? 2 : 1,
        name: 'Hard 10'
    },
    [HandRepresentation.Hard11]: {
        decisionSet: (casinoRules: CasinoRules) => ({
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
        dependencies: [CasinoRulesKeys.doubling],
        level: (casinoRules) =>
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven ? 2 : 1,
        name: 'Hard 11'
    },
    [HandRepresentation.Hard12]: {
        decisionSet: () => ({
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
        dependencies: [],
        level: () => 3,
        name: 'Hard 12'
    },
    [HandRepresentation.Hard13]: {
        decisionSet: () => ({
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
        dependencies: [],
        level: () => 2,
        name: 'Hard 13'
    },
    [HandRepresentation.Hard14]: {
        decisionSet: () => ({
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
        dependencies: [],
        level: () => 2,
        name: 'Hard 14'
    },
    [HandRepresentation.Hard15]: {
        decisionSet: (casinoRules: CasinoRules) => ({
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
        dependencies: [CasinoRulesKeys.surrender],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.surrender] ? 4 : 2),
        name: 'Hard 15'
    },
    [HandRepresentation.Hard16]: {
        decisionSet: (casinoRules: CasinoRules) => ({
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
        dependencies: [CasinoRulesKeys.surrender],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.surrender] ? 3 : 2),
        name: 'Hard 16'
    },
    [HandRepresentation.Hard17]: {
        decisionSet: () => alwaysStand,
        dependencies: [],
        level: () => 1,
        name: 'Hard 17'
    },
    [HandRepresentation.Hard18]: {
        decisionSet: () => alwaysStand,
        dependencies: [],
        level: () => 1,
        name: 'Hard 18'
    },
    [HandRepresentation.Hard19]: {
        decisionSet: () => alwaysStand,
        dependencies: [],
        level: () => 1,
        name: 'Hard 19'
    },
    [HandRepresentation.Hard20]: {
        decisionSet: () => alwaysStand,
        dependencies: [],
        level: () => 1,
        name: 'Hard 20'
    },
    /* Hard 21 => Maximum score! This hand doesn't need training */

    /*** Soft hands ***/

    [HandRepresentation.Soft13]: {
        decisionSet: (casinoRules: CasinoRules) => ({
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
        dependencies: [CasinoRulesKeys.doubling],
        level: (casinoRules) =>
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair ? 3 : 1,
        name: 'Soft 13'
    },
    [HandRepresentation.Soft14]: {
        decisionSet: (casinoRules: CasinoRules) => ({
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
        dependencies: [CasinoRulesKeys.doubling],
        level: (casinoRules) =>
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair ? 3 : 1,
        name: 'Soft 14'
    },
    [HandRepresentation.Soft15]: {
        decisionSet: (casinoRules: CasinoRules) => ({
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
        dependencies: [CasinoRulesKeys.doubling],
        level: (casinoRules) =>
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair ? 3 : 1,
        name: 'Soft 15'
    },
    [HandRepresentation.Soft16]: {
        decisionSet: (casinoRules: CasinoRules) => ({
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
        dependencies: [CasinoRulesKeys.doubling],
        level: (casinoRules) =>
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair ? 3 : 1,
        name: 'Soft 16'
    },
    [HandRepresentation.Soft17]: {
        decisionSet: (casinoRules: CasinoRules) => ({
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
        dependencies: [CasinoRulesKeys.doubling],
        level: (casinoRules) =>
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair ? 3 : 1,
        name: 'Soft 17'
    },
    [HandRepresentation.Soft18]: {
        decisionSet: (casinoRules: CasinoRules) => ({
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
        dependencies: [CasinoRulesKeys.doubling],
        level: (casinoRules) =>
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair ? 4 : 2,
        name: 'Soft 18'
    },
    [HandRepresentation.Soft19]: {
        decisionSet: () => alwaysStand,
        dependencies: [],
        level: () => 1,
        name: 'Soft 19'
    },
    [HandRepresentation.Soft20]: {
        decisionSet: () => alwaysStand,
        dependencies: [],
        level: () => 1,
        name: 'Soft 20'
    },
    /* Soft 21 => BlackJack! This hand doesn't need training */

    /*** Split hands ***/
    [HandRepresentation.Split2s]: {
        decisionSet: (casinoRules: CasinoRules) => ({
            2: casinoRules[CasinoRulesKeys.doubleAfterSplit]
                ? BaseDecisions.split
                : BaseDecisions.hit,
            3: casinoRules[CasinoRulesKeys.doubleAfterSplit]
                ? BaseDecisions.split
                : BaseDecisions.hit,
            4: BaseDecisions.split,
            5: BaseDecisions.split,
            6: BaseDecisions.split,
            7: BaseDecisions.split,
            8: BaseDecisions.hit,
            9: BaseDecisions.hit,
            10: BaseDecisions.hit,
            11: BaseDecisions.hit
        }),
        dependencies: [CasinoRulesKeys.doubleAfterSplit],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.doubleAfterSplit] ? 2 : 3),
        name: '2,2'
    },
    [HandRepresentation.Split3s]: {
        decisionSet: (casinoRules: CasinoRules) => ({
            2: casinoRules[CasinoRulesKeys.doubleAfterSplit]
                ? BaseDecisions.split
                : BaseDecisions.hit,
            3: casinoRules[CasinoRulesKeys.doubleAfterSplit]
                ? BaseDecisions.split
                : BaseDecisions.hit,
            4: BaseDecisions.split,
            5: BaseDecisions.split,
            6: BaseDecisions.split,
            7: BaseDecisions.split,
            8: BaseDecisions.hit,
            9: BaseDecisions.hit,
            10: BaseDecisions.hit,
            11: BaseDecisions.hit
        }),
        dependencies: [CasinoRulesKeys.doubleAfterSplit],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.doubleAfterSplit] ? 2 : 3),
        name: '3,3'
    },
    [HandRepresentation.Split4s]: {
        decisionSet: (casinoRules: CasinoRules) => ({
            2: BaseDecisions.hit,
            3: BaseDecisions.hit,
            4: BaseDecisions.hit,
            5: casinoRules[CasinoRulesKeys.doubleAfterSplit]
                ? BaseDecisions.split
                : BaseDecisions.hit,
            6: casinoRules[CasinoRulesKeys.doubleAfterSplit]
                ? BaseDecisions.split
                : BaseDecisions.hit,
            7: BaseDecisions.hit,
            8: BaseDecisions.hit,
            9: BaseDecisions.hit,
            10: BaseDecisions.hit,
            11: BaseDecisions.hit
        }),
        dependencies: [CasinoRulesKeys.doubleAfterSplit],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.doubleAfterSplit] ? 3 : 1),
        name: '4,4'
    },
    [HandRepresentation.Split5s]: {
        decisionSet: (casinoRules: CasinoRules) => ({
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
        dependencies: [CasinoRulesKeys.doubling],
        level: () => 2,
        name: '5,5'
    },
    [HandRepresentation.Split6s]: {
        decisionSet: (casinoRules: CasinoRules) => ({
            2: casinoRules[CasinoRulesKeys.doubleAfterSplit]
                ? BaseDecisions.split
                : BaseDecisions.hit,
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
        dependencies: [CasinoRulesKeys.doubleAfterSplit],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.doubleAfterSplit] ? 2 : 3),
        name: '6,6'
    },
    [HandRepresentation.Split7s]: {
        decisionSet: () => ({
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
        dependencies: [],
        level: () => 2,
        name: '7,7'
    },
    [HandRepresentation.Split8s]: {
        decisionSet: () => alwaysSplit,
        dependencies: [],
        level: () => 1,
        name: '8,8'
    },
    [HandRepresentation.Split9s]: {
        decisionSet: () => ({
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
        dependencies: [],
        level: () => 4,
        name: '9,9'
    },
    [HandRepresentation.Split10s]: {
        decisionSet: () => alwaysStand,
        dependencies: [],
        level: () => 1,
        name: '10,10'
    },
    [HandRepresentation.SplitAs]: {
        decisionSet: () => alwaysSplit,
        dependencies: [],
        level: () => 1,
        name: 'A,A'
    }
};
