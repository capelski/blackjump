import {
    DealerCards,
    FailedHand,
    HandRepresentation,
    TrainedHandsStats,
    TrainedHandStatus,
    TrainingProgress,
    TrainingStatus
} from '../types';
import { getObjectKeys } from '../utils';
import { allPossibleDealerCards, allTrainingPairsNumber } from './training-pair';

export const getDefaultTrainingStatus = (): TrainingStatus => ({
    failed: [],
    isCompleted: false,
    progress: Object.values(HandRepresentation)
        .map((playerHand) => ({
            [playerHand]: allPossibleDealerCards.reduce<DealerCards>(
                (reducedDealerCards, dealerCard) => ({
                    ...reducedDealerCards,
                    [dealerCard]: TrainedHandStatus.untrained
                }),
                {} as DealerCards
            )
        }))
        .reduce<TrainingProgress>(
            (reducedPlayerHands, playerHand) => ({ ...reducedPlayerHands, ...playerHand }),
            {} as TrainingProgress
        ),
    stats: {
        passed: 0,
        trained: 0
    }
});

export const isTrainingCompleted = (trainedHandsStats: TrainedHandsStats) =>
    trainedHandsStats.trained === allTrainingPairsNumber;

export const retrieveTrainingStatus = (trainingProgress: TrainingProgress): TrainingStatus => {
    const progressData = getObjectKeys(trainingProgress).reduce<{
        failedHands: FailedHand[];
        passed: number;
        trained: number;
    }>(
        (reduced, handRepresentation) => {
            const dealerCards = trainingProgress[handRepresentation];
            return getObjectKeys(dealerCards).reduce((handReduced, dealerCard) => {
                const handStatus = dealerCards[dealerCard];
                return {
                    failedHands:
                        handStatus === TrainedHandStatus.failed
                            ? handReduced.failedHands.concat([
                                  {
                                      dealerSymbol: dealerCard,
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
        failed: progressData.failedHands,
        isCompleted: isTrainingCompleted(progressData),
        progress: trainingProgress,
        stats: {
            passed: progressData.passed,
            trained: progressData.trained
        }
    };
};
