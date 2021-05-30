import { OnBoardingSections, OnBoardingStep, OnBoardingStepEvent, RouteNames } from '../types';

export const onBoardingSteps: OnBoardingStep[] = [
    {
        activeSection: [OnBoardingSections.tableActions],
        event: OnBoardingStepEvent.startRound,
        hideNextButton: true,
        load: (navigation) => {
            navigation.navigate(RouteNames.table);
        },
        text: 'Click Random to start training a random pair'
    },
    {
        activeSection: [OnBoardingSections.tableDealerHand, OnBoardingSections.tablePlayerHands],
        hidePreviousButton: true,
        text: 'pair = player initial hand + dealer up card'
    },
    {
        activeSection: [OnBoardingSections.tablePlayerHands],
        text: 'This is your hand'
    },
    {
        activeSection: [OnBoardingSections.tableDealerHand],
        text: "This is the dealer's hand"
    },
    {
        activeSection: [OnBoardingSections.tableActions],
        event: OnBoardingStepEvent.playerAction,
        hideNextButton: true,
        hidePreviousButton: true,
        text: 'Chose an action for each of your hands'
    },
    {
        activeSection: [OnBoardingSections.tableFeedback],
        hidePreviousButton: true,
        text: 'See whether you chose the right action or not'
    },
    {
        activeSection: [OnBoardingSections.progressIndicator],
        load: (navigation) => {
            navigation.navigate(RouteNames.table);
        },
        text: 'This indicator shows the % of trained pairs'
    },
    {
        activeSection: [OnBoardingSections.progressIndicator],
        load: (navigation) => {
            navigation.navigate(RouteNames.trainingPairs);
        },
        text: 'Click on it to train pairs or view their status'
    },
    {
        activeSection: [OnBoardingSections.precisionIndicator],
        load: (navigation) => {
            navigation.navigate(RouteNames.table);
        },
        text: 'This indicator shows the % of passed pairs'
    },
    {
        activeSection: [OnBoardingSections.precisionIndicator],
        load: (navigation) => {
            navigation.navigate(RouteNames.failedPairs);
        },
        text: "Click on it to see the pairs you've failed"
    },
    {
        activeSection: [OnBoardingSections.configMenuButton],
        load: (navigation) => {
            navigation.navigate(RouteNames.table);
        },
        text: 'Click here to access the configuration menu'
    },
    {
        activeSection: [OnBoardingSections.basicStrategyTable],
        load: (navigation) => {
            navigation.navigate(RouteNames.configMenu);
        },
        text: 'View and memorize the basic strategy table'
    },
    {
        activeSection: [OnBoardingSections.casinoRules],
        text: 'Chose the casino rules you want to train with'
    },
    {
        activeSection: [OnBoardingSections.appSettings],
        text: 'Speed up your training with additional options'
    },
    {
        activeSection: [OnBoardingSections.resetTraining],
        text: 'Start training over and master basic strategy'
    }
];
