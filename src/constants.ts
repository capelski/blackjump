import { BaseDecisions, DynamicDecisions, PlayerDecisions } from './types';

export const colors = {
    [BaseDecisions.hit]: '#428bca',
    [BaseDecisions.split]: '#5cb85c',
    [BaseDecisions.stand]: '#46b8da',
    [DynamicDecisions.double_hit]: '#A1A669',
    [DynamicDecisions.double_stand]: '#A3BD71',
    [DynamicDecisions.surrender_hit]: '#8F6088',
    [PlayerDecisions.double]: '#ffc107',
    [PlayerDecisions.surrender]: '#dc3545'
};
