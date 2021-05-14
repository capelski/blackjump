import { DealerSymbols, SimpleCardSymbol, TrainingHandStatus } from '../types';
import { getObjectKeys } from '../utils';

export const allDealerSymbols: SimpleCardSymbol[] = [
    SimpleCardSymbol.Ace,
    SimpleCardSymbol.Two,
    SimpleCardSymbol.Three,
    SimpleCardSymbol.Four,
    SimpleCardSymbol.Five,
    SimpleCardSymbol.Six,
    SimpleCardSymbol.Seven,
    SimpleCardSymbol.Eight,
    SimpleCardSymbol.Nine,
    SimpleCardSymbol.Ten
];

export const getUntrainedDealerSymbols = (dealerSymbols: DealerSymbols) =>
    getObjectKeys(dealerSymbols).filter(
        (dealerSymbol) => dealerSymbols[dealerSymbol] !== TrainingHandStatus.passed
    );
