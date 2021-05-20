import { AppNavigation } from './navigation';

export enum OnBoardingSections {
    appSettings = 'appSettings',
    basicStrategyTable = 'basicStrategyTable',
    casinoRules = 'casinoRules',
    configMenuButton = 'configMenuButton',
    precisionIndicator = 'precisionIndicator',
    progressIndicator = 'progressIndicator',
    resetTraining = 'resetTraining',
    tableActions = 'tableActions',
    tableDealerHand = 'tableDealerHand',
    tableFeedback = 'tableFeedback',
    tablePlayerHands = 'tablePlayerHands'
}

export type OnBoardingStep = {
    activeSection?: OnBoardingSections;
    hideNextButton?: boolean;
    hidePreviousButton?: boolean;
    id: number;
    load: (navigation: AppNavigation) => void;
    text: string;
};
