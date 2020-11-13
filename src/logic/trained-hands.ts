import { TrainedHands } from '../types';
import { decisionsDictionary } from './decisions-dictionary';
import { allPossibleDealerCards } from './training-sets';

export const getEmptyTrainedHands = (): TrainedHands =>
    Object.keys(decisionsDictionary)
        .map((playerHand) => ({
            [playerHand]: allPossibleDealerCards.reduce(
                (reducedDealerHands, dealerHand) => ({
                    ...reducedDealerHands,
                    [dealerHand]: false
                }),
                {}
            )
        }))
        .reduce((reducedPlayerHands, playerHand) => ({ ...reducedPlayerHands, ...playerHand }), {});
