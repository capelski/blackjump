import { SimpleCardSymbol, TrainingHandStatus, TrainingPairStatus } from '../types';
import { getObjectKeys } from '../utils';

export const allDealerSymbols: SimpleCardSymbol[] = [
  SimpleCardSymbol.Two,
  SimpleCardSymbol.Three,
  SimpleCardSymbol.Four,
  SimpleCardSymbol.Five,
  SimpleCardSymbol.Six,
  SimpleCardSymbol.Seven,
  SimpleCardSymbol.Eight,
  SimpleCardSymbol.Nine,
  SimpleCardSymbol.Ten,
  SimpleCardSymbol.Ace,
];

export const getUntrainedDealerSymbols = (trainingHandStatus: TrainingHandStatus) =>
  getObjectKeys(trainingHandStatus).filter(
    (dealerSymbol) => trainingHandStatus[dealerSymbol] !== TrainingPairStatus.passed,
  );
