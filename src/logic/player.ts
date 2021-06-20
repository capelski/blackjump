import {
    Card,
    Hand,
    HandOutcome,
    Player,
    SimpleCardSymbol,
    TrainingHands,
    TrainingProgress
} from '../types';
import { getRandomCard } from './card';
import { createHand, dealCard, getCardForUntrainedHand, handToHandCode, resolveHand } from './hand';

export const createPlayer = (): Player => ({
    cash: 0,
    earningsHistorical: [],
    handIndex: 0,
    hands: [],
    lastActionHand: undefined
});

export const hitCurrentHand = (
    player: Player,
    untrainedPairsPriority: boolean,
    dealerSymbol: SimpleCardSymbol,
    trainingHands: TrainingHands,
    trainingProgress: TrainingProgress
) => {
    const currentHand = getCurrentHand(player);
    player.lastActionHand = handToHandCode(currentHand);
    const nextCard = untrainedPairsPriority
        ? getCardForUntrainedHand(currentHand, dealerSymbol, trainingHands, trainingProgress)
        : getRandomCard();
    dealCard(currentHand, nextCard);
};

export const doubleCurrentHand = (player: Player, card: Card) => {
    const currentHand = getCurrentHand(player);
    player.lastActionHand = handToHandCode(currentHand);
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
        const handOutcome = resolveHand(hand, player.hands.length, dealerHand);
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
    player.earningsHistorical = player.earningsHistorical.concat([player.cash]);
};

export const splitCurrentHand = (
    player: Player,
    untrainedPairsPriority: boolean,
    dealerSymbol: SimpleCardSymbol,
    trainingHands: TrainingHands,
    trainingProgress: TrainingProgress
) => {
    const currentHand = getCurrentHand(player);
    player.lastActionHand = handToHandCode(currentHand);
    const firstHand = createHand([currentHand.cards[0]]);
    const secondHand = createHand([currentHand.cards[1]]);
    player.cash -= secondHand.bet;
    const nextCard = untrainedPairsPriority
        ? getCardForUntrainedHand(firstHand, dealerSymbol, trainingHands, trainingProgress)
        : getRandomCard();
    dealCard(firstHand, nextCard);
    player.hands.splice(player.handIndex, 1, firstHand, secondHand);
};

export const startNextHand = (
    player: Player,
    untrainedPairsPriority: boolean,
    dealerSymbol: SimpleCardSymbol,
    trainingHands: TrainingHands,
    trainingProgress: TrainingProgress
) => {
    player.handIndex++;
    const nextHand = player.hands[player.handIndex];
    const nextCard = untrainedPairsPriority
        ? getCardForUntrainedHand(nextHand, dealerSymbol, trainingHands, trainingProgress)
        : getRandomCard();
    dealCard(nextHand, nextCard);
};

export const standCurrentHand = (player: Player) => {
    const currentHand = getCurrentHand(player);
    player.lastActionHand = handToHandCode(currentHand);
};

export const surrenderCurrentHand = (player: Player) => {
    const currentHand = getCurrentHand(player);
    player.lastActionHand = handToHandCode(currentHand);
    player.cash += currentHand.bet / 2;
    player.hands.splice(player.handIndex, 1);
};
