import { CasinoRules, CasinoRulesKeys, HandRepresentation, TrainingHands } from '../types';
import { getDefaultCasinoRules } from './game-config';
import { getHandDecisionSetLevel, handDecisionSetGetters } from './hand-decision-set';

export const getDefaultTrainingHands = () => getTrainingHands(getDefaultCasinoRules());

export const getTrainingHands = (casinoRules: CasinoRules) => {
    const trainingHands: TrainingHands = {
        /*** Hard hands ***/

        /* Hard 4 => Only possible with 2,2. Covered in Split hands */
        [HandRepresentation.Hard5]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Hard5](casinoRules),
            dependencies: [],
            level: -1,
            name: 'Hard 5',
            representation: HandRepresentation.Hard5
        },
        [HandRepresentation.Hard6]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Hard6](casinoRules),
            dependencies: [],
            level: -1,
            name: 'Hard 6',
            representation: HandRepresentation.Hard6
        },
        [HandRepresentation.Hard7]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Hard7](casinoRules),
            dependencies: [],
            level: -1,
            name: 'Hard 7',
            representation: HandRepresentation.Hard7
        },
        [HandRepresentation.Hard8]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Hard8](casinoRules),
            dependencies: [],
            level: -1,
            name: 'Hard 8',
            representation: HandRepresentation.Hard8
        },
        [HandRepresentation.Hard9]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Hard9](casinoRules),
            dependencies: [CasinoRulesKeys.doubling],
            level: -1,
            name: 'Hard 9',
            representation: HandRepresentation.Hard9
        },
        [HandRepresentation.Hard10]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Hard10](casinoRules),
            dependencies: [CasinoRulesKeys.doubling],
            level: -1,
            name: 'Hard 10',
            representation: HandRepresentation.Hard10
        },
        [HandRepresentation.Hard11]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Hard11](casinoRules),
            dependencies: [CasinoRulesKeys.doubling],
            level: -1,
            name: 'Hard 11',
            representation: HandRepresentation.Hard11
        },
        [HandRepresentation.Hard12]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Hard12](casinoRules),
            dependencies: [],
            level: -1,
            name: 'Hard 12',
            representation: HandRepresentation.Hard12
        },
        [HandRepresentation.Hard13]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Hard13](casinoRules),
            dependencies: [],
            level: -1,
            name: 'Hard 13',
            representation: HandRepresentation.Hard13
        },
        [HandRepresentation.Hard14]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Hard14](casinoRules),
            dependencies: [],
            level: -1,
            name: 'Hard 14',
            representation: HandRepresentation.Hard14
        },
        [HandRepresentation.Hard15]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Hard15](casinoRules),
            dependencies: [CasinoRulesKeys.surrender],
            level: -1,
            name: 'Hard 15',
            representation: HandRepresentation.Hard15
        },
        [HandRepresentation.Hard16]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Hard16](casinoRules),
            dependencies: [CasinoRulesKeys.surrender],
            level: -1,
            name: 'Hard 16',
            representation: HandRepresentation.Hard16
        },
        [HandRepresentation.Hard17]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Hard17](casinoRules),
            dependencies: [],
            level: -1,
            name: 'Hard 17',
            representation: HandRepresentation.Hard17
        },
        [HandRepresentation.Hard18]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Hard18](casinoRules),
            dependencies: [],
            level: -1,
            name: 'Hard 18',
            representation: HandRepresentation.Hard18
        },
        [HandRepresentation.Hard19]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Hard19](casinoRules),
            dependencies: [],
            level: -1,
            name: 'Hard 19',
            representation: HandRepresentation.Hard19
        },
        [HandRepresentation.Hard20]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Hard20](casinoRules),
            dependencies: [],
            level: -1,
            name: 'Hard 20',
            representation: HandRepresentation.Hard20
        },
        /* Hard 21 => Maximum score! This hand doesn't need training */

        /*** Soft hands ***/

        [HandRepresentation.Soft13]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Soft13](casinoRules),
            dependencies: [CasinoRulesKeys.doubling],
            level: -1,
            name: 'Soft 13',
            representation: HandRepresentation.Soft13
        },
        [HandRepresentation.Soft14]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Soft14](casinoRules),
            dependencies: [CasinoRulesKeys.doubling],
            level: -1,
            name: 'Soft 14',
            representation: HandRepresentation.Soft14
        },
        [HandRepresentation.Soft15]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Soft15](casinoRules),
            dependencies: [CasinoRulesKeys.doubling],
            level: -1,
            name: 'Soft 15',
            representation: HandRepresentation.Soft15
        },
        [HandRepresentation.Soft16]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Soft16](casinoRules),
            dependencies: [CasinoRulesKeys.doubling],
            level: -1,
            name: 'Soft 16',
            representation: HandRepresentation.Soft16
        },
        [HandRepresentation.Soft17]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Soft17](casinoRules),
            dependencies: [CasinoRulesKeys.doubling],
            level: -1,
            name: 'Soft 17',
            representation: HandRepresentation.Soft17
        },
        [HandRepresentation.Soft18]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Soft18](casinoRules),
            dependencies: [CasinoRulesKeys.doubling],
            level: -1,
            name: 'Soft 18',
            representation: HandRepresentation.Soft18
        },
        [HandRepresentation.Soft19]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Soft19](casinoRules),
            dependencies: [],
            level: -1,
            name: 'Soft 19',
            representation: HandRepresentation.Soft19
        },
        [HandRepresentation.Soft20]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Soft20](casinoRules),
            dependencies: [],
            level: -1,
            name: 'Soft 20',
            representation: HandRepresentation.Soft20
        },
        /* Soft 21 => BlackJack! This hand doesn't need training */

        /*** Split hands ***/
        [HandRepresentation.Split2s]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Split2s](casinoRules),
            dependencies: [CasinoRulesKeys.doubleAfterSplit],
            level: -1,
            name: '2,2',
            representation: HandRepresentation.Split2s
        },
        [HandRepresentation.Split3s]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Split3s](casinoRules),
            dependencies: [CasinoRulesKeys.doubleAfterSplit],
            level: -1,
            name: '3,3',
            representation: HandRepresentation.Split3s
        },
        [HandRepresentation.Split4s]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Split4s](casinoRules),
            dependencies: [CasinoRulesKeys.doubleAfterSplit],
            level: -1,
            name: '4,4',
            representation: HandRepresentation.Split4s
        },
        [HandRepresentation.Split5s]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Split5s](casinoRules),
            dependencies: [CasinoRulesKeys.doubling],
            level: -1,
            name: '5,5',
            representation: HandRepresentation.Split5s
        },
        [HandRepresentation.Split6s]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Split6s](casinoRules),
            dependencies: [CasinoRulesKeys.doubleAfterSplit],
            level: -1,
            name: '6,6',
            representation: HandRepresentation.Split6s
        },
        [HandRepresentation.Split7s]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Split7s](casinoRules),
            dependencies: [],
            level: -1,
            name: '7,7',
            representation: HandRepresentation.Split7s
        },
        [HandRepresentation.Split8s]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Split8s](casinoRules),
            dependencies: [],
            level: -1,
            name: '8,8',
            representation: HandRepresentation.Split8s
        },
        [HandRepresentation.Split9s]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Split9s](casinoRules),
            dependencies: [],
            level: -1,
            name: '9,9',
            representation: HandRepresentation.Split9s
        },
        [HandRepresentation.Split10s]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.Split10s](casinoRules),
            dependencies: [],
            level: -1,
            name: '10,10',
            representation: HandRepresentation.Split10s
        },
        [HandRepresentation.SplitAs]: {
            decisionSet: handDecisionSetGetters[HandRepresentation.SplitAs](casinoRules),
            dependencies: [],
            level: -1,
            name: 'A,A',
            representation: HandRepresentation.SplitAs
        }
    };

    Object.values(trainingHands).forEach((trainingHand) => {
        trainingHand.level = getHandDecisionSetLevel(trainingHand.decisionSet);
    });

    return trainingHands;
};
