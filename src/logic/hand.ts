import { Card, CasinoRules, CasinoRulesKeys, Doubling, Hand, HandOutcome } from '../types';
import { getCardEffectiveValue, getCardsValues } from './card';

export const canDouble = (hand: Hand, handsNumber: number, casinoRules: CasinoRules) => {
    const handEffectiveValue = getHandEffectiveValue(hand);
    const isHandWithTwoCards = hand.cards.length === 2;
    const isSingleHand = handsNumber === 1;

    const contains9To11 = hand.values.some((handValue) => [9, 10, 11].indexOf(handValue) > -1);
    const is10To11 = handEffectiveValue === 10 || handEffectiveValue === 11;
    const is9To11 = handEffectiveValue === 9 || is10To11;

    return (
        isHandWithTwoCards &&
        (casinoRules[CasinoRulesKeys.doubling] === Doubling.anyPair ||
            (casinoRules[CasinoRulesKeys.doubling] >= Doubling.nineToElevenSoft && contains9To11) ||
            (casinoRules[CasinoRulesKeys.doubling] >= Doubling.nineToEleven && is9To11) ||
            (casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven && is10To11)) &&
        (isSingleHand || casinoRules[CasinoRulesKeys.doubleAfterSplit])
    );
};

export const canSplit = (hand: Hand) =>
    hand.cards.length === 2 &&
    getCardEffectiveValue(hand.cards[0]) === getCardEffectiveValue(hand.cards[1]);

export const canSurrender = (hand: Hand, handsNumber: number, casinoRules: CasinoRules) =>
    handsNumber === 1 && hand.cards.length === 2 && casinoRules[CasinoRulesKeys.surrender];

export const createHand = (cards: Card[], bet = 1): Hand => ({
    bet,
    cards: cards,
    values: getCardsValues(cards)
});

export const dealCard = (hand: Hand, card: Card) => {
    hand.cards.push(card);
    hand.values = getCardsValues(hand.cards);
};

export const getHandEffectiveValue = (hand: Hand) => {
    let effectiveValue = hand.values[0];
    if (hand.values.some((v) => v < 22)) {
        effectiveValue = [...hand.values].reverse().find((v) => v < 22)!;
    }
    return effectiveValue;
};

export const getHandValidValues = (hand: Hand): number[] => {
    return hand.values.some((v) => v < 22) ? hand.values.filter((v) => v < 22) : [hand.values[0]];
};

export const isBlackJack = (hand: Hand) => {
    return (
        hand.cards.length === 2 &&
        hand.values.length === 2 &&
        hand.values[0] === 11 &&
        hand.values[1] === 21
    );
};

export const isBust = (hand: Hand) => {
    return getHandEffectiveValue(hand) > 21;
};

export const isFinished = (hand: Hand) => {
    return getHandEffectiveValue(hand) >= 21;
};

export const resolveHand = (playerHand: Hand, dealerHand: Hand): HandOutcome => {
    const playerHandValue = getHandEffectiveValue(playerHand);
    const dealerHandValue = getHandEffectiveValue(dealerHand!);
    const handOutcome = isBust(playerHand)
        ? HandOutcome.bust
        : isBlackJack(playerHand) && isBlackJack(dealerHand!)
        ? HandOutcome.push
        : isBlackJack(playerHand)
        ? HandOutcome.blackjack
        : isBlackJack(dealerHand!)
        ? HandOutcome.dealerWins
        : isBust(dealerHand!)
        ? HandOutcome.playerWins
        : playerHandValue > dealerHandValue
        ? HandOutcome.playerWins
        : playerHandValue === dealerHandValue
        ? HandOutcome.push
        : HandOutcome.dealerWins;

    playerHand.outcome = handOutcome;
    return handOutcome;
};
