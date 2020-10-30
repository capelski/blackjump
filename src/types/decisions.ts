export enum BaseDecisions {
    hit = 'Hit',
    split = 'Split',
    stand = 'Stand'
}

export type DecisionEvaluation =
    | { hit: true }
    | {
          hit: false;
          failureReason: string;
      };

export interface DecisionsSet {
    [key: number]: GameSettingsDecision;
    until: {
        dealer: (
            limit: number
        ) => {
            then: {
                double_hit: DecisionsSet;
                // double_stand: DecisionsSet; Not used
                doubleIfAllowed_hit: DecisionsSet;
                doubleIfAllowed_stand: DecisionsSet;
                hit: DecisionsSet;
                split: DecisionsSet;
                splitIfDasAllowed_hit: DecisionsSet;
                stand: DecisionsSet;
                surrenderIfAllowed_hit: DecisionsSet;
            };
        };
    };
}

export interface DynamicConditions {
    canDouble: boolean;
    canSurrender: boolean;
}

export enum DynamicDecisions {
    double_hit = 'Double / Hit',
    double_stand = 'Double / Stand',
    surrender_hit = 'Surrender / Hit'
}

export type DynamicDecision = BaseDecisions | DynamicDecisions;

export enum GameSettingsDecisions {
    doubleIfAllowed_hit = 'doubleIfAllowed/hit',
    doubleIfAllowed_stand = 'doubleIfAllowed/stand',
    splitIfDasAllowed_hit = 'splitIfDasAllowed/hit',
    surrenderIfAllowed_hit = 'surrenderIfAllowed/hit'
}

export type GameSettingsDecision = DynamicDecision | GameSettingsDecisions;

export interface OptimalDecision {
    decision: PlayerDecision;
    description: string;
}

export enum PlayerDecisions {
    double = 'Double',
    surrender = 'Surrender'
}

export type PlayerDecision = BaseDecisions | PlayerDecisions;
