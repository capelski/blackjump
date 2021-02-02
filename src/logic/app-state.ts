import {
    FailedHand,
    HandRepresentation,
    SimpleCardSymbol,
    TrainedHands,
    TrainedHandStatus,
    TrainedHandsStats
} from '../types';

export const getNextFailedHands = (
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

export const getNextTrainedHands = (
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

export const getNextTrainedHandsStats = (
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
