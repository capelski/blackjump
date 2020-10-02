import { TrainingPair, CardSet, TrainingHand, HandRepresentation } from '../types';
import { cartesianProduct, shuffleArray } from '../utils';
import { decisionsDictionary } from './basic-strategy';
import { extractCardFromCardSet } from './card-set';
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

export const allPossiblePlayerHands: HandRepresentation[] = Object.keys(decisionsDictionary);

export const getAllTrainingPairs = () => {
    const trainingPairs = cartesianProduct<string, string, TrainingPair>(
        allPossibleDealerHands,
        allPossiblePlayerHands,
        (dealerHand, playerHand) => ({
            dealerHand,
            playerHand
        })
    );
    shuffleArray(trainingPairs);
    return trainingPairs;
};

export const trainingPairToTrainingHands = (
    trainingPair: TrainingPair,
    cardSet: CardSet
): TrainingHand => ({
    dealerHand: createHand([
        extractCardFromCardSet(figuresToSymbols(trainingPair.dealerHand), cardSet)
    ]),
    playerHands: [handRepresentationToHand(trainingPair.playerHand, cardSet)]
});
