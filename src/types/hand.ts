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

// TODO Rename to TrainingHandRepresentation
export enum HandRepresentation {
    Hard5 = '5',
    Hard6 = '6',
    Hard7 = '7',
    Hard8 = '8',
    Hard9 = '9',
    Hard10 = '10',
    Hard11 = '11',
    Hard12 = '12',
    Hard13 = '13',
    Hard14 = '14',
    Hard15 = '15',
    Hard16 = '16',
    Hard17 = '17',
    Hard18 = '18',
    Hard19 = '19',
    Hard20 = '20',
    Soft13 = '3/13',
    Soft14 = '4/14',
    Soft15 = '5/15',
    Soft16 = '6/16',
    Soft17 = '7/17',
    Soft18 = '8/18',
    Soft19 = '9/19',
    Soft20 = '10/20',
    Split2s = '2,2',
    Split3s = '3,3',
    Split4s = '4,4',
    Split5s = '5,5',
    Split6s = '6,6',
    Split7s = '7,7',
    Split8s = '8,8',
    Split9s = '9,9',
    Split10s = '10,10',
    SplitAs = 'A,A'
}
