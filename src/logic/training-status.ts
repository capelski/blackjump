import {
    DealerCards,
    FailedHand,
    HandCode,
    TrainedHandsStats,
    TrainingHandStatus,
    TrainingProgress,
    TrainingStatus
} from '../types';
import { getObjectKeys } from '../utils';
import { allPossibleDealerCards, allTrainingPairsNumber } from './training-pair';

export const getDefaultTrainingStatus = (): TrainingStatus => ({
    failedHands: [],
    isCompleted: false,
    progress: Object.values(HandCode)
        .map((playerHand) => ({
            [playerHand]: allPossibleDealerCards.reduce<DealerCards>(
                (reducedDealerCards, dealerCard) => ({
                    ...reducedDealerCards,
                    [dealerCard]: TrainingHandStatus.untrained
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
        (reduced, handCode) => {
            const dealerCards = trainingProgress[handCode];
            return getObjectKeys(dealerCards).reduce((handReduced, dealerCard) => {
                const handStatus = dealerCards[dealerCard];
                return {
                    failedHands:
                        handStatus === TrainingHandStatus.failed
                            ? handReduced.failedHands.concat([
                                  {
                                      dealerSymbol: dealerCard,
                                      handCode: handCode
                                  }
                              ])
                            : handReduced.failedHands,
                    passed: handReduced.passed + (handStatus === TrainingHandStatus.passed ? 1 : 0),
                    trained:
                        handReduced.trained + (handStatus !== TrainingHandStatus.untrained ? 1 : 0)
                };
            }, reduced);
        },
        { failedHands: [], passed: 0, trained: 0 }
    );

    return {
        failedHands: progressData.failedHands,
        isCompleted: isTrainingCompleted(progressData),
        progress: trainingProgress,
        stats: {
            passed: progressData.passed,
            trained: progressData.trained
        }
    };
};
