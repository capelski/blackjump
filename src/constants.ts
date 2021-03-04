import { BaseDecisions, DynamicDecisions, PlayerDecisions } from './types';

export const actionsHeight = 112;

export const doubleColor = '#ffc107';
export const hitColor = '#428bca';
export const splitColor = '#5cb85c';
export const standColor = '#46b8da';
export const surrenderColor = '#dc3545';

export const tableColor = '#088446';

export const colors = {
    [BaseDecisions.hit]: hitColor,
    [BaseDecisions.split]: splitColor,
    [BaseDecisions.stand]: standColor,
    [DynamicDecisions.double_hit]: '#A1A669',
    [DynamicDecisions.double_stand]: '#A3BD71',
    [DynamicDecisions.surrender_hit]: '#8F6088',
    [PlayerDecisions.double]: doubleColor,
    [PlayerDecisions.surrender]: surrenderColor
};

export const configBarHeight = 48;

export const tableCenterHeight = 80;
