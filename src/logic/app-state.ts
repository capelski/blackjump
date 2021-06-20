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
import { resolvePlayerEarnings } from './player';

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

        const playerEarnings = resolvePlayerEarnings(player, nextDealerHand);
        const nextCash = player.cash + playerEarnings;
        const nextEarningsHistorical = player.earningsHistorical.concat([nextCash]);
        const nextPlayer: Player = {
            ...player,
            cash: nextCash,
            earningsHistorical: nextEarningsHistorical
        };

        setPlayer(nextPlayer);
        setPhase(Phases.finished);

        updatePlayerEarnings(nextCash);
        updatePlayerEarningsHistorical(nextEarningsHistorical);
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
