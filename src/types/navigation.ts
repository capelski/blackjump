import { Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TrainingHand } from './training-hand';

export type AppNavigation = StackNavigationProp<RouteParams>;

export type AppRoute<T extends RouteNames> = Route<T, RouteParams[T]>;

export enum RouteNames {
  basicStrategyTable = 'basicStrategyTable',
  blackjackPeek = 'blackjackPeek',
  configMenu = 'configMenu',
  earningsChart = 'earningsChart',
  handDecisions = 'handDecisions',
  hitSplitAces = 'hitSplitAces',
  missedPairs = 'missedPairs',
  onboarding = 'onboarding',
  table = 'table',
  trainingCompleted = 'trainingCompleted',
  trainingPairs = 'trainingPairs',
  untrainedPairsPriority = 'untrainedPairsPriority',
}

export const initialRouteName = RouteNames.table;

export type RouteParams = {
  [RouteNames.basicStrategyTable]: undefined;
  [RouteNames.blackjackPeek]: undefined;
  [RouteNames.configMenu]: undefined;
  [RouteNames.earningsChart]: undefined;
  [RouteNames.handDecisions]: {
    trainingHand: TrainingHand;
  };
  [RouteNames.hitSplitAces]: undefined;
  [RouteNames.missedPairs]: undefined;
  [RouteNames.onboarding]: undefined;
  [RouteNames.table]: undefined;
  [RouteNames.trainingCompleted]: undefined;
  [RouteNames.trainingPairs]: undefined;
  [RouteNames.untrainedPairsPriority]: undefined;
};
