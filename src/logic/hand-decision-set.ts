import {
    BaseDecisions,
    CasinoRulesKeys,
    Doubling,
    DynamicDecisions,
    HandCode,
    HandDecisionSet,
    HandDecisionSetGetters,
    SimpleCardSymbol,
    SplitsNumber
} from '../types';

const alwaysHit: HandDecisionSet = {
    [SimpleCardSymbol.Two]: BaseDecisions.hit,
    [SimpleCardSymbol.Three]: BaseDecisions.hit,
    [SimpleCardSymbol.Four]: BaseDecisions.hit,
    [SimpleCardSymbol.Five]: BaseDecisions.hit,
    [SimpleCardSymbol.Six]: BaseDecisions.hit,
    [SimpleCardSymbol.Seven]: BaseDecisions.hit,
    [SimpleCardSymbol.Eight]: BaseDecisions.hit,
    [SimpleCardSymbol.Nine]: BaseDecisions.hit,
    [SimpleCardSymbol.Ten]: BaseDecisions.hit,
    [SimpleCardSymbol.Ace]: BaseDecisions.hit
};

const alwaysStand: HandDecisionSet = {
    [SimpleCardSymbol.Two]: BaseDecisions.stand,
    [SimpleCardSymbol.Three]: BaseDecisions.stand,
    [SimpleCardSymbol.Four]: BaseDecisions.stand,
    [SimpleCardSymbol.Five]: BaseDecisions.stand,
    [SimpleCardSymbol.Six]: BaseDecisions.stand,
    [SimpleCardSymbol.Seven]: BaseDecisions.stand,
    [SimpleCardSymbol.Eight]: BaseDecisions.stand,
    [SimpleCardSymbol.Nine]: BaseDecisions.stand,
    [SimpleCardSymbol.Ten]: BaseDecisions.stand,
    [SimpleCardSymbol.Ace]: BaseDecisions.stand
};

export const getHandRangesNumber = (decisionSet: HandDecisionSet) =>
    Object.values(decisionSet).reduce<{
        previousValue: string;
        ranges: number;
    }>(
        (reduced, next) => {
            return reduced.previousValue === next
                ? reduced
                : { previousValue: next, ranges: reduced.ranges + 1 };
        },
        {
            previousValue: '',
            ranges: 0
        }
    ).ranges;

export const handDecisionSetGetters: HandDecisionSetGetters = {
    [HandCode.Split2s]: (casinoRules) => ({
        [SimpleCardSymbol.Two]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none &&
            casinoRules[CasinoRulesKeys.doublingAfterSplit]
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Three]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none &&
            casinoRules[CasinoRulesKeys.doublingAfterSplit]
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Four]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Five]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Six]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Seven]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Eight]: BaseDecisions.hit,
        [SimpleCardSymbol.Nine]: BaseDecisions.hit,
        [SimpleCardSymbol.Ten]: BaseDecisions.hit,
        [SimpleCardSymbol.Ace]:
            casinoRules[CasinoRulesKeys.surrender] &&
            !casinoRules[CasinoRulesKeys.blackjackPeek] &&
            casinoRules[CasinoRulesKeys.dealerHitsSoft17]
                ? DynamicDecisions.surrender_hit
                : BaseDecisions.hit
    }),
    [HandCode.Split3s]: (casinoRules) => ({
        [SimpleCardSymbol.Two]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none &&
            casinoRules[CasinoRulesKeys.doublingAfterSplit]
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Three]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none &&
            casinoRules[CasinoRulesKeys.doublingAfterSplit]
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Four]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Five]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Six]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Seven]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Eight]: BaseDecisions.hit,
        [SimpleCardSymbol.Nine]: BaseDecisions.hit,
        [SimpleCardSymbol.Ten]: BaseDecisions.hit,
        [SimpleCardSymbol.Ace]:
            casinoRules[CasinoRulesKeys.surrender] && !casinoRules[CasinoRulesKeys.blackjackPeek]
                ? DynamicDecisions.surrender_hit
                : BaseDecisions.hit
    }),
    [HandCode.Split4s]: (casinoRules) => ({
        [SimpleCardSymbol.Two]: BaseDecisions.hit,
        [SimpleCardSymbol.Three]: BaseDecisions.hit,
        [SimpleCardSymbol.Four]: BaseDecisions.hit,
        [SimpleCardSymbol.Five]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none &&
            casinoRules[CasinoRulesKeys.doublingAfterSplit]
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Six]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none &&
            casinoRules[CasinoRulesKeys.doublingAfterSplit]
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Seven]: BaseDecisions.hit,
        [SimpleCardSymbol.Eight]: BaseDecisions.hit,
        [SimpleCardSymbol.Nine]: BaseDecisions.hit,
        [SimpleCardSymbol.Ten]: BaseDecisions.hit,
        [SimpleCardSymbol.Ace]: BaseDecisions.hit
    }),
    [HandCode.Split5s]: (casinoRules) => ({
        [SimpleCardSymbol.Two]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Three]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Four]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Five]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Six]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Seven]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Eight]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Nine]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Ten]: BaseDecisions.hit,
        [SimpleCardSymbol.Ace]: BaseDecisions.hit
    }),
    [HandCode.Split6s]: (casinoRules) => ({
        [SimpleCardSymbol.Two]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none &&
            casinoRules[CasinoRulesKeys.doublingAfterSplit]
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Three]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Four]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Five]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Six]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Seven]: BaseDecisions.hit,
        [SimpleCardSymbol.Eight]: BaseDecisions.hit,
        [SimpleCardSymbol.Nine]: BaseDecisions.hit,
        [SimpleCardSymbol.Ten]: BaseDecisions.hit,
        [SimpleCardSymbol.Ace]:
            casinoRules[CasinoRulesKeys.surrender] && !casinoRules[CasinoRulesKeys.blackjackPeek]
                ? DynamicDecisions.surrender_hit
                : BaseDecisions.hit
    }),
    [HandCode.Split7s]: (casinoRules) => ({
        [SimpleCardSymbol.Two]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Three]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Four]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Five]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Six]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Seven]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Eight]: BaseDecisions.hit,
        [SimpleCardSymbol.Nine]: BaseDecisions.hit,
        [SimpleCardSymbol.Ten]:
            casinoRules[CasinoRulesKeys.surrender] && !casinoRules[CasinoRulesKeys.blackjackPeek]
                ? DynamicDecisions.surrender_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Ace]:
            casinoRules[CasinoRulesKeys.surrender] && !casinoRules[CasinoRulesKeys.blackjackPeek]
                ? DynamicDecisions.surrender_hit
                : BaseDecisions.hit
    }),
    [HandCode.Split8s]: (casinoRules) => ({
        [SimpleCardSymbol.Two]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Three]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Four]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Five]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Six]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Seven]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Eight]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Nine]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? casinoRules[CasinoRulesKeys.surrender]
                    ? DynamicDecisions.split_surrender_hit
                    : DynamicDecisions.split_hit
                : casinoRules[CasinoRulesKeys.surrender]
                ? DynamicDecisions.surrender_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Ten]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none &&
            casinoRules[CasinoRulesKeys.blackjackPeek]
                ? casinoRules[CasinoRulesKeys.surrender]
                    ? DynamicDecisions.split_surrender_hit
                    : DynamicDecisions.split_hit
                : casinoRules[CasinoRulesKeys.surrender]
                ? DynamicDecisions.surrender_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Ace]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none &&
            casinoRules[CasinoRulesKeys.blackjackPeek]
                ? casinoRules[CasinoRulesKeys.surrender]
                    ? casinoRules[CasinoRulesKeys.dealerHitsSoft17]
                        ? DynamicDecisions.surrender_split_hit
                        : DynamicDecisions.split_surrender_hit
                    : DynamicDecisions.split_hit
                : casinoRules[CasinoRulesKeys.surrender]
                ? DynamicDecisions.surrender_hit
                : BaseDecisions.hit
    }),
    [HandCode.Split9s]: (casinoRules) => ({
        [SimpleCardSymbol.Two]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Three]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Four]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Five]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Six]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Seven]: BaseDecisions.stand,
        [SimpleCardSymbol.Eight]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Nine]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Ten]: BaseDecisions.stand,
        [SimpleCardSymbol.Ace]: BaseDecisions.stand
    }),
    [HandCode.Split10s]: () => alwaysStand,
    [HandCode.SplitAs]: (casinoRules) => ({
        [SimpleCardSymbol.Two]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Three]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Four]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Five]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Six]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Seven]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Eight]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Nine]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Ten]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Ace]:
            casinoRules[CasinoRulesKeys.splitsNumber] > SplitsNumber.none &&
            casinoRules[CasinoRulesKeys.blackjackPeek]
                ? DynamicDecisions.split_hit
                : BaseDecisions.hit
    }),
    [HandCode.Soft13]: (casinoRules) => ({
        [SimpleCardSymbol.Two]: BaseDecisions.hit,
        [SimpleCardSymbol.Three]: BaseDecisions.hit,
        [SimpleCardSymbol.Four]: BaseDecisions.hit,
        [SimpleCardSymbol.Five]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Six]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Seven]: BaseDecisions.hit,
        [SimpleCardSymbol.Eight]: BaseDecisions.hit,
        [SimpleCardSymbol.Nine]: BaseDecisions.hit,
        [SimpleCardSymbol.Ten]: BaseDecisions.hit,
        [SimpleCardSymbol.Ace]: BaseDecisions.hit
    }),
    [HandCode.Soft14]: (casinoRules) => ({
        [SimpleCardSymbol.Two]: BaseDecisions.hit,
        [SimpleCardSymbol.Three]: BaseDecisions.hit,
        [SimpleCardSymbol.Four]: BaseDecisions.hit,
        [SimpleCardSymbol.Five]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Six]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Seven]: BaseDecisions.hit,
        [SimpleCardSymbol.Eight]: BaseDecisions.hit,
        [SimpleCardSymbol.Nine]: BaseDecisions.hit,
        [SimpleCardSymbol.Ten]: BaseDecisions.hit,
        [SimpleCardSymbol.Ace]: BaseDecisions.hit
    }),
    [HandCode.Soft15]: (casinoRules) => ({
        [SimpleCardSymbol.Two]: BaseDecisions.hit,
        [SimpleCardSymbol.Three]: BaseDecisions.hit,
        [SimpleCardSymbol.Four]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Five]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Six]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Seven]: BaseDecisions.hit,
        [SimpleCardSymbol.Eight]: BaseDecisions.hit,
        [SimpleCardSymbol.Nine]: BaseDecisions.hit,
        [SimpleCardSymbol.Ten]: BaseDecisions.hit,
        [SimpleCardSymbol.Ace]: BaseDecisions.hit
    }),
    [HandCode.Soft16]: (casinoRules) => ({
        [SimpleCardSymbol.Two]: BaseDecisions.hit,
        [SimpleCardSymbol.Three]: BaseDecisions.hit,
        [SimpleCardSymbol.Four]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Five]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Six]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Seven]: BaseDecisions.hit,
        [SimpleCardSymbol.Eight]: BaseDecisions.hit,
        [SimpleCardSymbol.Nine]: BaseDecisions.hit,
        [SimpleCardSymbol.Ten]: BaseDecisions.hit,
        [SimpleCardSymbol.Ace]: BaseDecisions.hit
    }),
    [HandCode.Soft17]: (casinoRules) => ({
        [SimpleCardSymbol.Two]: BaseDecisions.hit,
        [SimpleCardSymbol.Three]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Four]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Five]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Six]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Seven]: BaseDecisions.hit,
        [SimpleCardSymbol.Eight]: BaseDecisions.hit,
        [SimpleCardSymbol.Nine]: BaseDecisions.hit,
        [SimpleCardSymbol.Ten]: BaseDecisions.hit,
        [SimpleCardSymbol.Ace]: BaseDecisions.hit
    }),
    [HandCode.Soft18]: (casinoRules) => ({
        [SimpleCardSymbol.Two]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair &&
            casinoRules[CasinoRulesKeys.dealerHitsSoft17]
                ? DynamicDecisions.double_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Three]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Four]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Five]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Six]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.anyPair
                ? DynamicDecisions.double_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Seven]: BaseDecisions.stand,
        [SimpleCardSymbol.Eight]: BaseDecisions.stand,
        [SimpleCardSymbol.Nine]: BaseDecisions.hit,
        [SimpleCardSymbol.Ten]: BaseDecisions.hit,
        [SimpleCardSymbol.Ace]: BaseDecisions.hit
    }),
    [HandCode.Soft19]: (casinoRules) => ({
        [SimpleCardSymbol.Two]: BaseDecisions.stand,
        [SimpleCardSymbol.Three]: BaseDecisions.stand,
        [SimpleCardSymbol.Four]: BaseDecisions.stand,
        [SimpleCardSymbol.Five]: BaseDecisions.stand,
        [SimpleCardSymbol.Six]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.nineToElevenSoft &&
            casinoRules[CasinoRulesKeys.dealerHitsSoft17]
                ? DynamicDecisions.double_stand
                : BaseDecisions.stand,
        [SimpleCardSymbol.Seven]: BaseDecisions.stand,
        [SimpleCardSymbol.Eight]: BaseDecisions.stand,
        [SimpleCardSymbol.Nine]: BaseDecisions.stand,
        [SimpleCardSymbol.Ten]: BaseDecisions.stand,
        [SimpleCardSymbol.Ace]: BaseDecisions.stand
    }),
    [HandCode.Soft20]: () => alwaysStand,
    [HandCode.Hard5]: (casinoRules) => ({
        [SimpleCardSymbol.Two]: BaseDecisions.hit,
        [SimpleCardSymbol.Three]: BaseDecisions.hit,
        [SimpleCardSymbol.Four]: BaseDecisions.hit,
        [SimpleCardSymbol.Five]: BaseDecisions.hit,
        [SimpleCardSymbol.Six]: BaseDecisions.hit,
        [SimpleCardSymbol.Seven]: BaseDecisions.hit,
        [SimpleCardSymbol.Eight]: BaseDecisions.hit,
        [SimpleCardSymbol.Nine]: BaseDecisions.hit,
        [SimpleCardSymbol.Ten]: BaseDecisions.hit,
        [SimpleCardSymbol.Ace]:
            casinoRules[CasinoRulesKeys.surrender] && !casinoRules[CasinoRulesKeys.blackjackPeek]
                ? DynamicDecisions.surrender_hit
                : BaseDecisions.hit
    }),
    [HandCode.Hard6]: (casinoRules) => ({
        [SimpleCardSymbol.Two]: BaseDecisions.hit,
        [SimpleCardSymbol.Three]: BaseDecisions.hit,
        [SimpleCardSymbol.Four]: BaseDecisions.hit,
        [SimpleCardSymbol.Five]: BaseDecisions.hit,
        [SimpleCardSymbol.Six]: BaseDecisions.hit,
        [SimpleCardSymbol.Seven]: BaseDecisions.hit,
        [SimpleCardSymbol.Eight]: BaseDecisions.hit,
        [SimpleCardSymbol.Nine]: BaseDecisions.hit,
        [SimpleCardSymbol.Ten]: BaseDecisions.hit,
        [SimpleCardSymbol.Ace]:
            casinoRules[CasinoRulesKeys.surrender] && !casinoRules[CasinoRulesKeys.blackjackPeek]
                ? DynamicDecisions.surrender_hit
                : BaseDecisions.hit
    }),
    [HandCode.Hard7]: (casinoRules) => ({
        [SimpleCardSymbol.Two]: BaseDecisions.hit,
        [SimpleCardSymbol.Three]: BaseDecisions.hit,
        [SimpleCardSymbol.Four]: BaseDecisions.hit,
        [SimpleCardSymbol.Five]: BaseDecisions.hit,
        [SimpleCardSymbol.Six]: BaseDecisions.hit,
        [SimpleCardSymbol.Seven]: BaseDecisions.hit,
        [SimpleCardSymbol.Eight]: BaseDecisions.hit,
        [SimpleCardSymbol.Nine]: BaseDecisions.hit,
        [SimpleCardSymbol.Ten]: BaseDecisions.hit,
        [SimpleCardSymbol.Ace]:
            casinoRules[CasinoRulesKeys.surrender] && !casinoRules[CasinoRulesKeys.blackjackPeek]
                ? DynamicDecisions.surrender_hit
                : BaseDecisions.hit
    }),
    [HandCode.Hard8]: () => alwaysHit,
    [HandCode.Hard9]: (casinoRules) => ({
        [SimpleCardSymbol.Two]: BaseDecisions.hit,
        [SimpleCardSymbol.Three]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.nineToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Four]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.nineToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Five]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.nineToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Six]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.nineToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Seven]: BaseDecisions.hit,
        [SimpleCardSymbol.Eight]: BaseDecisions.hit,
        [SimpleCardSymbol.Nine]: BaseDecisions.hit,
        [SimpleCardSymbol.Ten]: BaseDecisions.hit,
        [SimpleCardSymbol.Ace]: BaseDecisions.hit
    }),
    [HandCode.Hard10]: (casinoRules) => ({
        [SimpleCardSymbol.Two]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Three]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Four]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Five]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Six]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Seven]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Eight]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Nine]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Ten]: BaseDecisions.hit,
        [SimpleCardSymbol.Ace]: BaseDecisions.hit
    }),
    [HandCode.Hard11]: (casinoRules) => ({
        [SimpleCardSymbol.Two]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Three]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Four]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Five]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Six]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Seven]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Eight]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Nine]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Ten]:
            casinoRules[CasinoRulesKeys.doubling] >= Doubling.tenToEleven &&
            casinoRules[CasinoRulesKeys.blackjackPeek]
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Ace]:
            casinoRules[CasinoRulesKeys.blackjackPeek] &&
            casinoRules[CasinoRulesKeys.dealerHitsSoft17]
                ? DynamicDecisions.double_hit
                : BaseDecisions.hit
    }),
    [HandCode.Hard12]: (casinoRules) => ({
        [SimpleCardSymbol.Two]: BaseDecisions.hit,
        [SimpleCardSymbol.Three]: BaseDecisions.hit,
        [SimpleCardSymbol.Four]: BaseDecisions.stand,
        [SimpleCardSymbol.Five]: BaseDecisions.stand,
        [SimpleCardSymbol.Six]: BaseDecisions.stand,
        [SimpleCardSymbol.Seven]: BaseDecisions.hit,
        [SimpleCardSymbol.Eight]: BaseDecisions.hit,
        [SimpleCardSymbol.Nine]: BaseDecisions.hit,
        [SimpleCardSymbol.Ten]: BaseDecisions.hit,
        [SimpleCardSymbol.Ace]:
            casinoRules[CasinoRulesKeys.surrender] && !casinoRules[CasinoRulesKeys.blackjackPeek]
                ? DynamicDecisions.surrender_hit
                : BaseDecisions.hit
    }),
    [HandCode.Hard13]: (casinoRules) => ({
        [SimpleCardSymbol.Two]: BaseDecisions.stand,
        [SimpleCardSymbol.Three]: BaseDecisions.stand,
        [SimpleCardSymbol.Four]: BaseDecisions.stand,
        [SimpleCardSymbol.Five]: BaseDecisions.stand,
        [SimpleCardSymbol.Six]: BaseDecisions.stand,
        [SimpleCardSymbol.Seven]: BaseDecisions.hit,
        [SimpleCardSymbol.Eight]: BaseDecisions.hit,
        [SimpleCardSymbol.Nine]: BaseDecisions.hit,
        [SimpleCardSymbol.Ten]: BaseDecisions.hit,
        [SimpleCardSymbol.Ace]:
            casinoRules[CasinoRulesKeys.surrender] && !casinoRules[CasinoRulesKeys.blackjackPeek]
                ? DynamicDecisions.surrender_hit
                : BaseDecisions.hit
    }),
    [HandCode.Hard14]: (casinoRules) => ({
        [SimpleCardSymbol.Two]: BaseDecisions.stand,
        [SimpleCardSymbol.Three]: BaseDecisions.stand,
        [SimpleCardSymbol.Four]: BaseDecisions.stand,
        [SimpleCardSymbol.Five]: BaseDecisions.stand,
        [SimpleCardSymbol.Six]: BaseDecisions.stand,
        [SimpleCardSymbol.Seven]: BaseDecisions.hit,
        [SimpleCardSymbol.Eight]: BaseDecisions.hit,
        [SimpleCardSymbol.Nine]: BaseDecisions.hit,
        [SimpleCardSymbol.Ten]:
            casinoRules[CasinoRulesKeys.surrender] && !casinoRules[CasinoRulesKeys.blackjackPeek]
                ? DynamicDecisions.surrender_hit
                : BaseDecisions.hit,
        [SimpleCardSymbol.Ace]:
            casinoRules[CasinoRulesKeys.surrender] && !casinoRules[CasinoRulesKeys.blackjackPeek]
                ? DynamicDecisions.surrender_hit
                : BaseDecisions.hit
    }),
    [HandCode.Hard15]: (casinoRules) => ({
        [SimpleCardSymbol.Two]: BaseDecisions.stand,
        [SimpleCardSymbol.Three]: BaseDecisions.stand,
        [SimpleCardSymbol.Four]: BaseDecisions.stand,
        [SimpleCardSymbol.Five]: BaseDecisions.stand,
        [SimpleCardSymbol.Six]: BaseDecisions.stand,
        [SimpleCardSymbol.Seven]: BaseDecisions.hit,
        [SimpleCardSymbol.Eight]: BaseDecisions.hit,
        [SimpleCardSymbol.Nine]: BaseDecisions.hit,
        [SimpleCardSymbol.Ten]: casinoRules[CasinoRulesKeys.surrender]
            ? DynamicDecisions.surrender_hit
            : BaseDecisions.hit,
        [SimpleCardSymbol.Ace]:
            casinoRules[CasinoRulesKeys.surrender] &&
            (!casinoRules[CasinoRulesKeys.blackjackPeek] ||
                casinoRules[CasinoRulesKeys.dealerHitsSoft17])
                ? DynamicDecisions.surrender_hit
                : BaseDecisions.hit
    }),
    [HandCode.Hard16]: (casinoRules) => ({
        [SimpleCardSymbol.Two]: BaseDecisions.stand,
        [SimpleCardSymbol.Three]: BaseDecisions.stand,
        [SimpleCardSymbol.Four]: BaseDecisions.stand,
        [SimpleCardSymbol.Five]: BaseDecisions.stand,
        [SimpleCardSymbol.Six]: BaseDecisions.stand,
        [SimpleCardSymbol.Seven]: BaseDecisions.hit,
        [SimpleCardSymbol.Eight]: BaseDecisions.hit,
        [SimpleCardSymbol.Nine]: casinoRules[CasinoRulesKeys.surrender]
            ? DynamicDecisions.surrender_hit
            : BaseDecisions.hit,
        [SimpleCardSymbol.Ten]: casinoRules[CasinoRulesKeys.surrender]
            ? DynamicDecisions.surrender_hit
            : BaseDecisions.hit,
        [SimpleCardSymbol.Ace]: casinoRules[CasinoRulesKeys.surrender]
            ? DynamicDecisions.surrender_hit
            : BaseDecisions.hit
    }),
    [HandCode.Hard17]: (casinoRules) => ({
        [SimpleCardSymbol.Two]: BaseDecisions.stand,
        [SimpleCardSymbol.Three]: BaseDecisions.stand,
        [SimpleCardSymbol.Four]: BaseDecisions.stand,
        [SimpleCardSymbol.Five]: BaseDecisions.stand,
        [SimpleCardSymbol.Six]: BaseDecisions.stand,
        [SimpleCardSymbol.Seven]: BaseDecisions.stand,
        [SimpleCardSymbol.Eight]: BaseDecisions.stand,
        [SimpleCardSymbol.Nine]: BaseDecisions.stand,
        [SimpleCardSymbol.Ten]: BaseDecisions.stand,
        [SimpleCardSymbol.Ace]:
            casinoRules[CasinoRulesKeys.surrender] &&
            (!casinoRules[CasinoRulesKeys.blackjackPeek] ||
                casinoRules[CasinoRulesKeys.dealerHitsSoft17])
                ? DynamicDecisions.surrender_stand
                : BaseDecisions.stand
    }),
    [HandCode.Hard18]: () => alwaysStand,
    [HandCode.Hard19]: () => alwaysStand,
    [HandCode.Hard20]: () => alwaysStand
};
