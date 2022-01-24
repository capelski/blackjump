export interface CasinoRules {
    [CasinoRulesKeys.blackjackPeek]: boolean;
    [CasinoRulesKeys.dealerHitsSoft17]: boolean;
    [CasinoRulesKeys.doubling]: Doubling;
    [CasinoRulesKeys.doublingAfterSplit]: boolean;
    [CasinoRulesKeys.hitSplitAces]: boolean;
    [CasinoRulesKeys.splitsNumber]: SplitsNumber;
    [CasinoRulesKeys.surrender]: boolean;
}

export enum CasinoRulesKeys {
    blackjackPeek = 'Blackjack Peek',
    dealerHitsSoft17 = 'Dealer hits soft 17',
    doubling = 'Doubling',
    doublingAfterSplit = 'Doubling after split',
    hitSplitAces = 'Hit split aces',
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
    three = 3
}
