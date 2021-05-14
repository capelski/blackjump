import { updatePlayerEarnings } from '../async-storage';
import {
    FailedHand,
    GameConfig,
    Hand,
    HandCode,
    Phases,
    Player,
    SimpleCardSymbol,
    TrainedHandsStats,
    TrainingHandStatus,
    TrainingProgress,
    TrainingStatus
} from '../types';
import { getRandomCard } from './card';
import { getHandEffectiveValue, dealCard } from './hand';
import { resolveHands } from './player';
import { isTrainingCompleted } from './training-status';

export const handleDealerTurn = (
    dealerHand: Hand,
    gameConfig: GameConfig,
    player: Player,
    setDealerHand: (dealerHand: Hand) => void,
    setPhase: (phase: Phases) => void,
    setPlayer: (player: Player) => void
) => {
    if (gameConfig.isDealerAnimationEnabled && getHandEffectiveValue(dealerHand) < 17) {
        setTimeout(() => {
            dealCard(dealerHand, getRandomCard());
            setDealerHand({ ...dealerHand });
        }, 1000);
    } else {
        let nextDealerHand = { ...dealerHand };
        if (!gameConfig.isDealerAnimationEnabled) {
            while (getHandEffectiveValue(nextDealerHand) < 17) {
                dealCard(nextDealerHand, getRandomCard());
            }
            setDealerHand(nextDealerHand);
        }

        resolveHands(player, nextDealerHand);
        setPlayer({ ...player });
        updatePlayerEarnings(player.cash);
        setPhase(Phases.finished);
    }
};

const getNextFailedHands = (
    currentFailedHands: FailedHand[],
    isHit: boolean,
    handCode: HandCode,
    currentDealerSymbol: SimpleCardSymbol
): FailedHand[] => {
    return isHit
        ? currentFailedHands.filter(
              (failedHand) =>
                  failedHand.dealerSymbol !== currentDealerSymbol ||
                  failedHand.handCode !== handCode
          )
        : currentFailedHands.some(
              (failedHand) =>
                  failedHand.dealerSymbol === currentDealerSymbol &&
                  failedHand.handCode === handCode
          )
        ? currentFailedHands
        : [{ dealerSymbol: currentDealerSymbol, handCode }].concat(currentFailedHands);
};

const getNextTrainingProgress = (
    trainingProgress: TrainingProgress,
    isHit: boolean,
    handCode: HandCode,
    currentDealerSymbol: SimpleCardSymbol
) => {
    const nextTrainingProgress: TrainingProgress = { ...trainingProgress };

    nextTrainingProgress[handCode][currentDealerSymbol] = isHit
        ? TrainingHandStatus.passed
        : TrainingHandStatus.failed;

    return nextTrainingProgress;
};

const getNextTrainedHandsStats = (
    trainedHandsStats: TrainedHandsStats,
    isHit: boolean,
    currentHandTrainingStatus: TrainingHandStatus
): TrainedHandsStats => {
    return {
        passed:
            trainedHandsStats.passed +
            (isHit && currentHandTrainingStatus !== TrainingHandStatus.passed
                ? 1
                : !isHit && currentHandTrainingStatus === TrainingHandStatus.passed
                ? -1
                : 0),
        trained:
            trainedHandsStats.trained +
            (currentHandTrainingStatus === TrainingHandStatus.untrained ? 1 : 0)
    };
};

export const getNextTrainingStatus = (
    trainingStatus: TrainingStatus,
    isHit: boolean,
    currentHandCode: HandCode,
    currentDealerSymbol: SimpleCardSymbol
): TrainingStatus => {
    // getNextTrainingProgress will modify trainingStatus.progress[handCode][currentDealerSymbol]
    // we need to keep the old value for getNextTrainedHandsStats
    const currentHandTrainingStatus = trainingStatus.progress[currentHandCode][currentDealerSymbol];

    const nextFailedHands = getNextFailedHands(
        trainingStatus.failedHands,
        isHit,
        currentHandCode,
        currentDealerSymbol
    );

    const nextTrainedHandsStats = getNextTrainedHandsStats(
        trainingStatus.stats,
        isHit,
        currentHandTrainingStatus
    );

    const nextTrainingProgress = getNextTrainingProgress(
        trainingStatus.progress,
        isHit,
        currentHandCode,
        currentDealerSymbol
    );

    return {
        failedHands: nextFailedHands,
        isCompleted: isTrainingCompleted(nextTrainedHandsStats),
        progress: nextTrainingProgress,
        stats: nextTrainedHandsStats
    };
};
