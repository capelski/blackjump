export interface CasinoRules {
    [CasinoRulesKeys.doubleAfterSplit]: boolean;
    [CasinoRulesKeys.doubling]: Doubling;
    [CasinoRulesKeys.surrender]: boolean;
}

export enum CasinoRulesKeys {
    doubleAfterSplit = 'Double after split',
    doubling = 'Doubling',
    surrender = 'Surrender'
}

export enum Doubling {
    none = 0,
    tenToEleven = 1,
    nineToEleven = 2,
    nineToElevenSoft = 3,
    anyPair = 4
}
