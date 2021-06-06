import { updatePlayerEarnings } from '../async-storage';
import {
    CasinoRules,
    CasinoRulesKeys,
    GameConfig,
    Hand,
    HandCode,
    Phases,
    Player,
    SimpleCardSymbol,
    TrainingHands,
    TrainingPairRepresentation,
    TrainingPairStatus,
    TrainingStatus
} from '../types';
import { getRandomCard } from './card';
import {
    dealCard,
    getHandEffectiveValue,
    getHandValidValues,
    hasHoleCard,
    revealDealerHoleCard
} from './hand';
import { resolveHands } from './player';
import { getIsProgressBlocked, isTrainingCompleted } from './training-status';

export const handleDealerTurn = (
    dealerHand: Hand,
    gameConfig: GameConfig,
    player: Player,
    setDealerHand: (dealerHand: Hand) => void,
    setPhase: (phase: Phases) => void,
    setPlayer: (player: Player) => void
) => {
    let nextDealerHand = { ...dealerHand };

    if (
        gameConfig.isDealerAnimationEnabled &&
        mustDealerDraw(nextDealerHand, gameConfig.casinoRules)
    ) {
        setTimeout(() => {
            if (hasHoleCard(dealerHand)) {
                revealDealerHoleCard(nextDealerHand);
            } else {
                dealCard(nextDealerHand, getRandomCard());
            }
            setDealerHand(nextDealerHand);
            // Setting the dealerHand will trigger this handler again, through useEffect
        }, 1000);
    } else {
        if (!gameConfig.isDealerAnimationEnabled) {
            if (hasHoleCard(dealerHand)) {
                revealDealerHoleCard(nextDealerHand);
            }

            while (mustDealerDraw(nextDealerHand, gameConfig.casinoRules)) {
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

const mustDealerDraw = (dealerHand: Hand, casinoRules: CasinoRules) => {
    const handEffectiveValue = getHandEffectiveValue(dealerHand);
    return (
        handEffectiveValue < 17 ||
        (casinoRules[CasinoRulesKeys.dealerHitsSoft17] &&
            getHandValidValues(dealerHand).length > 1 &&
            handEffectiveValue === 17)
    );
};
