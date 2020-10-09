import { CardSet, Hand, HandsSet } from '../types';
import { dealCard } from './hand';

export const getCurrentHand = (handsSet: HandsSet): Hand => handsSet.hands[handsSet.currentHand];

export const isLastHand = (handsSet: HandsSet) => handsSet.hands.length - 1 <= handsSet.currentHand;

export const startNextHand = (handsSet: HandsSet, cardSet: CardSet): HandsSet => {
    const nextHandIndex = handsSet.currentHand + 1;
    return {
        currentHand: nextHandIndex,
        hands: handsSet.hands.map((hand, handIndex) => {
            return handIndex === nextHandIndex ? dealCard(hand, cardSet) : hand;
        })
    };
};
