import {
    CardSet,
    GameSettings,
    HandRepresentation,
    NumericDictionary,
    TrainingHand,
    TrainingPair
} from '../types';
import { cartesianProduct, shuffleArray } from '../utils';
import { extractCardFromCardSet } from './card-set';
import { decisionsDictionary } from './decisions-dictionary';
import { createHand } from './hand';
import { figuresToSymbols, handRepresentationToHand } from './hand-representation';

export const allPossibleDealerHands: HandRepresentation[] = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'Figure'
];

// const devHands: TrainingPair[] = [{ dealerHand: '6', playerHand: '3/13' }];

export const getTrainingPairs = (
    gameSettings: GameSettings,
    selectedLevels: NumericDictionary<boolean>
) => {
    const selectedTrainingHands: HandRepresentation[] = Object.keys(decisionsDictionary).filter(
        (key) => {
            const handLevel = decisionsDictionary[key].level(gameSettings);
            return selectedLevels[handLevel];
        }
    );

    const trainingPairs = cartesianProduct<string, string, TrainingPair>(
        allPossibleDealerHands,
        selectedTrainingHands,
        (dealerHand, playerHand) => ({
            dealerHand,
            playerHand
        })
    );
    shuffleArray(trainingPairs);
    // return devHands;
    return trainingPairs;
};

export const trainingPairToTrainingHands = (
    trainingPair: TrainingPair,
    cardSet: CardSet
): TrainingHand => ({
    dealerHand: createHand([
        extractCardFromCardSet(figuresToSymbols(trainingPair.dealerHand), cardSet)
    ]),
    playerHand: handRepresentationToHand(trainingPair.playerHand, cardSet)
});
