import {
    BaseDecisions,
    CasinoRulesDecisions,
    CasinoRulesKeys,
    Dictionary,
    DynamicDecisions,
    HandRepresentation,
    RelevantHand
} from '../types';
import { createDecisionsSet } from './decisions-set';

const double_hit = createDecisionsSet(DynamicDecisions.double_hit);
const hit = createDecisionsSet(BaseDecisions.hit);
const split = createDecisionsSet(BaseDecisions.split);
const splitIfDas_hit = createDecisionsSet(CasinoRulesDecisions.splitIfDasAllowed_hit);
const stand = createDecisionsSet(BaseDecisions.stand);

export const decisionsDictionary: Dictionary<RelevantHand, HandRepresentation> = {
    // Hard hands
    // '4' -> Only possible with 2,2. Covered in Split hands
    [HandRepresentation.Hard5]: {
        decisions: hit,
        dependencies: [],
        level: () => 1,
        name: 'Hard 5'
    },
    [HandRepresentation.Hard6]: {
        decisions: hit,
        dependencies: [],
        level: () => 1,
        name: 'Hard 6'
    },
    [HandRepresentation.Hard7]: {
        decisions: hit,
        dependencies: [],
        level: () => 1,
        name: 'Hard 7'
    },
    [HandRepresentation.Hard8]: {
        decisions: hit,
        dependencies: [],
        level: () => 1,
        name: 'Hard 8'
    },
    [HandRepresentation.Hard9]: {
        decisions: hit.until.dealer(2).then.double_hit.until.dealer(6).then.hit,
        dependencies: [],
        level: () => 3,
        name: 'Hard 9'
    },
    [HandRepresentation.Hard10]: {
        decisions: double_hit.until.dealer(9).then.hit,
        dependencies: [],
        level: () => 2,
        name: 'Hard 10'
    },
    [HandRepresentation.Hard11]: {
        decisions: double_hit.until.dealer(10).then.hit,
        dependencies: [],
        level: () => 2,
        name: 'Hard 11'
    },
    [HandRepresentation.Hard12]: {
        decisions: hit.until.dealer(3).then.stand.until.dealer(6).then.hit,
        dependencies: [],
        level: () => 3,
        name: 'Hard 12'
    },
    [HandRepresentation.Hard13]: {
        decisions: stand.until.dealer(6).then.hit,
        dependencies: [],
        level: () => 2,
        name: 'Hard 13'
    },
    [HandRepresentation.Hard14]: {
        decisions: stand.until.dealer(6).then.hit,
        dependencies: [],
        level: () => 2,
        name: 'Hard 14'
    },
    [HandRepresentation.Hard15]: {
        decisions: stand.until
            .dealer(6)
            .then.hit.until.dealer(9)
            .then.surrenderIfAllowed_hit.until.dealer(10).then.hit,
        dependencies: [CasinoRulesKeys.surrender],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.surrender] ? 4 : 2),
        name: 'Hard 15'
    },
    [HandRepresentation.Hard16]: {
        decisions: stand.until.dealer(6).then.hit.until.dealer(8).then.surrenderIfAllowed_hit,
        dependencies: [CasinoRulesKeys.surrender],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.surrender] ? 3 : 2),
        name: 'Hard 16'
    },
    [HandRepresentation.Hard17]: {
        decisions: stand,
        dependencies: [],
        level: () => 1,
        name: 'Hard 17'
    },
    [HandRepresentation.Hard18]: {
        decisions: stand,
        dependencies: [],
        level: () => 1,
        name: 'Hard 18'
    },
    [HandRepresentation.Hard19]: {
        decisions: stand,
        dependencies: [],
        level: () => 1,
        name: 'Hard 19'
    },
    [HandRepresentation.Hard20]: {
        decisions: stand,
        dependencies: [],
        level: () => 1,
        name: 'Hard 20'
    },
    // '21' -> Maximum score! This hand doesn't need training

    // Soft hands
    [HandRepresentation.Soft13]: {
        decisions: hit.until.dealer(4).then.doubleIfAllowed_hit.until.dealer(6).then.hit,
        dependencies: [CasinoRulesKeys.doubleOnlyOn_9_10_11],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.doubleOnlyOn_9_10_11] ? 1 : 3),
        name: 'Soft 13'
    },
    [HandRepresentation.Soft14]: {
        decisions: hit.until.dealer(4).then.doubleIfAllowed_hit.until.dealer(6).then.hit,
        dependencies: [CasinoRulesKeys.doubleOnlyOn_9_10_11],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.doubleOnlyOn_9_10_11] ? 1 : 3),
        name: 'Soft 14'
    },
    [HandRepresentation.Soft15]: {
        decisions: hit.until.dealer(3).then.doubleIfAllowed_hit.until.dealer(6).then.hit,
        dependencies: [CasinoRulesKeys.doubleOnlyOn_9_10_11],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.doubleOnlyOn_9_10_11] ? 1 : 3),
        name: 'Soft 15'
    },
    [HandRepresentation.Soft16]: {
        decisions: hit.until.dealer(3).then.doubleIfAllowed_hit.until.dealer(6).then.hit,
        dependencies: [CasinoRulesKeys.doubleOnlyOn_9_10_11],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.doubleOnlyOn_9_10_11] ? 1 : 3),
        name: 'Soft 16'
    },
    [HandRepresentation.Soft17]: {
        decisions: hit.until.dealer(2).then.doubleIfAllowed_hit.until.dealer(6).then.hit,
        dependencies: [CasinoRulesKeys.doubleOnlyOn_9_10_11],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.doubleOnlyOn_9_10_11] ? 1 : 3),
        name: 'Soft 17'
    },
    [HandRepresentation.Soft18]: {
        decisions: stand.until
            .dealer(2)
            .then.doubleIfAllowed_stand.until.dealer(6)
            .then.stand.until.dealer(8).then.hit,
        dependencies: [CasinoRulesKeys.doubleOnlyOn_9_10_11],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.doubleOnlyOn_9_10_11] ? 2 : 4),
        name: 'Soft 18'
    },
    [HandRepresentation.Soft19]: {
        decisions: stand,
        dependencies: [],
        level: () => 1,
        name: 'Soft 19'
    },
    [HandRepresentation.Soft20]: {
        decisions: stand,
        dependencies: [],
        level: () => 1,
        name: 'Soft 20'
    },
    // 'A,10' -> BlackJack! This hand doesn't need training

    // Split hands
    [HandRepresentation.Split2s]: {
        decisions: splitIfDas_hit.until.dealer(3).then.split.until.dealer(7).then.hit,
        dependencies: [CasinoRulesKeys.doubleAfterSplit],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.doubleAfterSplit] ? 2 : 3),
        name: '2,2'
    },
    [HandRepresentation.Split3s]: {
        decisions: splitIfDas_hit.until.dealer(3).then.split.until.dealer(7).then.hit,
        dependencies: [CasinoRulesKeys.doubleAfterSplit],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.doubleAfterSplit] ? 2 : 3),
        name: '3,3'
    },
    [HandRepresentation.Split4s]: {
        decisions: hit.until.dealer(4).then.splitIfDasAllowed_hit.until.dealer(6).then.hit,
        dependencies: [CasinoRulesKeys.doubleAfterSplit],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.doubleAfterSplit] ? 3 : 1),
        name: '4,4'
    },
    [HandRepresentation.Split5s]: {
        decisions: double_hit.until.dealer(9).then.hit,
        dependencies: [],
        level: () => 2,
        name: '5,5'
    },
    [HandRepresentation.Split6s]: {
        decisions: splitIfDas_hit.until.dealer(2).then.split.until.dealer(6).then.hit,
        dependencies: [CasinoRulesKeys.doubleAfterSplit],
        level: (casinoRules) => (casinoRules[CasinoRulesKeys.doubleAfterSplit] ? 2 : 3),
        name: '6,6'
    },
    [HandRepresentation.Split7s]: {
        decisions: split.until.dealer(7).then.hit,
        dependencies: [],
        level: () => 2,
        name: '7,7'
    },
    [HandRepresentation.Split8s]: {
        decisions: split,
        dependencies: [],
        level: () => 1,
        name: '8,8'
    },
    [HandRepresentation.Split9s]: {
        decisions: split.until.dealer(6).then.stand.until.dealer(7).then.split.until.dealer(9).then
            .stand,
        dependencies: [],
        level: () => 4,
        name: '9,9'
    },
    [HandRepresentation.Split10s]: {
        decisions: stand,
        dependencies: [],
        level: () => 1,
        name: '10,10'
    },
    [HandRepresentation.SplitAs]: {
        decisions: split,
        dependencies: [],
        level: () => 1,
        name: 'A,A'
    }
};
