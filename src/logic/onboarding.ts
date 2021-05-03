import { OnBoardingSections, OnBoardingStep, RouteNames } from '../types';

export const onBoardingSteps: OnBoardingStep[] = [
    {
        activeSection: OnBoardingSections.tableActions,
        hideNextButton: true,
        id: 1,
        load: (navigation) => {
            navigation.navigate(RouteNames.table);
        },
        text: 'Click Train to start playing a hand'
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
        text: 'Chose the right action for each of your hands'
    },
    {
        activeSection: OnBoardingSections.tableFeedback,
        hidePreviousButton: true,
        id: 5,
        load: (navigation) => {
            navigation.navigate(RouteNames.table);
        },
        text: 'A validation message will be shown for the chosen action'
    },
    {
        activeSection: OnBoardingSections.progressIndicator,
        id: 6,
        load: (navigation) => {
            navigation.navigate(RouteNames.table);
        },
        text: "The Progress indicator tells the % of hands you've trained"
    },
    {
        activeSection: OnBoardingSections.progressIndicator,
        id: 7,
        load: (navigation) => {
            navigation.navigate(RouteNames.trainingHands);
        },
        text: 'Click on it to view trained hands or train a specific one'
    },
    {
        activeSection: OnBoardingSections.precisionIndicator,
        id: 8,
        load: (navigation) => {
            navigation.navigate(RouteNames.table);
        },
        text: "The Precision indicator tells the % of hands you've failed"
    },
    {
        activeSection: OnBoardingSections.precisionIndicator,
        id: 9,
        load: (navigation) => {
            navigation.navigate(RouteNames.failedHands);
        },
        text: 'Click on it to see the list of failed hands'
    },
    {
        activeSection: OnBoardingSections.configMenuButton,
        id: 10,
        load: (navigation) => {
            navigation.navigate(RouteNames.table);
        },
        text: 'Click on the Gear to access the configuration menu'
    },
    {
        activeSection: OnBoardingSections.casinoRules,
        id: 11,
        load: (navigation) => {
            navigation.navigate(RouteNames.configMenu);
        },
        text: 'Chose the casino rules you want to train with'
    },
    {
        activeSection: OnBoardingSections.appSettings,
        id: 12,
        load: (navigation) => {
            navigation.navigate(RouteNames.configMenu);
        },
        text: 'Speed up your training by enabling additional options'
    }
];
