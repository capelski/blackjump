export interface CasinoRules {
    [CasinoRulesKeys.blackjackPeek]: boolean;
    [CasinoRulesKeys.doubleAfterSplit]: boolean;
    [CasinoRulesKeys.doubling]: Doubling;
    [CasinoRulesKeys.holeCard]: boolean;
    [CasinoRulesKeys.surrender]: boolean;
}

export enum CasinoRulesKeys {
    blackjackPeek = 'Blackjack Peek',
    doubleAfterSplit = 'Double after split',
    doubling = 'Doubling',
    holeCard = 'Hole card',
    surrender = 'Surrender'
}

export enum Doubling {
    none = 0,
    tenToEleven = 1,
    nineToEleven = 2,
    nineToElevenSoft = 3,
    anyPair = 4
}
