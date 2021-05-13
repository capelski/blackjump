import { HandRepresentation, RelevantHands, SimpleCardSymbol, TrainingSet } from '../types';
import { getDefaultRelevantHands } from './relevant-hands';

export const allPossibleDealerCards: SimpleCardSymbol[] = [
    SimpleCardSymbol.Ace,
    SimpleCardSymbol.Two,
    SimpleCardSymbol.Three,
    SimpleCardSymbol.Four,
    SimpleCardSymbol.Five,
    SimpleCardSymbol.Six,
    SimpleCardSymbol.Seven,
    SimpleCardSymbol.Eight,
    SimpleCardSymbol.Nine,
    SimpleCardSymbol.Ten
];

export const getTrainingSets = (relevantHands: RelevantHands) =>
    Object.values(relevantHands).map<TrainingSet>((relevantHand) => ({
        dealerHands: [...allPossibleDealerCards],
        playerHand: relevantHand
    }));

export const defaultTrainingSets = getTrainingSets(getDefaultRelevantHands());
