import { HandRepresentation, SimpleCardSymbol, TrainingSet } from '../types';
import { relevantHands } from './relevant-hands';

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

export const trainingSets = Object.keys(relevantHands).map<TrainingSet>((relevantHandKey) => ({
    dealerHands: [...allPossibleDealerCards],
    playerHand: {
        data: relevantHands[relevantHandKey as HandRepresentation],
        representation: relevantHandKey as HandRepresentation
    }
}));
