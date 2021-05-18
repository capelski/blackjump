export interface CasinoRules {
    [CasinoRulesKeys.blackjackPeek]: boolean;
    [CasinoRulesKeys.doubleAfterSplit]: boolean;
    [CasinoRulesKeys.doubling]: Doubling;
    [CasinoRulesKeys.hitSplitAces]: boolean;
    [CasinoRulesKeys.holeCard]: boolean;
    [CasinoRulesKeys.splitsNumber]: SplitsNumber;
    [CasinoRulesKeys.surrender]: boolean;
}

export enum CasinoRulesKeys {
    blackjackPeek = 'Blackjack Peek',
    doubleAfterSplit = 'Double after split',
    doubling = 'Doubling',
    hitSplitAces = 'Hit split aces',
    holeCard = 'Hole card',
    splitsNumber = 'Splits number',
    surrender = 'Surrender'
}

export enum Doubling {
    none = 0,
    tenToEleven = 1,
    nineToEleven = 2,
    nineToElevenSoft = 3,
    anyPair = 4
}

export enum SplitsNumber {
    none = 0,
    one = 1,
    two = 2,
    three = 3,
    unlimited = 4
}
