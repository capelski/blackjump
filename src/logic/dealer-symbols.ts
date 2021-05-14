import { SimpleCardSymbol, TrainingHandStatus, TrainingPairStatus } from '../types';
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

export const getUntrainedDealerSymbols = (trainingHandStatus: TrainingHandStatus) =>
    getObjectKeys(trainingHandStatus).filter(
        (dealerSymbol) => trainingHandStatus[dealerSymbol] !== TrainingPairStatus.passed
    );
