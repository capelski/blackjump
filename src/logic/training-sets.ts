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
    Object.keys(relevantHands).map<TrainingSet>((relevantHandKey) => ({
        dealerHands: [...allPossibleDealerCards],
        playerHand: {
            data: relevantHands[relevantHandKey as HandRepresentation],
            representation: relevantHandKey as HandRepresentation
        }
    }));

export const defaultTrainingSets = getTrainingSets(getDefaultRelevantHands());
