import { getHandValues } from './hand';
import { allPossibleDealerHands, allPossiblePlayerHands } from './possible-hands';
import { TrainingPair, HandRepresentation, CardSet, TrainingHand, Card } from './types';
import { cartesianProduct } from './utils';

const figureSymbols = ['10', 'J', 'Q', 'K'];

const extractCardFromCardSet = (symbol: string, cardSet: CardSet): Card => {
    // We search for the cards in the discardPile first to minimize the game interfering
    let card = extractCardFromCollection(symbol, cardSet.discardPile);
    if (!card) {
        card = extractCardFromCollection(symbol, cardSet.unusedCards);
    }
    return card!;
};

const extractCardFromCollection = (symbol: string, cards: Card[]): Card | undefined => {
    let targetCard: Card | undefined;
    // We iterate the cards set from end to beginning to minimize the game interfering
    for (let i = cards.length - 1; i >= 0; --i) {
        const card = cards[i];
        if (symbol === card.symbol) {
            targetCard = card;
            cards.splice(i, 1);
            break;
        }
    }
    return targetCard;
};

export const getAllTrainingPairs = () =>
    cartesianProduct<string, string, TrainingPair>(
        allPossibleDealerHands,
        allPossiblePlayerHands,
        (dealerHand, playerHand) => ({
            dealerHand,
            playerHand
        })
    );

const getFigureSymbol = (): string => {
    const randomIndex = Math.floor(Math.random() * 3);
    return figureSymbols[randomIndex];
};

export const getRandomTrainingHands = (
    trainingPairs: TrainingPair[],
    cardSet: CardSet
): TrainingHand => {
    const trainingPair = getRandomTrainingPair(trainingPairs);

    const playerHandSymbols = getPlayerSymbolsFromTrainingSymbol(trainingPair.playerHand);
    const dealerHandSymbol = trainingPair.dealerHand.replace(/Figure/, getFigureSymbol());

    const playerCards = playerHandSymbols.map((symbol) => extractCardFromCardSet(symbol, cardSet));
    const dealerCards = [extractCardFromCardSet(dealerHandSymbol, cardSet)];

    return {
        dealerHand: {
            cards: dealerCards,
            values: getHandValues(dealerCards)
        },
        playerHands: [
            {
                cards: playerCards,
                values: getHandValues(playerCards)
            }
        ]
    };
};

const getHardHandSymbols = (value: number): string[] => {
    const minValue = Math.max(2, value - 10);
    const maxValue = Math.min(value - minValue, 10);

    let firstSymbol = Math.floor(Math.random() * (maxValue - minValue) + minValue);
    let secondSymbol = value - firstSymbol;

    // If numbers are equal, we would be training a splittable hand. Change them when possible
    // E.g. Transform a 7,7 (for 14) into a 6,8. Do not transform a 10,10 for 20
    if (firstSymbol === secondSymbol && firstSymbol > minValue && firstSymbol < maxValue) {
        firstSymbol++;
        secondSymbol--;
    }

    const firstCardSymbol = firstSymbol === 10 ? getFigureSymbol() : String(firstSymbol);
    const secondCardSymbol = secondSymbol === 10 ? getFigureSymbol() : String(secondSymbol);

    return [firstCardSymbol, secondCardSymbol];
};

const getPlayerSymbolsFromTrainingSymbol = (trainingSymbol: HandRepresentation) => {
    const hardHandMatch = trainingSymbol.match(/^\+(.*)$/);
    const handSymbols = hardHandMatch
        ? getHardHandSymbols(parseInt(hardHandMatch[1], 10))
        : trainingSymbol
              .replace(/Figure/, getFigureSymbol())
              .replace(/Figure/, getFigureSymbol())
              .split(',');

    // In order for soft hands to sometimes have the A in second place,
    // we reverse the symbols 50% of the times
    const binaryRandom = Math.floor(Math.random() * 100) % 2;
    return binaryRandom ? handSymbols.reverse() : handSymbols;
};

const getRandomTrainingPair = (trainingPairs: TrainingPair[]) => {
    const randomIndex = Math.floor(Math.random() * (trainingPairs.length - 1));
    const randomPair = trainingPairs[randomIndex];
    trainingPairs.splice(randomIndex, 1);
    return randomPair;
};
