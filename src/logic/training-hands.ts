import {
    DealerCards,
    FailedHand,
    HandRepresentation,
    TrainedHands,
    TrainedHandsStats,
    TrainedHandStatus,
    TrainingHands
} from '../types';
import { getObjectKeys } from '../utils';
import { allPossibleDealerCards, allTrainingPairsNumber } from './training-pair';

const getEmptyTrainedHands = (): TrainedHands =>
    Object.values(HandRepresentation)
        .map((playerHand) => ({
            [playerHand]: allPossibleDealerCards.reduce<DealerCards>(
                (reducedDealerCards, dealerCard) => ({
                    ...reducedDealerCards,
                    [dealerCard]: TrainedHandStatus.untrained
                }),
                {} as DealerCards
            )
        }))
        .reduce<TrainedHands>(
            (reducedPlayerHands, playerHand) => ({ ...reducedPlayerHands, ...playerHand }),
            {} as TrainedHands
        );

export const getEmptyTrainingHands = (): TrainingHands => ({
    failed: [],
    isCompleted: false,
    stats: {
        passed: 0,
        trained: 0
    },
    trained: getEmptyTrainedHands()
});

export const isTrainingCompleted = (trainedHandsStats: TrainedHandsStats) =>
    trainedHandsStats.trained === allTrainingPairsNumber;

export const retrieveTrainingHands = (trainedHands: TrainedHands): TrainingHands => {
    const trainedHandsData = getObjectKeys(trainedHands).reduce<{
        failedHands: FailedHand[];
        passed: number;
        trained: number;
    }>(
        (reduced, handRepresentation) => {
            const trainedHand = trainedHands[handRepresentation];
            return getObjectKeys(trainedHand).reduce((handReduced, dealerSymbol) => {
                const handStatus = trainedHand[dealerSymbol];
                return {
                    failedHands:
                        handStatus === TrainedHandStatus.failed
                            ? handReduced.failedHands.concat([
                                  {
                                      dealerSymbol,
                                      handRepresentation
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
        isCompleted: isTrainingCompleted(trainedHandsData),
        stats: {
            passed: trainedHandsData.passed,
            trained: trainedHandsData.trained
        },
        trained: trainedHands
    };
};
