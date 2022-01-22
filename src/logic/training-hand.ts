import {
    CasinoRules,
    CasinoRulesKeys,
    HandCode,
    SelectedHands,
    TrainingHands,
    TrainingProgress
} from '../types';
import { getDefaultCasinoRules } from './casino-rules';
import { getUntrainedDealerSymbols } from './dealer-symbols';
import { handDecisionSetGetters } from './hand-decision-set';

export const getDefaultTrainingHands = () => getTrainingHands(getDefaultCasinoRules());

export const getSelectedTrainingHands = (
    trainingHands: TrainingHands,
    selectedHands?: SelectedHands
) =>
    selectedHands
        ? Object.values(trainingHands).filter((hand) => selectedHands[hand.code])
        : Object.values(trainingHands);

export const getTrainingHands = (casinoRules: CasinoRules): TrainingHands => ({
    [HandCode.Split2s]: {
        code: HandCode.Split2s,
        decisionSet: handDecisionSetGetters[HandCode.Split2s](casinoRules),
        dependencies: [
            CasinoRulesKeys.splitsNumber,
            CasinoRulesKeys.doublingAfterSplit,
            CasinoRulesKeys.surrender,
            CasinoRulesKeys.holeCard,
            CasinoRulesKeys.blackjackPeek,
            CasinoRulesKeys.dealerHitsSoft17
        ],
        name: '2,2'
    },
    [HandCode.Split3s]: {
        code: HandCode.Split3s,
        decisionSet: handDecisionSetGetters[HandCode.Split3s](casinoRules),
        dependencies: [
            CasinoRulesKeys.splitsNumber,
            CasinoRulesKeys.doublingAfterSplit,
            CasinoRulesKeys.surrender,
            CasinoRulesKeys.holeCard,
            CasinoRulesKeys.blackjackPeek
        ],
        name: '3,3'
    },
    [HandCode.Split4s]: {
        code: HandCode.Split4s,
        decisionSet: handDecisionSetGetters[HandCode.Split4s](casinoRules),
        dependencies: [CasinoRulesKeys.splitsNumber, CasinoRulesKeys.doublingAfterSplit],
        name: '4,4'
    },
    [HandCode.Split5s]: {
        code: HandCode.Split5s,
        decisionSet: handDecisionSetGetters[HandCode.Split5s](casinoRules),
        dependencies: [CasinoRulesKeys.doubling],
        name: '5,5'
    },
    [HandCode.Split6s]: {
        code: HandCode.Split6s,
        decisionSet: handDecisionSetGetters[HandCode.Split6s](casinoRules),
        dependencies: [
            CasinoRulesKeys.splitsNumber,
            CasinoRulesKeys.doublingAfterSplit,
            CasinoRulesKeys.surrender,
            CasinoRulesKeys.holeCard,
            CasinoRulesKeys.blackjackPeek
        ],
        name: '6,6'
    },
    [HandCode.Split7s]: {
        code: HandCode.Split7s,
        decisionSet: handDecisionSetGetters[HandCode.Split7s](casinoRules),
        dependencies: [
            CasinoRulesKeys.splitsNumber,
            CasinoRulesKeys.surrender,
            CasinoRulesKeys.holeCard,
            CasinoRulesKeys.blackjackPeek
        ],
        name: '7,7'
    },
    [HandCode.Split8s]: {
        code: HandCode.Split8s,
        decisionSet: handDecisionSetGetters[HandCode.Split8s](casinoRules),
        dependencies: [
            CasinoRulesKeys.splitsNumber,
            CasinoRulesKeys.holeCard,
            CasinoRulesKeys.blackjackPeek,
            CasinoRulesKeys.surrender,
            CasinoRulesKeys.dealerHitsSoft17
        ],
        name: '8,8'
    },
    [HandCode.Split9s]: {
        code: HandCode.Split9s,
        decisionSet: handDecisionSetGetters[HandCode.Split9s](casinoRules),
        dependencies: [CasinoRulesKeys.splitsNumber],
        name: '9,9'
    },
    [HandCode.Split10s]: {
        code: HandCode.Split10s,
        decisionSet: handDecisionSetGetters[HandCode.Split10s](casinoRules),
        dependencies: [],
        name: '10,10'
    },
    [HandCode.SplitAs]: {
        code: HandCode.SplitAs,
        decisionSet: handDecisionSetGetters[HandCode.SplitAs](casinoRules),
        dependencies: [
            CasinoRulesKeys.splitsNumber,
            CasinoRulesKeys.holeCard,
            CasinoRulesKeys.blackjackPeek
        ],
        name: 'A,A'
    },
    [HandCode.Soft13]: {
        code: HandCode.Soft13,
        decisionSet: handDecisionSetGetters[HandCode.Soft13](casinoRules),
        dependencies: [CasinoRulesKeys.doubling],
        name: 'Soft 13'
    },
    [HandCode.Soft14]: {
        code: HandCode.Soft14,
        decisionSet: handDecisionSetGetters[HandCode.Soft14](casinoRules),
        dependencies: [CasinoRulesKeys.doubling],
        name: 'Soft 14'
    },
    [HandCode.Soft15]: {
        code: HandCode.Soft15,
        decisionSet: handDecisionSetGetters[HandCode.Soft15](casinoRules),
        dependencies: [CasinoRulesKeys.doubling],
        name: 'Soft 15'
    },
    [HandCode.Soft16]: {
        code: HandCode.Soft16,
        decisionSet: handDecisionSetGetters[HandCode.Soft16](casinoRules),
        dependencies: [CasinoRulesKeys.doubling],
        name: 'Soft 16'
    },
    [HandCode.Soft17]: {
        code: HandCode.Soft17,
        decisionSet: handDecisionSetGetters[HandCode.Soft17](casinoRules),
        dependencies: [CasinoRulesKeys.doubling],
        name: 'Soft 17'
    },
    [HandCode.Soft18]: {
        code: HandCode.Soft18,
        decisionSet: handDecisionSetGetters[HandCode.Soft18](casinoRules),
        dependencies: [CasinoRulesKeys.doubling, CasinoRulesKeys.dealerHitsSoft17],
        name: 'Soft 18'
    },
    [HandCode.Soft19]: {
        code: HandCode.Soft19,
        decisionSet: handDecisionSetGetters[HandCode.Soft19](casinoRules),
        dependencies: [CasinoRulesKeys.doubling, CasinoRulesKeys.dealerHitsSoft17],
        name: 'Soft 19'
    },
    [HandCode.Soft20]: {
        code: HandCode.Soft20,
        decisionSet: handDecisionSetGetters[HandCode.Soft20](casinoRules),
        dependencies: [],
        name: 'Soft 20'
    },
    /* Soft 21 => Either Blackjack or maximum score! This hand doesn't need training */
    /* Hard 4 => Only possible with 2,2. Covered in Split hands */
    [HandCode.Hard5]: {
        code: HandCode.Hard5,
        decisionSet: handDecisionSetGetters[HandCode.Hard5](casinoRules),
        dependencies: [
            CasinoRulesKeys.surrender,
            CasinoRulesKeys.holeCard,
            CasinoRulesKeys.blackjackPeek
        ],
        name: 'Hard 5'
    },
    [HandCode.Hard6]: {
        code: HandCode.Hard6,
        decisionSet: handDecisionSetGetters[HandCode.Hard6](casinoRules),
        dependencies: [
            CasinoRulesKeys.surrender,
            CasinoRulesKeys.holeCard,
            CasinoRulesKeys.blackjackPeek
        ],
        name: 'Hard 6'
    },
    [HandCode.Hard7]: {
        code: HandCode.Hard7,
        decisionSet: handDecisionSetGetters[HandCode.Hard7](casinoRules),
        dependencies: [
            CasinoRulesKeys.surrender,
            CasinoRulesKeys.holeCard,
            CasinoRulesKeys.blackjackPeek
        ],
        name: 'Hard 7'
    },
    [HandCode.Hard8]: {
        code: HandCode.Hard8,
        decisionSet: handDecisionSetGetters[HandCode.Hard8](casinoRules),
        dependencies: [],
        name: 'Hard 8'
    },
    [HandCode.Hard9]: {
        code: HandCode.Hard9,
        decisionSet: handDecisionSetGetters[HandCode.Hard9](casinoRules),
        dependencies: [CasinoRulesKeys.doubling],
        name: 'Hard 9'
    },
    [HandCode.Hard10]: {
        code: HandCode.Hard10,
        decisionSet: handDecisionSetGetters[HandCode.Hard10](casinoRules),
        dependencies: [CasinoRulesKeys.doubling],
        name: 'Hard 10'
    },
    [HandCode.Hard11]: {
        code: HandCode.Hard11,
        decisionSet: handDecisionSetGetters[HandCode.Hard11](casinoRules),
        dependencies: [
            CasinoRulesKeys.doubling,
            CasinoRulesKeys.holeCard,
            CasinoRulesKeys.blackjackPeek,
            CasinoRulesKeys.dealerHitsSoft17
        ],
        name: 'Hard 11'
    },
    [HandCode.Hard12]: {
        code: HandCode.Hard12,
        decisionSet: handDecisionSetGetters[HandCode.Hard12](casinoRules),
        dependencies: [
            CasinoRulesKeys.surrender,
            CasinoRulesKeys.holeCard,
            CasinoRulesKeys.blackjackPeek
        ],
        name: 'Hard 12'
    },
    [HandCode.Hard13]: {
        code: HandCode.Hard13,
        decisionSet: handDecisionSetGetters[HandCode.Hard13](casinoRules),
        dependencies: [
            CasinoRulesKeys.surrender,
            CasinoRulesKeys.holeCard,
            CasinoRulesKeys.blackjackPeek
        ],
        name: 'Hard 13'
    },
    [HandCode.Hard14]: {
        code: HandCode.Hard14,
        decisionSet: handDecisionSetGetters[HandCode.Hard14](casinoRules),
        dependencies: [
            CasinoRulesKeys.surrender,
            CasinoRulesKeys.holeCard,
            CasinoRulesKeys.blackjackPeek
        ],
        name: 'Hard 14'
    },
    [HandCode.Hard15]: {
        code: HandCode.Hard15,
        decisionSet: handDecisionSetGetters[HandCode.Hard15](casinoRules),
        dependencies: [
            CasinoRulesKeys.surrender,
            CasinoRulesKeys.holeCard,
            CasinoRulesKeys.blackjackPeek,
            CasinoRulesKeys.dealerHitsSoft17
        ],
        name: 'Hard 15'
    },
    [HandCode.Hard16]: {
        code: HandCode.Hard16,
        decisionSet: handDecisionSetGetters[HandCode.Hard16](casinoRules),
        dependencies: [CasinoRulesKeys.surrender],
        name: 'Hard 16'
    },
    [HandCode.Hard17]: {
        code: HandCode.Hard17,
        decisionSet: handDecisionSetGetters[HandCode.Hard17](casinoRules),
        dependencies: [
            CasinoRulesKeys.surrender,
            CasinoRulesKeys.holeCard,
            CasinoRulesKeys.blackjackPeek,
            CasinoRulesKeys.dealerHitsSoft17
        ],
        name: 'Hard 17'
    },
    [HandCode.Hard18]: {
        code: HandCode.Hard18,
        decisionSet: handDecisionSetGetters[HandCode.Hard18](casinoRules),
        dependencies: [],
        name: 'Hard 18'
    },
    [HandCode.Hard19]: {
        code: HandCode.Hard19,
        decisionSet: handDecisionSetGetters[HandCode.Hard19](casinoRules),
        dependencies: [],
        name: 'Hard 19'
    },
    [HandCode.Hard20]: {
        code: HandCode.Hard20,
        decisionSet: handDecisionSetGetters[HandCode.Hard20](casinoRules),
        dependencies: [],
        name: 'Hard 20'
    }
    /* Hard 21 => Maximum score! This hand doesn't need training */
});

export const getUntrainedTrainingHands = (
    trainingHands: TrainingHands,
    trainingProgress: TrainingProgress,
    selectedHands?: SelectedHands
) =>
    getSelectedTrainingHands(trainingHands, selectedHands).filter(
        (trainingHand) => getUntrainedDealerSymbols(trainingProgress[trainingHand.code]).length > 0
    );
