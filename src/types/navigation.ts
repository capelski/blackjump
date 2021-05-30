import { Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TrainingHand } from './training-hand';

export type AppNavigation = StackNavigationProp<RouteParams>;

export type AppRoute<T extends RouteNames> = Route<T, RouteParams[T]>;

export enum RouteNames {
    basicStrategyTable = 'basicStrategyTable',
    blueCardsInfo = 'blueCardsInfo',
    configMenu = 'configMenu',
    goldHandsInfo = 'goldHandsInfo',
    goldHandsLevelsInfo = 'goldHandsLevelsInfo',
    handDecisions = 'handDecisions',
    missedPairs = 'missedPairs',
    onboarding = 'onboarding',
    table = 'table',
    trainingCompleted = 'trainingCompleted',
    trainingPairs = 'trainingPairs'
}

export const initialRouteName = RouteNames.table;

export type RouteParams = {
    [RouteNames.basicStrategyTable]: undefined;
    [RouteNames.blueCardsInfo]: undefined;
    [RouteNames.configMenu]: undefined;
    [RouteNames.goldHandsInfo]: undefined;
    [RouteNames.goldHandsLevelsInfo]: undefined;
    [RouteNames.handDecisions]: {
        trainingHand: TrainingHand;
    };
    [RouteNames.missedPairs]: undefined;
    [RouteNames.onboarding]: undefined;
    [RouteNames.table]: undefined;
    [RouteNames.trainingCompleted]: undefined;
    [RouteNames.trainingPairs]: undefined;
};
