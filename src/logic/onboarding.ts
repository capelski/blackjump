import { OnBoardingSections, OnBoardingStep, RouteNames } from '../types';

export const onBoardingSteps: OnBoardingStep[] = [
    {
        activeSection: OnBoardingSections.tableActions,
        hideNextButton: true,
        id: 1,
        load: (navigation) => {
            navigation.navigate(RouteNames.table);
        },
        text: 'Click Train to start training a random hand'
    },
    {
        activeSection: OnBoardingSections.tablePlayerHands,
        hidePreviousButton: true,
        id: 2,
        load: (navigation) => {
            navigation.navigate(RouteNames.table);
        },
        text: 'This is your hand'
    },
    {
        activeSection: OnBoardingSections.tableDealerHand,
        id: 3,
        load: (navigation) => {
            navigation.navigate(RouteNames.table);
        },
        text: "This is the dealer's hand"
    },
    {
        activeSection: OnBoardingSections.tableActions,
        hideNextButton: true,
        hidePreviousButton: true,
        id: 4,
        load: (navigation) => {
            navigation.navigate(RouteNames.table);
        },
        text: 'Chose an action for each of your hands'
    },
    {
        activeSection: OnBoardingSections.tableFeedback,
        hidePreviousButton: true,
        id: 5,
        load: (navigation) => {
            navigation.navigate(RouteNames.table);
        },
        text: 'See whether you chose the right action or not'
    },
    {
        activeSection: OnBoardingSections.progressIndicator,
        id: 6,
        load: (navigation) => {
            navigation.navigate(RouteNames.table);
        },
        text: 'This indicator shows the % of trained hands'
    },
    {
        activeSection: OnBoardingSections.progressIndicator,
        id: 7,
        load: (navigation) => {
            navigation.navigate(RouteNames.trainingHands);
        },
        text: 'Click on it to train hands or view their status'
    },
    {
        activeSection: OnBoardingSections.precisionIndicator,
        id: 8,
        load: (navigation) => {
            navigation.navigate(RouteNames.table);
        },
        text: 'This indicator shows the % of passed hands'
    },
    {
        activeSection: OnBoardingSections.precisionIndicator,
        id: 9,
        load: (navigation) => {
            navigation.navigate(RouteNames.failedHands);
        },
        text: "Click on it to see the hands you've failed"
    },
    {
        activeSection: OnBoardingSections.configMenuButton,
        id: 10,
        load: (navigation) => {
            navigation.navigate(RouteNames.table);
        },
        text: 'Click here to access the configuration menu'
    },
    {
        activeSection: OnBoardingSections.basicStrategyTable,
        id: 11,
        load: (navigation) => {
            navigation.navigate(RouteNames.configMenu);
        },
        text: 'View and memorize the basic strategy table'
    },
    {
        activeSection: OnBoardingSections.casinoRules,
        id: 12,
        load: () => {},
        text: 'Chose the casino rules you want to train with'
    },
    {
        activeSection: OnBoardingSections.appSettings,
        id: 13,
        load: () => {},
        text: 'Speed up your training with additional options'
    },
    {
        activeSection: OnBoardingSections.resetTraining,
        id: 14,
        load: () => {},
        text: 'Start training over and master basic strategy'
    }
];
