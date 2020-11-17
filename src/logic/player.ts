import { Card, Hand, HandOutcome, Player, SimpleCardSymbol, TrainedHands } from '../types';
import { createHand, dealCard, resolveHand } from './hand';
import { getCardForUntrainedHand } from './training-pairs';

export const cloneHand = (hand: Hand): Hand => ({
    bet: hand.bet,
    cards: [...hand.cards],
    values: [...hand.values]
});

export const createPlayer = (cash = 0): Player => ({
    cash,
    handIndex: 0,
    hands: [],
    lastActionHand: undefined
});

export const hitCurrentHand = (
    player: Player,
    dealerSymbol: SimpleCardSymbol,
    trainedHands: TrainedHands
) => {
    const currentHand = getCurrentHand(player);
    player.lastActionHand = cloneHand(currentHand);
    dealCard(currentHand, getCardForUntrainedHand(currentHand, dealerSymbol, trainedHands));
};

export const doubleCurrentHand = (player: Player, card: Card) => {
    const currentHand = getCurrentHand(player);
    player.lastActionHand = cloneHand(currentHand);
    dealCard(currentHand, card);
    player.cash -= currentHand.bet;
    currentHand.bet *= 2;
};

export const getCurrentHand = (player: Player): Hand => player.hands[player.handIndex];

export const initializeHands = (player: Player, initialHand: Hand) => {
    player.cash -= initialHand.bet;
    player.hands = [initialHand];
    player.handIndex = 0;
    player.lastActionHand = undefined;
};

export const isLastHand = (player: Player) => player.hands.length - 1 <= player.handIndex;

export const resolveHands = (player: Player, dealerHand: Hand) => {
    const earnings = player.hands.reduce((earnings, hand) => {
        const handOutcome = resolveHand(hand, dealerHand);
        return (
            earnings +
            (handOutcome === HandOutcome.blackjack
                ? hand.bet * 2.5
                : handOutcome === HandOutcome.playerWins
                ? hand.bet * 2
                : handOutcome === HandOutcome.push
                ? hand.bet
                : 0)
        );
    }, 0);
    player.cash += earnings;
};

export const splitCurrentHand = (
    player: Player,
    dealerSymbol: SimpleCardSymbol,
    trainedHands: TrainedHands
) => {
    const currentHand = getCurrentHand(player);
    player.lastActionHand = cloneHand(currentHand);
    const firstHand = createHand([currentHand.cards[0]]);
    const secondHand = createHand([currentHand.cards[1]]);
    player.cash -= secondHand.bet;
    dealCard(firstHand, getCardForUntrainedHand(firstHand, dealerSymbol, trainedHands));
    player.hands.splice(player.handIndex, 1, firstHand, secondHand);
};

export const startNextHand = (
    player: Player,
    dealerSymbol: SimpleCardSymbol,
    trainedHands: TrainedHands
) => {
    player.handIndex++;
    const nextHand = player.hands[player.handIndex];
    dealCard(nextHand, getCardForUntrainedHand(nextHand, dealerSymbol, trainedHands));
};

export const standCurrentHand = (player: Player) => {
    const currentHand = getCurrentHand(player);
    player.lastActionHand = cloneHand(currentHand);
};

export const surrenderCurrentHand = (player: Player) => {
    const currentHand = getCurrentHand(player);
    player.lastActionHand = cloneHand(currentHand);
    player.cash += currentHand.bet / 2;
    player.hands.splice(player.handIndex, 1);
};
