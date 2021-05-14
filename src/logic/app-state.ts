import { updatePlayerEarnings } from '../async-storage';
import {
    FailedHand,
    GameConfig,
    Hand,
    HandRepresentation,
    Phases,
    Player,
    SimpleCardSymbol,
    TrainedHandsStats,
    TrainedHandStatus,
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

const getNextTrainingProgress = (
    trainingProgress: TrainingProgress,
    isHit: boolean,
    handRepresentation: HandRepresentation,
    currentDealerSymbol: SimpleCardSymbol
) => {
    const nextTrainingProgress: TrainingProgress = { ...trainingProgress };

    nextTrainingProgress[handRepresentation][currentDealerSymbol] = isHit
        ? TrainedHandStatus.passed
        : TrainedHandStatus.failed;

    return nextTrainingProgress;
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

export const getNextTrainingStatus = (
    trainingStatus: TrainingStatus,
    isHit: boolean,
    handRepresentation: HandRepresentation,
    currentDealerSymbol: SimpleCardSymbol
): TrainingStatus => {
    const nextFailedHands = getNextFailedHands(
        trainingStatus.failed,
        isHit,
        handRepresentation,
        currentDealerSymbol!
    );

    // Call getNextTrainedHandsStats before getNextTrainedHands, since the later
    // will modify trainedHands[handRepresentation][currentDealerSymbol!]
    const nextTrainedHandsStats = getNextTrainedHandsStats(
        trainingStatus.stats,
        isHit,
        trainingStatus.progress[handRepresentation][currentDealerSymbol!]
    );

    const nextTrainedHands = getNextTrainingProgress(
        trainingStatus.progress,
        isHit,
        handRepresentation,
        currentDealerSymbol!
    );

    return {
        failed: nextFailedHands,
        isCompleted: isTrainingCompleted(nextTrainedHandsStats),
        stats: nextTrainedHandsStats,
        progress: nextTrainedHands
    };
};
