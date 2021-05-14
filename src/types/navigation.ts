import { Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HandCode } from './hand';

export type AppNavigation = StackNavigationProp<RouteParams>;

export type AppRoute<T extends RouteNames> = Route<T, RouteParams[T]>;

export enum RouteNames {
    blueCardsInfo = 'blueCardsInfo',
    configMenu = 'configMenu',
    failedHands = 'failedHands',
    goldHandsInfo = 'goldHandsInfo',
    goldHandsLevelsInfo = 'goldHandsLevelsInfo',
    handDecisions = 'handDecisions',
    onboarding = 'onboarding',
    table = 'table',
    trainingCompleted = 'trainingCompleted',
    trainingHands = 'trainingHands'
}

export const initialRouteName = RouteNames.table;

export type RouteParams = {
    [RouteNames.blueCardsInfo]: undefined;
    [RouteNames.configMenu]: undefined;
    [RouteNames.failedHands]: undefined;
    [RouteNames.goldHandsInfo]: undefined;
    [RouteNames.goldHandsLevelsInfo]: undefined;
    [RouteNames.handDecisions]: {
        handCode: HandCode;
    };
    [RouteNames.onboarding]: undefined;
    [RouteNames.table]: undefined;
    [RouteNames.trainingCompleted]: undefined;
    [RouteNames.trainingHands]: undefined;
};
