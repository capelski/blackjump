import {
    GameConfig,
    HandCode,
    SimpleCardSymbol,
    TrainingHands,
    TrainingHandStatus,
    TrainingPairStatus,
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
    attemptedHands: 0,
    failedTrainingPairs: [],
    isCompleted: false,
    passedHands: 0,
    progress: Object.values(HandCode).reduce<TrainingProgress>(
        (reducedTrainingProgress, handCode) => ({
            ...reducedTrainingProgress,
            [handCode]: allDealerSymbols.reduce<TrainingHandStatus>(
                (reducedDealerSymbols, dealerSymbol) => ({
                    ...reducedDealerSymbols,
                    [dealerSymbol]: TrainingPairStatus.untrained
                }),
                {} as TrainingHandStatus
            )
        }),
        {} as TrainingProgress
    )
});

export const isTrainingCompleted = (passedHands: number) => passedHands === allTrainingPairsNumber;

const reduceTrainingHandProgress = (
    handCode: HandCode,
    trainingHandStatus: TrainingHandStatus,
    reducedTrainingStatus: TrainingStatus
): TrainingStatus =>
    getObjectKeys(trainingHandStatus).reduce<TrainingStatus>(
        (reducedTrainingStatus, dealerSymbol) =>
            reduceTrainingPairProgress(
                handCode,
                dealerSymbol,
                trainingHandStatus[dealerSymbol],
                reducedTrainingStatus
            ),
        reducedTrainingStatus
    );

const reduceTrainingPairProgress = (
    handCode: HandCode,
    dealerSymbol: SimpleCardSymbol,
    trainingPairStatus: TrainingPairStatus,
    reducedTrainingStatus: TrainingStatus
): TrainingStatus => {
    return {
        attemptedHands:
            reducedTrainingStatus.attemptedHands +
            (trainingPairStatus !== TrainingPairStatus.untrained ? 1 : 0),
        isCompleted: reducedTrainingStatus.isCompleted,
        failedTrainingPairs:
            trainingPairStatus === TrainingPairStatus.failed
                ? reducedTrainingStatus.failedTrainingPairs.concat([
                      {
                          dealerSymbol,
                          handCode
                      }
                  ])
                : reducedTrainingStatus.failedTrainingPairs,
        passedHands:
            reducedTrainingStatus.passedHands +
            (trainingPairStatus === TrainingPairStatus.passed ? 1 : 0),
        progress: reducedTrainingStatus.progress
    };
};

export const retrieveTrainingStatus = (trainingProgress: TrainingProgress): TrainingStatus => {
    const trainingStatus = getObjectKeys(trainingProgress).reduce<TrainingStatus>(
        (reducedTrainingStatus, handCode) =>
            reduceTrainingHandProgress(handCode, trainingProgress[handCode], reducedTrainingStatus),
        {
            attemptedHands: 0,
            failedTrainingPairs: [],
            isCompleted: false,
            passedHands: 0,
            progress: trainingProgress
        } as TrainingStatus
    );

    trainingStatus.isCompleted = isTrainingCompleted(trainingStatus.passedHands);

    return trainingStatus;
};
