import { Dictionary, HandRepresentation, SimpleCardSymbol, TrainedHands } from '../types';
import { TrainedHandStatus } from '../types/training';
import { decisionsDictionary } from './decisions-dictionary';
import { allPossibleDealerCards } from './training-sets';

export const getEmptyTrainedHands = (): TrainedHands =>
    (Object.keys(decisionsDictionary) as HandRepresentation[])
        .map((playerHand) => ({
            [playerHand]: allPossibleDealerCards.reduce<
                Dictionary<TrainedHandStatus, SimpleCardSymbol>
            >(
                (reducedDealerHands, dealerHand) => ({
                    ...reducedDealerHands,
                    [dealerHand]: TrainedHandStatus.untrained
                }),
                {} as Dictionary<TrainedHandStatus, SimpleCardSymbol>
            )
        }))
        .reduce<TrainedHands>(
            (reducedPlayerHands, playerHand) => ({ ...reducedPlayerHands, ...playerHand }),
            {} as TrainedHands
        );
