import { CardSet, GameConfig, HandRepresentation, TrainingHand, TrainingPair } from '../types';
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

export const getTrainingPairs = (gameConfig?: GameConfig) => {
    const selectedTrainingHands: HandRepresentation[] = gameConfig
        ? Object.keys(decisionsDictionary).filter((key) => {
              const handLevel = decisionsDictionary[key].level(gameConfig);
              return gameConfig.selectedLevels[handLevel];
          })
        : Object.keys(decisionsDictionary);

    const trainingPairs = cartesianProduct<string, string, TrainingPair>(
        allPossibleDealerHands,
        selectedTrainingHands,
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
    playerHand: handRepresentationToHand(trainingPair.playerHand, cardSet)
});
