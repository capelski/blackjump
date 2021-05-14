import {
    Card,
    Hand,
    HandOutcome,
    Player,
    SimpleCardSymbol,
    TrainedHands,
    TrainingHands
} from '../types';
import { getRandomCard } from './card';
import { createHand, dealCard, resolveHand } from './hand';
import { handToHandRepresentation } from './hand-representation';
import { getCardForUntrainedHand } from './training-pair';

export const createPlayer = (cash = 0): Player => ({
    cash,
    handIndex: 0,
    hands: [],
    lastActionHand: undefined
});

export const hitCurrentHand = (
    player: Player,
    useBlueCards: boolean,
    dealerSymbol: SimpleCardSymbol,
    trainingHands: TrainingHands,
    trainedHands: TrainedHands
) => {
    const currentHand = getCurrentHand(player);
    player.lastActionHand = handToHandRepresentation(currentHand);
    const nextCard = useBlueCards
        ? getCardForUntrainedHand(currentHand, dealerSymbol, trainingHands, trainedHands)
        : getRandomCard();
    dealCard(currentHand, nextCard);
};

export const doubleCurrentHand = (player: Player, card: Card) => {
    const currentHand = getCurrentHand(player);
    player.lastActionHand = handToHandRepresentation(currentHand);
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
    useBlueCards: boolean,
    dealerSymbol: SimpleCardSymbol,
    trainingHands: TrainingHands,
    trainedHands: TrainedHands
) => {
    const currentHand = getCurrentHand(player);
    player.lastActionHand = handToHandRepresentation(currentHand);
    const firstHand = createHand([currentHand.cards[0]]);
    const secondHand = createHand([currentHand.cards[1]]);
    player.cash -= secondHand.bet;
    const nextCard = useBlueCards
        ? getCardForUntrainedHand(firstHand, dealerSymbol, trainingHands, trainedHands)
        : getRandomCard();
    dealCard(firstHand, nextCard);
    player.hands.splice(player.handIndex, 1, firstHand, secondHand);
};

export const startNextHand = (
    player: Player,
    useBlueCards: boolean,
    dealerSymbol: SimpleCardSymbol,
    trainingHands: TrainingHands,
    trainedHands: TrainedHands
) => {
    player.handIndex++;
    const nextHand = player.hands[player.handIndex];
    const nextCard = useBlueCards
        ? getCardForUntrainedHand(nextHand, dealerSymbol, trainingHands, trainedHands)
        : getRandomCard();
    dealCard(nextHand, nextCard);
};

export const standCurrentHand = (player: Player) => {
    const currentHand = getCurrentHand(player);
    player.lastActionHand = handToHandRepresentation(currentHand);
};

export const surrenderCurrentHand = (player: Player) => {
    const currentHand = getCurrentHand(player);
    player.lastActionHand = handToHandRepresentation(currentHand);
    player.cash += currentHand.bet / 2;
    player.hands.splice(player.handIndex, 1);
};
