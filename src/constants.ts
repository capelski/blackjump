import { BaseDecisions, DynamicDecisions, PlayerDecisions } from './types';

export const actionsHeight = 112;

export const hitColor = '#428bca';
export const splitColor = '#5cb85c';
export const surrenderColor = '#dc3545';

export const colors = {
    [BaseDecisions.hit]: hitColor,
    [BaseDecisions.split]: splitColor,
    [BaseDecisions.stand]: '#46b8da',
    [DynamicDecisions.double_hit]: '#A1A669',
    [DynamicDecisions.double_stand]: '#A3BD71',
    [DynamicDecisions.surrender_hit]: '#8F6088',
    [PlayerDecisions.double]: '#ffc107',
    [PlayerDecisions.surrender]: surrenderColor
};

export const configBarHeight = 48;

export const tableCenterHeight = 80;
