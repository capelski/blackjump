import {
    GameConfig,
    HandCode,
    SelectedHands,
    SimpleCardSymbol,
    TrainingHands,
    TrainingHandStatus,
    TrainingPairRepresentation,
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

const getNextMissedTrainingPairs = (
    missedTrainingPairs: TrainingPairRepresentation[],
    isHit: boolean,
    handCode: HandCode,
    currentDealerSymbol: SimpleCardSymbol
): TrainingPairRepresentation[] => {
    return isHit
        ? missedTrainingPairs.filter(
              (missedTrainingPair) =>
                  missedTrainingPair.dealerSymbol !== currentDealerSymbol ||
                  missedTrainingPair.handCode !== handCode
          )
        : missedTrainingPairs.some(
              (missedTrainingPair) =>
                  missedTrainingPair.dealerSymbol === currentDealerSymbol &&
                  missedTrainingPair.handCode === handCode
          )
        ? missedTrainingPairs
        : [{ dealerSymbol: currentDealerSymbol, handCode }].concat(missedTrainingPairs);
};

export const getNextTrainingStatus = (
    trainingStatus: TrainingStatus,
    trainingHands: TrainingHands,
    gameConfig: GameConfig,
    isHit: boolean,
    currentHandCode: HandCode,
    currentDealerSymbol: SimpleCardSymbol
): TrainingStatus => {
    // The current trainingStatus.trainingProgress[currentHandCode][currentDealerSymbol]
    // value must be kept to update attemptedTrainingPairs and passedTrainingPairs
    const currentHandTrainingStatus =
        trainingStatus.trainingProgress[currentHandCode][currentDealerSymbol];

    trainingStatus.trainingProgress[currentHandCode][currentDealerSymbol] = isHit
        ? TrainingPairStatus.passed
        : TrainingPairStatus.missed;

    const nextAttemptedTrainingPairs =
        trainingStatus.attemptedTrainingPairs +
        (currentHandTrainingStatus === TrainingPairStatus.untrained ? 1 : 0);

    const nextMissedTrainingPairs = getNextMissedTrainingPairs(
        trainingStatus.missedTrainingPairs,
        isHit,
        currentHandCode,
        currentDealerSymbol
    );

    const nextPassedTrainingHands =
        trainingStatus.passedTrainingPairs +
        (isHit && currentHandTrainingStatus !== TrainingPairStatus.passed
            ? 1
            : !isHit && currentHandTrainingStatus === TrainingPairStatus.passed
            ? -1
            : 0);

    const nextTrainingStatus = {
        attemptedTrainingPairs: nextAttemptedTrainingPairs,
        isCompleted: isTrainingCompleted(nextPassedTrainingHands),
        isProgressBlocked: false,
        missedTrainingPairs: nextMissedTrainingPairs,
        passedTrainingPairs: nextPassedTrainingHands,
        trainingProgress: trainingStatus.trainingProgress
    };

    nextTrainingStatus.isProgressBlocked = getIsProgressBlocked(
        nextTrainingStatus,
        trainingHands,
        gameConfig.selectedHandsOnly,
        gameConfig.selectedHands
    );

    return nextTrainingStatus;
};

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
