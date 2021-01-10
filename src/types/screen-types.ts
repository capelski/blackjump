import { Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HandRepresentation } from './hand';

// TODO Rename to RouteName
export enum ScreenTypes {
    blueCardsInfo = 'blueCardsInfo',
    configMenu = 'configMenu',
    goldHandsInfo = 'goldHandsInfo',
    goldHandsLevelsInfo = 'goldHandsLevelsInfo',
    handDecisions = 'decisions',
    table = 'table',
    trainingHands = 'trainingHands'
}

export type RouteParams = {
    [ScreenTypes.blueCardsInfo]: undefined;
    [ScreenTypes.configMenu]: undefined;
    [ScreenTypes.goldHandsInfo]: undefined;
    [ScreenTypes.goldHandsLevelsInfo]: undefined;
    [ScreenTypes.handDecisions]: {
        handRepresentation: HandRepresentation;
    };
    [ScreenTypes.table]: undefined;
    [ScreenTypes.trainingHands]: undefined;
};

export interface NavigationProps<T extends ScreenTypes> {
    navigation: StackNavigationProp<RouteParams>;
    route: Route<T, RouteParams[T]>;
}
