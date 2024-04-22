import { CasinoRules } from './casino-rules';
import { Dictionary } from './dictionary';
import { HandCode } from './hand';

export interface GameConfig {
  casinoRules: CasinoRules;
  isDealerAnimationEnabled: boolean;
  isSoundEnabled: boolean;
  selectedHands: SelectedHands;
  selectedHandsOnly: boolean;
  untrainedPairsPriority: boolean;
}

export type SelectedHands = Dictionary<boolean, HandCode>;
