export interface CasinoRules {
    [CasinoRulesKeys.doubleAfterSplit]: boolean;
    [CasinoRulesKeys.doubleOnlyOn_9_10_11]: boolean;
    [CasinoRulesKeys.surrender]: boolean;
}

export enum CasinoRulesKeys {
    doubleAfterSplit = 'Double after split',
    doubleOnlyOn_9_10_11 = 'Double only on 9/10/11',
    surrender = 'Surrender'
}
