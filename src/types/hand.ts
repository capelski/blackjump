import { Card } from './card';

export interface Hand {
    bet: number;
    cards: Card[];
    outcome?: string;
    values: number[];
}

export enum HandOutcome {
    blackjack = 'Blackjack',
    bust = 'Bust',
    dealerWins = 'Dealer wins',
    playerWins = 'Player wins',
    push = 'Push'
}

export type HandRepresentation = string;
