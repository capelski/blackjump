import { CardSet, Hand, HandOutcome, Player } from '../types';
import { createHand, dealCard, resolveHand } from './hand';

export const createPlayer = (cash = 100): Player => ({
    cash,
    handIndex: 0,
    hands: []
});

export const hitCurrentHand = (player: Player, cardSet: CardSet) => {
    dealCard(player.hands[player.handIndex], cardSet);
};

export const doubleCurrentHand = (player: Player, cardSet: CardSet) => {
    const currentHand = player.hands[player.handIndex];
    hitCurrentHand(player, cardSet);
    player.cash -= currentHand.bet;
    currentHand.bet *= 2;
};

export const getCurrentHand = (player: Player): Hand => player.hands[player.handIndex];

export const initializeHands = (player: Player, initialHand: Hand) => {
    player.cash -= initialHand.bet;
    player.hands = [initialHand];
    player.handIndex = 0;
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

export const splitCurrentHand = (player: Player, cardSet: CardSet) => {
    const firstHand = createHand([player.hands[player.handIndex].cards[0]]);
    const secondHand = createHand([player.hands[player.handIndex].cards[1]]);
    player.cash -= secondHand.bet;
    dealCard(firstHand, cardSet);
    player.hands.splice(player.handIndex, 1, firstHand, secondHand);
};

export const startNextHand = (player: Player, cardSet: CardSet) => {
    player.handIndex++;
    dealCard(player.hands[player.handIndex], cardSet);
};

export const surrenderCurrentHand = (player: Player) => {
    player.cash += player.hands[player.handIndex].bet / 2;
    player.hands.splice(player.handIndex, 1);
};
