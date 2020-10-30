import { Hand } from './hand';

export interface Player {
    cash: number;
    handIndex: number;
    hands: Hand[];
    lastActionHand?: Hand;
}
