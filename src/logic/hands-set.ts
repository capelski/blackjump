import { CardSet, Hand, HandsSet } from '../types';
import { createHand, dealCard, resolveHand } from './hand';

export const createHandsSet = (initialHand: Hand) => ({
    currentHand: 0,
    hands: [initialHand]
});

export const dealToCurrentHand = (handsSet: HandsSet, cardSet: CardSet) => {
    dealCard(handsSet.hands[handsSet.currentHand], cardSet);
};

export const getCurrentHand = (handsSet: HandsSet): Hand => handsSet.hands[handsSet.currentHand];

export const isLastHand = (handsSet: HandsSet) => handsSet.hands.length - 1 <= handsSet.currentHand;

export const resolveHandsSet = (handsSet: HandsSet, dealerHand: Hand) => {
    handsSet.hands.forEach((playerHand) => resolveHand(playerHand, dealerHand));
};

export const splitCurrentHand = (handsSet: HandsSet, cardSet: CardSet) => {
    const firstHand = createHand([handsSet.hands[handsSet.currentHand].cards[0]]);
    const secondHand = createHand([handsSet.hands[handsSet.currentHand].cards[1]]);
    dealCard(firstHand, cardSet);
    handsSet.hands.splice(handsSet.currentHand, 1, firstHand, secondHand);
};

export const startNextHand = (handsSet: HandsSet, cardSet: CardSet) => {
    handsSet.currentHand++;
    dealCard(handsSet.hands[handsSet.currentHand], cardSet);
};

export const surrenderCurrentHand = (handsSet: HandsSet) => {
    handsSet.hands.splice(handsSet.currentHand, 1);
};
