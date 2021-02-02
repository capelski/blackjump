import {
    FailedHand,
    HandRepresentation,
    SimpleCardSymbol,
    TrainedHands,
    TrainedHandStatus,
    TrainedHandsStats,
    TrainingHands
} from '../types';

const getNextFailedHands = (
    currentFailedHands: FailedHand[],
    isHit: boolean,
    handRepresentation: HandRepresentation,
    currentDealerSymbol: SimpleCardSymbol
): FailedHand[] => {
    return isHit
        ? currentFailedHands.filter(
              (failedHand) =>
                  failedHand.dealerSymbol !== currentDealerSymbol! ||
                  failedHand.handRepresentation !== handRepresentation
          )
        : currentFailedHands.some(
              (failedHand) =>
                  failedHand.dealerSymbol === currentDealerSymbol! &&
                  failedHand.handRepresentation === handRepresentation
          )
        ? currentFailedHands
        : [{ dealerSymbol: currentDealerSymbol!, handRepresentation }].concat(currentFailedHands);
};

const getNextTrainedHands = (
    trainedHands: TrainedHands,
    isHit: boolean,
    handRepresentation: HandRepresentation,
    currentDealerSymbol: SimpleCardSymbol
): TrainedHands => {
    const nextTrainedHands: TrainedHands = { ...trainedHands };

    nextTrainedHands[handRepresentation][currentDealerSymbol] = isHit
        ? TrainedHandStatus.passed
        : TrainedHandStatus.failed;

    return nextTrainedHands;
};

const getNextTrainedHandsStats = (
    trainedHandsStats: TrainedHandsStats,
    isHit: boolean,
    currentTrainedHandStatus: TrainedHandStatus
): TrainedHandsStats => {
    return {
        passed:
            trainedHandsStats.passed +
            (isHit && currentTrainedHandStatus !== TrainedHandStatus.passed
                ? 1
                : !isHit && currentTrainedHandStatus === TrainedHandStatus.passed
                ? -1
                : 0),
        trained:
            trainedHandsStats.trained +
            (currentTrainedHandStatus === TrainedHandStatus.untrained ? 1 : 0)
    };
};

export const getNextTrainingHands = (
    trainingHands: TrainingHands,
    isHit: boolean,
    handRepresentation: HandRepresentation,
    currentDealerSymbol: SimpleCardSymbol
): TrainingHands => {
    const nextFailedHands = getNextFailedHands(
        trainingHands.failed,
        isHit,
        handRepresentation,
        currentDealerSymbol!
    );

    // Call getNextTrainedHandsStats before getNextTrainedHands, since the later
    // will modify trainedHands[handRepresentation][currentDealerSymbol!]
    const nextTrainedHandsStats = getNextTrainedHandsStats(
        trainingHands.stats,
        isHit,
        trainingHands.trained[handRepresentation][currentDealerSymbol!]
    );

    const nextTrainedHands = getNextTrainedHands(
        trainingHands.trained,
        isHit,
        handRepresentation,
        currentDealerSymbol!
    );

    return {
        failed: nextFailedHands,
        stats: nextTrainedHandsStats,
        trained: nextTrainedHands
    };
};
