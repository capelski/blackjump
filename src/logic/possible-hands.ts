import { HandRepresentation } from '../types';

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

const splitHands: HandRepresentation[] = [
    '2,2',
    '3,3',
    '4,4',
    '5,5',
    '6,6',
    '7,7',
    '8,8',
    '9,9',
    'Figure,Figure',
    'A,A'
];

const softHands: HandRepresentation[] = [
    'A,2',
    'A,3',
    'A,4',
    'A,5',
    'A,6',
    'A,7',
    'A,8',
    'A,9'
    // 'A,Figure' -> BlackJack! This hand doesn't need training
];

const hardHands: HandRepresentation[] = [
    // '+4', -> Only possible with 2,2, already covered in splitHands
    '+5',
    '+6',
    '+7',
    '+8',
    '+9',
    '+10',
    '+11',
    '+12',
    '+13',
    '+14',
    '+15',
    '+16',
    '+17',
    '+18',
    '+19',
    '+20'
    // '+21' -> Maximum score! This hand doesn't need training
];

export const allPossiblePlayerHands = [...splitHands, ...softHands, ...hardHands];

export const numberOfTrainingPairs = allPossibleDealerHands.length * allPossiblePlayerHands.length;
