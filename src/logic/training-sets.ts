import { HandRepresentation, SimpleCardSymbol, TrainingSet } from '../types';
import { decisionsDictionary } from './decisions-dictionary';

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

export const trainingSets = Object.keys(decisionsDictionary).map<TrainingSet>(
    (relevantHandKey) => ({
        dealerHands: [...allPossibleDealerCards],
        playerHand: {
            data: decisionsDictionary[relevantHandKey as HandRepresentation],
            representation: relevantHandKey as HandRepresentation
        }
    })
);
