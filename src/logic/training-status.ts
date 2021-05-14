import {
    DealerSymbols,
    GameConfig,
    HandCode,
    SimpleCardSymbol,
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
    attemptedHands: 0,
    failedHands: [],
    isCompleted: false,
    passedHands: 0,
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
    )
});

export const isTrainingCompleted = (passedHands: number) => passedHands === allTrainingPairsNumber;

const reduceHandProgress = (
    handCode: HandCode,
    dealerSymbols: DealerSymbols,
    reducedTrainingStatus: TrainingStatus
): TrainingStatus =>
    getObjectKeys(dealerSymbols).reduce<TrainingStatus>(
        (reducedTrainingStatus, dealerSymbol) =>
            reduceTrainingPairProgress(
                handCode,
                dealerSymbol,
                dealerSymbols[dealerSymbol],
                reducedTrainingStatus
            ),
        reducedTrainingStatus
    );

const reduceTrainingPairProgress = (
    handCode: HandCode,
    dealerSymbol: SimpleCardSymbol,
    handStatus: TrainingHandStatus,
    reducedTrainingStatus: TrainingStatus
): TrainingStatus => {
    return {
        attemptedHands:
            reducedTrainingStatus.attemptedHands +
            (handStatus !== TrainingHandStatus.untrained ? 1 : 0),
        isCompleted: reducedTrainingStatus.isCompleted,
        failedHands:
            handStatus === TrainingHandStatus.failed
                ? reducedTrainingStatus.failedHands.concat([
                      {
                          dealerSymbol,
                          handCode
                      }
                  ])
                : reducedTrainingStatus.failedHands,
        passedHands:
            reducedTrainingStatus.passedHands + (handStatus === TrainingHandStatus.passed ? 1 : 0),
        progress: reducedTrainingStatus.progress
    };
};

export const retrieveTrainingStatus = (trainingProgress: TrainingProgress): TrainingStatus => {
    const trainingStatus = getObjectKeys(trainingProgress).reduce<TrainingStatus>(
        (reducedTrainingStatus, handCode) =>
            reduceHandProgress(handCode, trainingProgress[handCode], reducedTrainingStatus),
        {
            attemptedHands: 0,
            failedHands: [],
            isCompleted: false,
            passedHands: 0,
            progress: trainingProgress
        } as TrainingStatus
    );

    trainingStatus.isCompleted = isTrainingCompleted(trainingStatus.passedHands);

    return trainingStatus;
};
