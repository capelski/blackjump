import { updatePlayerEarnings, updatePlayerEarningsHistorical } from '../async-storage';
import { CasinoRules, CasinoRulesKeys, GameConfig, Hand, Phases, Player } from '../types';
import { getRandomCard } from './card';
import {
    dealCard,
    getHandEffectiveValue,
    getHandValidValues,
    hasHoleCard,
    revealDealerHoleCard
} from './hand';
import { resolveHands } from './player';

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
        updatePlayerEarningsHistorical(player.earningsHistorical);
        setPhase(Phases.finished);
    }
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
