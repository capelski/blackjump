import {
    GameConfig,
    HandCode,
    SelectedHands,
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

export const getDefaultTrainingStatus = (): TrainingStatus => ({
    attemptedTrainingPairs: 0,
    isCompleted: false,
    isProgressBlocked: false,
    missedTrainingPairs: [],
    passedTrainingPairs: 0,
    trainingProgress: Object.values(HandCode).reduce<TrainingProgress>(
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

export const getIsProgressBlocked = (
    trainingStatus: TrainingStatus,
    trainingHands: TrainingHands,
    selectedHandsOnly: boolean,
    selectedHands: SelectedHands
) =>
    selectedHandsOnly &&
    getProgressPercentage(trainingStatus.attemptedTrainingPairs) < 100 &&
    getUntrainedTrainingHands(trainingHands, trainingStatus.trainingProgress, selectedHands)
        .length === 0;

export const getProgressPercentage = (attemptedTrainingPairs: number) =>
    Math.floor((attemptedTrainingPairs * 1000) / allTrainingPairsNumber) / 10;

export const isTrainingCompleted = (passedTrainingPairs: number) =>
    passedTrainingPairs === allTrainingPairsNumber;

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
        attemptedTrainingPairs:
            reducedTrainingStatus.attemptedTrainingPairs +
            (trainingPairStatus !== TrainingPairStatus.untrained ? 1 : 0),
        isCompleted: false,
        isProgressBlocked: false,
        missedTrainingPairs:
            trainingPairStatus === TrainingPairStatus.missed
                ? reducedTrainingStatus.missedTrainingPairs.concat([
                      {
                          dealerSymbol,
                          handCode
                      }
                  ])
                : reducedTrainingStatus.missedTrainingPairs,
        passedTrainingPairs:
            reducedTrainingStatus.passedTrainingPairs +
            (trainingPairStatus === TrainingPairStatus.passed ? 1 : 0),
        trainingProgress: reducedTrainingStatus.trainingProgress
    };
};

export const retrieveTrainingStatus = (
    trainingProgress: TrainingProgress,
    trainingHands: TrainingHands,
    gameConfig: GameConfig
): TrainingStatus => {
    const trainingStatus = getObjectKeys(trainingProgress).reduce<TrainingStatus>(
        (reducedTrainingStatus, handCode) =>
            reduceTrainingHandProgress(handCode, trainingProgress[handCode], reducedTrainingStatus),
        {
            attemptedTrainingPairs: 0,
            isCompleted: false,
            isProgressBlocked: false,
            missedTrainingPairs: [],
            passedTrainingPairs: 0,
            trainingProgress: trainingProgress
        } as TrainingStatus
    );

    trainingStatus.isCompleted = isTrainingCompleted(trainingStatus.passedTrainingPairs);
    trainingStatus.isProgressBlocked = getIsProgressBlocked(
        trainingStatus,
        trainingHands,
        gameConfig.selectedHandsOnly,
        gameConfig.selectedHands
    );

    return trainingStatus;
};
