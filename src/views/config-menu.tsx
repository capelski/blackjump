import React, { useState } from 'react';
import { Alert, ScrollView, Switch, Text, View } from 'react-native';
import { updateGameConfig, updatePlayerEarnings, updateTrainingProgress } from '../async-storage';
import { Button } from '../components/button';
import { DoublingPicker } from '../components/casino-rules/doubling-picker';
import { RuleSwitcher } from '../components/casino-rules/rule-switcher';
import { SplitsNumberPicker } from '../components/casino-rules/splits-number-picker';
import { Divider } from '../components/divider';
import { HelpIcon } from '../components/help-icon';
import { OnBoardingSection } from '../components/onboarding-section';
import { dangerColor, doubleColor, hitColor, splitColor, warningColor } from '../constants';
import { getGoldHandsNumber, getTrainingHands } from '../logic/training-hand';
import {
    getAreGoldHandsBlockingProgress,
    getDefaultTrainingStatus
} from '../logic/training-status';
import {
    AppNavigation,
    CasinoRules,
    CasinoRulesKeys,
    Doubling,
    GameConfig,
    GoldHandsLevels,
    OnBoardingSections,
    Phases,
    RouteNames,
    SplitsNumber,
    TrainingHands,
    TrainingStatus
} from '../types';

type ConfigMenuProps = {
    areGoldHandsBlockingProgress: boolean;
    gameConfig: GameConfig;
    navigation: AppNavigation;
    onBoardingStep: number;
    phase: Phases;
    progress: number;
    setGameConfig: (gameConfig: GameConfig) => void;
    setTrainingStatus: (trainingStatus: TrainingStatus) => void;
    trainingHands: TrainingHands;
    trainingStatus: TrainingStatus;
};

const textStyle = {
    color: 'white',
    fontSize: 20
};

export const ConfigMenu: React.FC<ConfigMenuProps> = (props) => {
    const [areGoldHandsBlockingProgress, setAreGoldHandsBlockingProgress] = useState(
        props.progress < 100 && props.areGoldHandsBlockingProgress
    );
    const [casinoRules, setCasinoRules] = useState(props.gameConfig.casinoRules);
    const [goldHandsLevels, setGoldHandsLevels] = useState(props.gameConfig.goldHandsLevels);
    const [goldHandsNumber, setGoldHandsNumber] = useState(
        getGoldHandsNumber(props.trainingHands, props.gameConfig.goldHandsLevels)
    );
    const [isDealerAnimationEnabled, setIsDealerAnimationEnabled] = useState(
        props.gameConfig.isDealerAnimationEnabled
    );
    const [isSoundEnabled, setIsSoundEnabled] = useState(props.gameConfig.isSoundEnabled);
    const [trainingHands, setTrainingHands] = useState(props.trainingHands);
    const [useBlueCards, setUseBlueCards] = useState(props.gameConfig.useBlueCards);
    const [useGoldHands, setUseGoldHands] = useState(props.gameConfig.useGoldHands);

    const isSomeLevelSelected = (_goldHandsLevels: GoldHandsLevels) =>
        _goldHandsLevels[1] || _goldHandsLevels[2] || _goldHandsLevels[3] || _goldHandsLevels[4];

    const areGoldHandsBlockingProgressHandler = (options?: {
        nextCasinoRules?: CasinoRules;
        nextGoldHandsLevels?: GoldHandsLevels;
        nextTrainingHands?: TrainingHands;
        nextUseGoldHands?: boolean;
    }) => {
        setAreGoldHandsBlockingProgress(
            isSomeLevelSelected((options && options.nextGoldHandsLevels) || goldHandsLevels) &&
                getAreGoldHandsBlockingProgress(
                    {
                        casinoRules: (options && options.nextCasinoRules) || casinoRules,
                        goldHandsLevels:
                            (options && options.nextGoldHandsLevels) || goldHandsLevels,
                        isDealerAnimationEnabled,
                        isSoundEnabled,
                        useBlueCards,
                        useGoldHands:
                            options && options.nextUseGoldHands !== undefined
                                ? options.nextUseGoldHands
                                : useGoldHands
                    },
                    (options && options.nextTrainingHands) || trainingHands,
                    props.trainingStatus.trainingProgress,
                    props.progress
                )
        );
    };

    const casinoRuleChangeHandler = (nextCasinoRules: CasinoRules) => {
        const nextTrainingHands = getTrainingHands(nextCasinoRules);
        const nextGoldHandsNumber = getGoldHandsNumber(nextTrainingHands, goldHandsLevels);

        setGoldHandsNumber(nextGoldHandsNumber);
        setTrainingHands(nextTrainingHands);
        areGoldHandsBlockingProgressHandler({ nextCasinoRules, nextTrainingHands });
    };

    const saveHandler = () => {
        const nextGameConfig: GameConfig = {
            casinoRules,
            goldHandsLevels,
            isDealerAnimationEnabled,
            isSoundEnabled,
            useBlueCards,
            useGoldHands
        };
        props.setGameConfig(nextGameConfig);
        updateGameConfig(nextGameConfig);
        props.navigation.navigate(RouteNames.table);
    };

    const isSaveButtonEnabled =
        (props.gameConfig.casinoRules[CasinoRulesKeys.blackjackPeek] !==
            casinoRules[CasinoRulesKeys.blackjackPeek] ||
            props.gameConfig.casinoRules[CasinoRulesKeys.dealerHitsSoft17] !==
                casinoRules[CasinoRulesKeys.dealerHitsSoft17] ||
            props.gameConfig.casinoRules[CasinoRulesKeys.doublingAfterSplit] !==
                casinoRules[CasinoRulesKeys.doublingAfterSplit] ||
            props.gameConfig.casinoRules[CasinoRulesKeys.doubling] !==
                casinoRules[CasinoRulesKeys.doubling] ||
            props.gameConfig.casinoRules[CasinoRulesKeys.hitSplitAces] !==
                casinoRules[CasinoRulesKeys.hitSplitAces] ||
            props.gameConfig.casinoRules[CasinoRulesKeys.holeCard] !==
                casinoRules[CasinoRulesKeys.holeCard] ||
            props.gameConfig.casinoRules[CasinoRulesKeys.splitsNumber] !==
                casinoRules[CasinoRulesKeys.splitsNumber] ||
            props.gameConfig.casinoRules[CasinoRulesKeys.surrender] !==
                casinoRules[CasinoRulesKeys.surrender] ||
            props.gameConfig.goldHandsLevels[1] !== goldHandsLevels[1] ||
            props.gameConfig.goldHandsLevels[2] !== goldHandsLevels[2] ||
            props.gameConfig.goldHandsLevels[3] !== goldHandsLevels[3] ||
            props.gameConfig.goldHandsLevels[4] !== goldHandsLevels[4] ||
            props.gameConfig.isDealerAnimationEnabled !== isDealerAnimationEnabled ||
            props.gameConfig.isSoundEnabled !== isSoundEnabled ||
            props.gameConfig.useBlueCards !== useBlueCards ||
            props.gameConfig.useGoldHands !== useGoldHands) &&
        isSomeLevelSelected(goldHandsLevels);

    return (
        <ScrollView
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
            style={{
                flexGrow: 1,
                width: '100%'
            }}
        >
            <OnBoardingSection
                isHighlighted={OnBoardingSections.basicStrategyTable}
                onBoardingStep={props.onBoardingStep}
                style={{
                    alignItems: 'center',
                    paddingBottom: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 16
                }}
            >
                <Button
                    height={56}
                    backgroundColor={splitColor}
                    isEnabled={true}
                    onPress={() => {
                        props.navigation.navigate(RouteNames.basicStrategyTable);
                    }}
                    text="Basic strategy table"
                    width="100%"
                />
            </OnBoardingSection>

            <OnBoardingSection
                onBoardingStep={props.onBoardingStep}
                style={{
                    alignItems: 'center',
                    paddingHorizontal: 16
                }}
            >
                {areGoldHandsBlockingProgress && (
                    <Text
                        style={{
                            color: warningColor,
                            fontSize: 20,
                            fontStyle: 'italic',
                            paddingTop: 16
                        }}
                    >
                        ⚠️ The selected Gold hands levels are blocking untrained hands. Modify the
                        selected levels or disable Gold Hands to train the missing hands
                    </Text>
                )}
            </OnBoardingSection>

            <OnBoardingSection
                isHighlighted={OnBoardingSections.casinoRules}
                onBoardingStep={props.onBoardingStep}
                style={{ padding: 16 }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginBottom: 8,
                        width: '100%'
                    }}
                >
                    Casino rules
                </Text>
                <Divider />

                <RuleSwitcher
                    casinoRules={casinoRules}
                    onValueChange={casinoRuleChangeHandler}
                    ruleName={CasinoRulesKeys.dealerHitsSoft17}
                    setCasinoRules={setCasinoRules}
                />

                <DoublingPicker
                    casinoRules={casinoRules}
                    onValueChange={casinoRuleChangeHandler}
                    setCasinoRules={setCasinoRules}
                />

                <RuleSwitcher
                    casinoRules={casinoRules}
                    isDisabled={
                        casinoRules[CasinoRulesKeys.doubling] === Doubling.none ||
                        casinoRules[CasinoRulesKeys.splitsNumber] === SplitsNumber.none
                    }
                    onValueChange={casinoRuleChangeHandler}
                    ruleName={CasinoRulesKeys.doublingAfterSplit}
                    setCasinoRules={setCasinoRules}
                />

                {/* TODO Create a help icon on Hit split aces */}
                <RuleSwitcher
                    casinoRules={casinoRules}
                    isDisabled={casinoRules[CasinoRulesKeys.splitsNumber] === SplitsNumber.none}
                    onValueChange={casinoRuleChangeHandler}
                    ruleName={CasinoRulesKeys.hitSplitAces}
                    setCasinoRules={setCasinoRules}
                />

                <View
                    style={{
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        paddingTop: 16,
                        width: '100%'
                    }}
                >
                    <RuleSwitcher
                        casinoRules={casinoRules}
                        hideLabel={true}
                        onValueChange={casinoRuleChangeHandler}
                        ruleName={CasinoRulesKeys.holeCard}
                        setCasinoRules={setCasinoRules}
                    />

                    <View>
                        {/* TODO Create a help icon on Hole card */}
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 20
                            }}
                        >
                            {CasinoRulesKeys.holeCard}
                        </Text>

                        <RuleSwitcher
                            casinoRules={casinoRules}
                            isDisabled={!casinoRules[CasinoRulesKeys.holeCard]}
                            onValueChange={casinoRuleChangeHandler}
                            ruleName={CasinoRulesKeys.blackjackPeek}
                            setCasinoRules={setCasinoRules}
                        />
                    </View>
                </View>

                <SplitsNumberPicker
                    casinoRules={casinoRules}
                    onValueChange={casinoRuleChangeHandler}
                    setCasinoRules={setCasinoRules}
                />

                <RuleSwitcher
                    casinoRules={casinoRules}
                    onValueChange={casinoRuleChangeHandler}
                    ruleName={CasinoRulesKeys.surrender}
                    setCasinoRules={setCasinoRules}
                />
            </OnBoardingSection>

            <OnBoardingSection
                isHighlighted={OnBoardingSections.appSettings}
                onBoardingStep={props.onBoardingStep}
                style={{ padding: 16 }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginBottom: 8,
                        width: '100%'
                    }}
                >
                    App settings
                </Text>
                <Divider />

                <View style={{ flexDirection: 'row', paddingTop: 16, width: '100%' }}>
                    <Switch
                        onValueChange={setUseBlueCards}
                        style={{ marginRight: 8 }}
                        trackColor={{ true: hitColor, false: 'white' }}
                        value={useBlueCards}
                    />
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 20
                        }}
                    >
                        Blue cards
                    </Text>
                    <HelpIcon
                        onPress={() => {
                            props.navigation.navigate(RouteNames.blueCardsInfo);
                        }}
                    />
                </View>

                {props.progress === 100 && useBlueCards && (
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 20,
                            fontStyle: 'italic',
                            paddingVertical: 16
                        }}
                    >
                        Blue cards don't have any effect on 100% progress. Reset the training if you
                        want to see them again
                    </Text>
                )}

                <View
                    style={{
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        paddingTop: 16,
                        width: '100%'
                    }}
                >
                    <Switch
                        onValueChange={(value) => {
                            setUseGoldHands(value);
                            areGoldHandsBlockingProgressHandler({ nextUseGoldHands: value });
                        }}
                        style={{ marginRight: 8 }}
                        trackColor={{ true: hitColor, false: 'white' }}
                        value={useGoldHands}
                    />

                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text
                                style={{
                                    color: areGoldHandsBlockingProgress ? warningColor : 'white',
                                    fontSize: 20
                                }}
                            >
                                Gold hands
                            </Text>
                            <HelpIcon
                                onPress={() => {
                                    props.navigation.navigate(RouteNames.goldHandsInfo);
                                }}
                            />
                        </View>

                        <View
                            style={{
                                marginTop: 16,
                                opacity: useGoldHands ? undefined : 0.3
                            }}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    style={{
                                        ...textStyle,
                                        color: areGoldHandsBlockingProgress ? warningColor : 'white'
                                    }}
                                >
                                    Hand levels
                                </Text>
                                <HelpIcon
                                    onPress={() => {
                                        props.navigation.navigate(RouteNames.goldHandsLevelsInfo);
                                    }}
                                />
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap'
                                }}
                            >
                                {Object.keys(goldHandsLevels).map((numberKey) => {
                                    const number = parseInt(numberKey, 10);
                                    return (
                                        <React.Fragment key={numberKey}>
                                            <Switch
                                                disabled={!useGoldHands}
                                                onValueChange={(newValue) => {
                                                    const nextGoldHandsLevels = {
                                                        ...goldHandsLevels,
                                                        [number]: newValue
                                                    };
                                                    setGoldHandsLevels(nextGoldHandsLevels);
                                                    setGoldHandsNumber(
                                                        getGoldHandsNumber(
                                                            trainingHands,
                                                            nextGoldHandsLevels
                                                        )
                                                    );
                                                    areGoldHandsBlockingProgressHandler({
                                                        nextGoldHandsLevels
                                                    });
                                                }}
                                                style={{ marginTop: 16 }}
                                                trackColor={{ true: hitColor, false: 'white' }}
                                                value={goldHandsLevels[number] || false}
                                            />
                                            <Text
                                                style={{
                                                    ...textStyle,
                                                    color: areGoldHandsBlockingProgress
                                                        ? warningColor
                                                        : 'white',
                                                    marginTop: 16,
                                                    paddingLeft: 4
                                                }}
                                            >
                                                {numberKey}
                                            </Text>
                                        </React.Fragment>
                                    );
                                })}
                            </View>
                            <Text style={{ ...textStyle, marginTop: 16, textAlign: 'center' }}>
                                ({goldHandsNumber} gold hands)
                            </Text>
                        </View>
                    </View>
                </View>
            </OnBoardingSection>

            <OnBoardingSection onBoardingStep={props.onBoardingStep} style={{ padding: 16 }}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginBottom: 8,
                        width: '100%'
                    }}
                >
                    Animations
                </Text>
                <Divider />

                <View style={{ flexDirection: 'row', paddingTop: 16, width: '100%' }}>
                    <Switch
                        onValueChange={setIsSoundEnabled}
                        style={{ marginRight: 8 }}
                        trackColor={{ true: hitColor, false: 'white' }}
                        value={isSoundEnabled}
                    />
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 20
                        }}
                    >
                        Sound effects 🔊
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', paddingTop: 16, width: '100%' }}>
                    <Switch
                        onValueChange={setIsDealerAnimationEnabled}
                        style={{ marginRight: 8 }}
                        trackColor={{ true: hitColor, false: 'white' }}
                        value={isDealerAnimationEnabled}
                    />
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 20
                        }}
                    >
                        Dealer cards delay
                    </Text>
                </View>
            </OnBoardingSection>

            <OnBoardingSection
                onBoardingStep={props.onBoardingStep}
                style={{
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingTop: 24
                }}
            >
                <Button
                    height={56}
                    backgroundColor={hitColor}
                    isEnabled={isSaveButtonEnabled}
                    marginBottom={40}
                    onPress={saveHandler}
                    text="Save"
                    width="100%"
                />

                <Divider />

                <Button
                    height={56}
                    backgroundColor={doubleColor}
                    isEnabled={props.phase === Phases.finished}
                    marginTop={40}
                    onPress={() => {
                        props.navigation.navigate(RouteNames.onboarding);
                    }}
                    text="Onboarding"
                    width="100%"
                />
            </OnBoardingSection>

            <OnBoardingSection
                isHighlighted={OnBoardingSections.resetTraining}
                onBoardingStep={props.onBoardingStep}
                style={{
                    alignItems: 'center',
                    paddingBottom: 16,
                    paddingHorizontal: 16
                }}
            >
                <Button
                    height={56}
                    backgroundColor={dangerColor}
                    isEnabled={true}
                    marginTop={8}
                    onPress={() => {
                        Alert.alert(
                            'Reset training',
                            'Resetting the training will mark all hands as untrained, ' +
                                'setting the progress and precision indicators to 0%, ' +
                                'and set the player earnings to 0$ as well. ' +
                                'Are you sure you want to reset the training?',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel'
                                },
                                {
                                    text: 'Reset',
                                    onPress: () => {
                                        const nextTrainingStatus = getDefaultTrainingStatus();
                                        props.setTrainingStatus(nextTrainingStatus);
                                        updateTrainingProgress(nextTrainingStatus.trainingProgress);
                                        updatePlayerEarnings(0);
                                    }
                                }
                            ]
                        );
                    }}
                    text="Reset training"
                    width="100%"
                />
            </OnBoardingSection>
        </ScrollView>
    );
};
