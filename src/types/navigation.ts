import { Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HandRepresentation } from './hand';

export type AppNavigation = StackNavigationProp<RouteParams>;

export type AppRoute<T extends RouteNames> = Route<T, RouteParams[T]>;

export enum RouteNames {
    blueCardsInfo = 'blueCardsInfo',
    configMenu = 'configMenu',
    goldHandsInfo = 'goldHandsInfo',
    goldHandsLevelsInfo = 'goldHandsLevelsInfo',
    handDecisions = 'decisions',
    table = 'table',
    trainingHands = 'trainingHands'
}

export type RouteParams = {
    [RouteNames.blueCardsInfo]: undefined;
    [RouteNames.configMenu]: undefined;
    [RouteNames.goldHandsInfo]: undefined;
    [RouteNames.goldHandsLevelsInfo]: undefined;
    [RouteNames.handDecisions]: {
        handRepresentation: HandRepresentation;
    };
    [RouteNames.table]: undefined;
    [RouteNames.trainingHands]: undefined;
};
