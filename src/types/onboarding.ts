import { AppNavigation } from './navigation';

export enum OnBoardingSections {
    appSettings = 'appSettings',
    basicStrategyTable = 'basicStrategyTable',
    casinoRules = 'casinoRules',
    configMenuButton = 'configMenuButton',
    missedPairs = 'missedPairs',
    precisionIndicator = 'precisionIndicator',
    progressIndicator = 'progressIndicator',
    resetTraining = 'resetTraining',
    tableActions = 'tableActions',
    tableDealerHand = 'tableDealerHand',
    tableFeedback = 'tableFeedback',
    tablePlayerHands = 'tablePlayerHands'
}

export type OnBoardingStep = {
    activeSection?: OnBoardingSections[];
    event?: OnBoardingStepEvent;
    hideNextButton?: boolean;
    hidePreviousButton?: boolean;
    load?: (navigation: AppNavigation) => void;
    text: string;
};

export enum OnBoardingStepEvent {
    startRound = 0,
    playerAction = 1
}
