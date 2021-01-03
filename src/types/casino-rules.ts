export interface CasinoRules {
    [CasinoRulesKeys.canDoubleAfterSplit]: boolean;
    [CasinoRulesKeys.canDoubleOnAnyInitialHand]: boolean;
    [CasinoRulesKeys.canSurrender]: boolean;
}

export enum CasinoRulesKeys {
    canDoubleAfterSplit = 'Can double after split',
    canDoubleOnAnyInitialHand = 'Can double on any initial hand',
    canSurrender = 'Can surrender'
}
