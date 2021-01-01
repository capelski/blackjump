import { Hand, HandRepresentation } from './hand';

export interface Player {
    cash: number;
    handIndex: number;
    hands: Hand[];
    lastActionHand?: HandRepresentation;
}
