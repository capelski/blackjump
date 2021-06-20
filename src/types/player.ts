import { Hand, HandCode } from './hand';

export interface Player {
    cash: number;
    earningsHistorical: CashOperation[];
    handIndex: number;
    hands: Hand[];
    lastActionHand?: HandCode;
}

export interface CashOperation {
    isBasicStrategyHit: boolean;
    isNonRandomHand: boolean;
    resultingCash: number;
}
