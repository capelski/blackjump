import { updatePlayerEarnings } from '../async-storage';
import {
    GameConfig,
    Hand,
    HandCode,
    Phases,
    Player,
    SimpleCardSymbol,
    TrainingPairRepresentation,
    TrainingPairStatus,
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

const getNextFailedTrainingPairs = (
    currentFailedTrainingPairs: TrainingPairRepresentation[],
    isHit: boolean,
    handCode: HandCode,
    currentDealerSymbol: SimpleCardSymbol
): TrainingPairRepresentation[] => {
    return isHit
        ? currentFailedTrainingPairs.filter(
              (failedTrainingPair) =>
                  failedTrainingPair.dealerSymbol !== currentDealerSymbol ||
                  failedTrainingPair.handCode !== handCode
          )
        : currentFailedTrainingPairs.some(
              (failedTrainingPair) =>
                  failedTrainingPair.dealerSymbol === currentDealerSymbol &&
                  failedTrainingPair.handCode === handCode
          )
        ? currentFailedTrainingPairs
        : [{ dealerSymbol: currentDealerSymbol, handCode }].concat(currentFailedTrainingPairs);
};

export const getNextTrainingStatus = (
    trainingStatus: TrainingStatus,
    isHit: boolean,
    currentHandCode: HandCode,
    currentDealerSymbol: SimpleCardSymbol
): TrainingStatus => {
    // The current trainingStatus.progress[handCode][currentDealerSymbol]
    // value must be kept to update attemptedHands and passedHands
    const currentHandTrainingStatus = trainingStatus.progress[currentHandCode][currentDealerSymbol];

    trainingStatus.progress[currentHandCode][currentDealerSymbol] = isHit
        ? TrainingPairStatus.passed
        : TrainingPairStatus.failed;

    const nextAttemptedHands =
        trainingStatus.attemptedHands +
        (currentHandTrainingStatus === TrainingPairStatus.untrained ? 1 : 0);

    const nextFailedTrainingPairs = getNextFailedTrainingPairs(
        trainingStatus.failedTrainingPairs,
        isHit,
        currentHandCode,
        currentDealerSymbol
    );

    const nextPassedHands =
        trainingStatus.passedHands +
        (isHit && currentHandTrainingStatus !== TrainingPairStatus.passed
            ? 1
            : !isHit && currentHandTrainingStatus === TrainingPairStatus.passed
            ? -1
            : 0);

    return {
        attemptedHands: nextAttemptedHands,
        failedTrainingPairs: nextFailedTrainingPairs,
        isCompleted: isTrainingCompleted(nextPassedHands),
        passedHands: nextPassedHands,
        progress: trainingStatus.progress
    };
};
