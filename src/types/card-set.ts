import { Card } from './card';

export interface CardSet {
    beingPlayed: Card[];
    discardPile: Card[];
    unusedCards: Card[];
}
