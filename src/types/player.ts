import { Hand, HandCode } from './hand';

export interface Player {
  cash: number;
  earningsHistorical: number[];
  handIndex: number;
  hands: Hand[];
  lastActionHand?: HandCode;
}
