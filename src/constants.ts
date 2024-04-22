import { BaseDecisions, Dictionary, DynamicDecisions, PlayerDecisions } from './types';

export const doubleColor = '#a1a669';
export const hitColor = '#428bca';
export const splitColor = '#5cb85c';
export const standColor = '#46b8da';
export const surrenderColor = '#8f6088';

export const dangerColor = '#dc3545';
export const nonRandomColor = '#e5c100';
export const untrainedColor = '#333';
export const warningColor = '#ffc107';

export const tableColor = '#088446';

export const colors: Dictionary<string, BaseDecisions | DynamicDecisions | PlayerDecisions> = {
  [BaseDecisions.hit]: hitColor,
  [BaseDecisions.stand]: standColor,
  [DynamicDecisions.double_hit]: doubleColor,
  [DynamicDecisions.double_stand]: doubleColor,
  [DynamicDecisions.split_hit]: splitColor,
  [DynamicDecisions.split_stand]: splitColor,
  [DynamicDecisions.split_surrender_hit]: splitColor,
  [DynamicDecisions.surrender_hit]: surrenderColor,
  [DynamicDecisions.surrender_split_hit]: surrenderColor,
  [DynamicDecisions.surrender_stand]: surrenderColor,
  [PlayerDecisions.double]: doubleColor,
  [PlayerDecisions.split]: splitColor,
  [PlayerDecisions.surrender]: surrenderColor,
};
