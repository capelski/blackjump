import {
    DealerSymbols,
    FailedHand,
    GameConfig,
    HandCode,
    TrainedHandsStats,
    TrainingHands,
    TrainingHandStatus,
    TrainingProgress,
    TrainingStatus
} from '../types';
import { getObjectKeys } from '../utils';
import { allDealerSymbols } from './dealer-symbols';
import { getUntrainedTrainingHands } from './training-hand';
import { allTrainingPairsNumber } from './training-pair';

export const getAreGoldHandsBlockingProgress = (
    gameConfig: GameConfig,
    trainingHands: TrainingHands,
    trainingProgress: TrainingProgress,
    progress: number
) =>
    gameConfig.useGoldHands
        ? progress < 100 &&
          getUntrainedTrainingHands(trainingHands, trainingProgress, gameConfig.goldHandsLevels)
              .length === 0
        : false;

export const getDefaultTrainingStatus = (): TrainingStatus => ({
    failedHands: [],
    isCompleted: false,
    progress: Object.values(HandCode).reduce<TrainingProgress>(
        (reducedTrainingProgress, handCode) => ({
            ...reducedTrainingProgress,
            [handCode]: allDealerSymbols.reduce<DealerSymbols>(
                (reducedDealerSymbols, dealerSymbol) => ({
                    ...reducedDealerSymbols,
                    [dealerSymbol]: TrainingHandStatus.untrained
                }),
                {} as DealerSymbols
            )
        }),
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
    // TODO Extract type?
    const progressData = getObjectKeys(trainingProgress).reduce<{
        failedHands: FailedHand[];
        passed: number;
        trained: number;
    }>(
        (reducedProgressData, handCode) => {
            const dealerSymbols = trainingProgress[handCode];
            return getObjectKeys(dealerSymbols).reduce((reducedTrainingHand, dealerSymbol) => {
                const handStatus = dealerSymbols[dealerSymbol];
                return {
                    failedHands:
                        handStatus === TrainingHandStatus.failed
                            ? reducedTrainingHand.failedHands.concat([
                                  {
                                      dealerSymbol: dealerSymbol,
                                      handCode: handCode
                                  }
                              ])
                            : reducedTrainingHand.failedHands,
                    passed:
                        reducedTrainingHand.passed +
                        (handStatus === TrainingHandStatus.passed ? 1 : 0),
                    trained:
                        reducedTrainingHand.trained +
                        (handStatus !== TrainingHandStatus.untrained ? 1 : 0)
                };
            }, reducedProgressData);
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
