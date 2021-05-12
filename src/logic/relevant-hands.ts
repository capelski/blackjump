import {
    CasinoRules,
    CasinoRulesKeys,
    Doubling,
    HandRepresentation,
    RelevantHands
} from '../types';
import { getDefaultCasinoRules } from './game-config';
import { handDecisionSetGetters } from './hand-decision-set';

export const getDefaultRelevantHands = () => getRelevantHands(getDefaultCasinoRules());

export const getRelevantHands = (casinoRules: CasinoRules): RelevantHands => ({
    /*** Hard hands ***/

    /* Hard 4 => Only possible with 2,2. Covered in Split hands */
    [HandRepresentation.Hard5]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Hard5](casinoRules),
        dependencies: [],
        level: () => 1,
        name: 'Hard 5'
    },
    [HandRepresentation.Hard6]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Hard6](casinoRules),
        dependencies: [],
        level: () => 1,
        name: 'Hard 6'
    },
    [HandRepresentation.Hard7]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Hard7](casinoRules),
        dependencies: [],
        level: () => 1,
        name: 'Hard 7'
    },
    [HandRepresentation.Hard8]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Hard8](casinoRules),
        dependencies: [],
        level: () => 1,
        name: 'Hard 8'
    },
    [HandRepresentation.Hard9]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Hard9](casinoRules),
        dependencies: [CasinoRulesKeys.doubling],
        level: (casinoRules) =>
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.nineToEleven ? 3 : 1,
        name: 'Hard 9'
    },
    [HandRepresentation.Hard10]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Hard10](casinoRules),
        dependencies: [CasinoRulesKeys.doubling],
        level: (casinoRules) =>
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven ? 2 : 1,
        name: 'Hard 10'
    },
    [HandRepresentation.Hard11]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Hard11](casinoRules),
        dependencies: [CasinoRulesKeys.doubling],
        level: (casinoRules) =>
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven ? 2 : 1,
        name: 'Hard 11'
    },
    [HandRepresentation.Hard12]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Hard12](casinoRules),
        dependencies: [],
        level: () => 3,
        name: 'Hard 12'
    },
    [HandRepresentation.Hard13]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Hard13](casinoRules),
        dependencies: [],
        level: () => 2,
        name: 'Hard 13'
    },
    [HandRepresentation.Hard14]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Hard14](casinoRules),
        dependencies: [],
        level: () => 2,
        name: 'Hard 14'
    },
    [HandRepresentation.Hard15]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Hard15](casinoRules),
        dependencies: [CasinoRulesKeys.surrender],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.surrender] ? 4 : 2),
        name: 'Hard 15'
    },
    [HandRepresentation.Hard16]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Hard16](casinoRules),
        dependencies: [CasinoRulesKeys.surrender],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.surrender] ? 3 : 2),
        name: 'Hard 16'
    },
    [HandRepresentation.Hard17]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Hard17](casinoRules),
        dependencies: [],
        level: () => 1,
        name: 'Hard 17'
    },
    [HandRepresentation.Hard18]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Hard18](casinoRules),
        dependencies: [],
        level: () => 1,
        name: 'Hard 18'
    },
    [HandRepresentation.Hard19]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Hard19](casinoRules),
        dependencies: [],
        level: () => 1,
        name: 'Hard 19'
    },
    [HandRepresentation.Hard20]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Hard20](casinoRules),
        dependencies: [],
        level: () => 1,
        name: 'Hard 20'
    },
    /* Hard 21 => Maximum score! This hand doesn't need training */

    /*** Soft hands ***/

    [HandRepresentation.Soft13]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Soft13](casinoRules),
        dependencies: [CasinoRulesKeys.doubling],
        level: (casinoRules) =>
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair ? 3 : 1,
        name: 'Soft 13'
    },
    [HandRepresentation.Soft14]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Soft14](casinoRules),
        dependencies: [CasinoRulesKeys.doubling],
        level: (casinoRules) =>
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair ? 3 : 1,
        name: 'Soft 14'
    },
    [HandRepresentation.Soft15]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Soft15](casinoRules),
        dependencies: [CasinoRulesKeys.doubling],
        level: (casinoRules) =>
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair ? 3 : 1,
        name: 'Soft 15'
    },
    [HandRepresentation.Soft16]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Soft16](casinoRules),
        dependencies: [CasinoRulesKeys.doubling],
        level: (casinoRules) =>
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair ? 3 : 1,
        name: 'Soft 16'
    },
    [HandRepresentation.Soft17]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Soft17](casinoRules),
        dependencies: [CasinoRulesKeys.doubling],
        level: (casinoRules) =>
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair ? 3 : 1,
        name: 'Soft 17'
    },
    [HandRepresentation.Soft18]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Soft18](casinoRules),
        dependencies: [CasinoRulesKeys.doubling],
        level: (casinoRules) =>
            casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair ? 4 : 2,
        name: 'Soft 18'
    },
    [HandRepresentation.Soft19]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Soft19](casinoRules),
        dependencies: [],
        level: () => 1,
        name: 'Soft 19'
    },
    [HandRepresentation.Soft20]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Soft20](casinoRules),
        dependencies: [],
        level: () => 1,
        name: 'Soft 20'
    },
    /* Soft 21 => BlackJack! This hand doesn't need training */

    /*** Split hands ***/
    [HandRepresentation.Split2s]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Split2s](casinoRules),
        dependencies: [CasinoRulesKeys.doubleAfterSplit],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.doubleAfterSplit] ? 2 : 3),
        name: '2,2'
    },
    [HandRepresentation.Split3s]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Split3s](casinoRules),
        dependencies: [CasinoRulesKeys.doubleAfterSplit],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.doubleAfterSplit] ? 2 : 3),
        name: '3,3'
    },
    [HandRepresentation.Split4s]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Split4s](casinoRules),
        dependencies: [CasinoRulesKeys.doubleAfterSplit],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.doubleAfterSplit] ? 3 : 1),
        name: '4,4'
    },
    [HandRepresentation.Split5s]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Split5s](casinoRules),
        dependencies: [CasinoRulesKeys.doubling],
        level: () => 2,
        name: '5,5'
    },
    [HandRepresentation.Split6s]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Split6s](casinoRules),
        dependencies: [CasinoRulesKeys.doubleAfterSplit],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.doubleAfterSplit] ? 2 : 3),
        name: '6,6'
    },
    [HandRepresentation.Split7s]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Split7s](casinoRules),
        dependencies: [],
        level: () => 2,
        name: '7,7'
    },
    [HandRepresentation.Split8s]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Split8s](casinoRules),
        dependencies: [],
        level: () => 1,
        name: '8,8'
    },
    [HandRepresentation.Split9s]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Split9s](casinoRules),
        dependencies: [],
        level: () => 4,
        name: '9,9'
    },
    [HandRepresentation.Split10s]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.Split10s](casinoRules),
        dependencies: [],
        level: () => 1,
        name: '10,10'
    },
    [HandRepresentation.SplitAs]: {
        decisionSet: handDecisionSetGetters[HandRepresentation.SplitAs](casinoRules),
        dependencies: [],
        level: () => 1,
        name: 'A,A'
    }
});
