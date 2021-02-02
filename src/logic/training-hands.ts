import {
    Dictionary,
    FailedHand,
    HandRepresentation,
    SimpleCardSymbol,
    TrainedHands,
    TrainedHandStatus,
    TrainingHands
} from '../types';
import { decisionsDictionary } from './decisions-dictionary';
import { allPossibleDealerCards } from './training-sets';

const getEmptyTrainedHands = (): TrainedHands =>
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

export const getEmptyTrainingHands = (): TrainingHands => ({
    failed: [],
    stats: {
        passed: 0,
        trained: 0
    },
    trained: getEmptyTrainedHands()
});

export const retrieveTrainingHands = (trainedHands: TrainedHands): TrainingHands => {
    const trainedHandsData = Object.keys(trainedHands).reduce<{
        failedHands: FailedHand[];
        passed: number;
        trained: number;
    }>(
        (reduced, trainedHandRepresentation) => {
            const trainedHand = trainedHands[trainedHandRepresentation as HandRepresentation];
            return Object.keys(trainedHand).reduce((handReduced, dealerSymbol) => {
                const handStatus = trainedHand[dealerSymbol as SimpleCardSymbol];
                return {
                    failedHands:
                        handStatus === TrainedHandStatus.failed
                            ? handReduced.failedHands.concat([
                                  {
                                      dealerSymbol: dealerSymbol as SimpleCardSymbol,
                                      handRepresentation: trainedHandRepresentation as HandRepresentation
                                  }
                              ])
                            : handReduced.failedHands,
                    passed: handReduced.passed + (handStatus === TrainedHandStatus.passed ? 1 : 0),
                    trained:
                        handReduced.trained + (handStatus !== TrainedHandStatus.untrained ? 1 : 0)
                };
            }, reduced);
        },
        { failedHands: [], passed: 0, trained: 0 }
    );

    return {
        failed: trainedHandsData.failedHands,
        stats: {
            passed: trainedHandsData.passed,
            trained: trainedHandsData.trained
        },
        trained: trainedHands
    };
};
