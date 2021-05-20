import { BaseDecisions, Dictionary, DynamicDecisions, PlayerDecisions } from './types';

export const doubleColor = '#a1a669';
export const hitColor = '#428bca';
export const splitColor = '#5cb85c';
export const standColor = '#46b8da';
export const surrenderColor = '#8f6088';

export const dangerColor = '#dc3545';
export const warningColor = '#ffc107';

export const tableColor = '#088446';

export const colors: Dictionary<string, BaseDecisions | DynamicDecisions | PlayerDecisions> = {
    [BaseDecisions.hit]: hitColor,
    [BaseDecisions.stand]: standColor,
    [DynamicDecisions.double_hit]: doubleColor,
    [DynamicDecisions.double_stand]: doubleColor,
    [DynamicDecisions.split_hit]: splitColor,
    [DynamicDecisions.split_stand]: splitColor,
    [DynamicDecisions.surrender_hit]: surrenderColor,
    [PlayerDecisions.double]: doubleColor,
    [PlayerDecisions.split]: splitColor,
    [PlayerDecisions.surrender]: surrenderColor
};
