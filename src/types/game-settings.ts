export interface GameSettings {
    [GameSettingsKeys.canDoubleOnAnyInitialHand]: boolean;
    [GameSettingsKeys.canDoubleAfterSplit]: boolean;
    [GameSettingsKeys.canSurrender]: boolean;
}

export enum GameSettingsKeys {
    canDoubleAfterSplit = 'Can double after split',
    canDoubleOnAnyInitialHand = 'Can double on any initial hand',
    canSurrender = 'Can surrender'
}
