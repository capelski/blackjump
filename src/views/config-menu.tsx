import React, { useState } from 'react';
import { Alert, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../components/button';
import { DoublingPicker } from '../components/casino-rules/doubling-picker';
import { RuleSwitcher } from '../components/casino-rules/rule-switcher';
import { SplitsNumberPicker } from '../components/casino-rules/splits-number-picker';
import { Divider } from '../components/divider';
import { HelpIcon } from '../components/help-icon';
import { OnBoardingSection } from '../components/onboarding-section';
import { Switcher } from '../components/switcher';
import {
    dangerColor,
    doubleColor,
    hitColor,
    splitColor,
    standColor,
    warningColor
} from '../constants';
import { getTrainingHands } from '../logic/training-hand';
import { getIsProgressBlocked } from '../logic/training-status';
import {
    AppNavigation,
    CasinoRules,
    CasinoRulesKeys,
    Dictionary,
    GameConfig,
    HandCode,
    OnBoardingSections,
    Phases,
    RouteNames,
    SelectedHands,
    TrainingHands,
    TrainingStatus
} from '../types';
import { getObjectKeys } from '../utils';

type ConfigMenuProps = {
    gameConfig: GameConfig;
    navigation: AppNavigation;
    onBoardingStep: number;
    phase: Phases;
    resetTrainingStatus: () => void;
    setGameConfig: (gameConfig: GameConfig) => void;
    trainingHands: TrainingHands;
    trainingStatus: TrainingStatus;
};

export const ConfigMenu: React.FC<ConfigMenuProps> = (props) => {
    const [casinoRules, setCasinoRules] = useState(props.gameConfig.casinoRules);
    const [isDealerAnimationEnabled, setIsDealerAnimationEnabled] = useState(
        props.gameConfig.isDealerAnimationEnabled
    );
    const [isProgressBlocked, setIsProgressBlocked] = useState(
        props.trainingStatus.isProgressBlocked
    );
    const [isSoundEnabled, setIsSoundEnabled] = useState(props.gameConfig.isSoundEnabled);
    const [selectedHands, setSelectedHands] = useState(props.gameConfig.selectedHands);
    const [selectedHandsOnly, setSelectedHandsOnly] = useState(props.gameConfig.selectedHandsOnly);
    const [trainingHands, setTrainingHands] = useState(props.trainingHands);
    const [untrainedPairsPriority, setUntrainedPairsPriority] = useState(
        props.gameConfig.untrainedPairsPriority
    );

    const isSomeHandSelected = (_selectedHandsOnly: boolean, _selectedHands: SelectedHands) =>
        !_selectedHandsOnly || Object.values(_selectedHands).some((x) => x);

    const isProgressBlockedHandler = (options: {
        nextSelectedHands?: SelectedHands;
        nextSelectedHandsOnly?: boolean;
        nextTrainingHands?: TrainingHands;
    }) => {
        const _selectedHandsOnly =
            options.nextSelectedHandsOnly !== undefined
                ? options.nextSelectedHandsOnly
                : selectedHandsOnly;
        const _selectedHands = options.nextSelectedHands || selectedHands;

        setIsProgressBlocked(
            isSomeHandSelected(_selectedHandsOnly, _selectedHands) &&
                getIsProgressBlocked(
                    props.trainingStatus,
                    options.nextTrainingHands || trainingHands,
                    _selectedHandsOnly,
                    _selectedHands
                )
        );
    };

    const casinoRuleChangeHandler = (nextCasinoRules: CasinoRules) => {
        setCasinoRules(nextCasinoRules);
        const nextTrainingHands = getTrainingHands(nextCasinoRules);
        setTrainingHands(nextTrainingHands);
    };

    const saveHandler = () => {
        props.setGameConfig({
            casinoRules,
            isDealerAnimationEnabled,
            isSoundEnabled,
            selectedHands,
            selectedHandsOnly,
            untrainedPairsPriority
        });
        props.navigation.navigate(RouteNames.table);
    };

    const isSaveButtonEnabled =
        isSomeHandSelected(selectedHandsOnly, selectedHands) &&
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
            props.gameConfig.casinoRules[CasinoRulesKeys.splitsNumber] !==
                casinoRules[CasinoRulesKeys.splitsNumber] ||
            props.gameConfig.casinoRules[CasinoRulesKeys.surrender] !==
                casinoRules[CasinoRulesKeys.surrender] ||
            props.gameConfig.isDealerAnimationEnabled !== isDealerAnimationEnabled ||
            props.gameConfig.isSoundEnabled !== isSoundEnabled ||
            getObjectKeys(props.gameConfig.selectedHands).some(
                (key) => props.gameConfig.selectedHands[key] !== selectedHands[key]
            ) ||
            props.gameConfig.selectedHandsOnly !== selectedHandsOnly ||
            props.gameConfig.untrainedPairsPriority !== untrainedPairsPriority);

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
                    isEnabled={props.onBoardingStep === -1}
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
                {isProgressBlocked && (
                    <Text
                        style={{
                            color: warningColor,
                            fontSize: 20,
                            fontStyle: 'italic',
                            paddingTop: 16
                        }}
                    >
                        ⚠️ Selected hands are blocking progress. Modify the selection or disable
                        Selected hands to complete your training
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
                    ruleName={CasinoRulesKeys.blackjackPeek}
                >
                    <HelpIcon
                        onPress={() => {
                            props.navigation.navigate(RouteNames.blackjackPeek);
                        }}
                    />
                </RuleSwitcher>

                <RuleSwitcher
                    casinoRules={casinoRules}
                    onValueChange={casinoRuleChangeHandler}
                    ruleName={CasinoRulesKeys.dealerHitsSoft17}
                />

                <DoublingPicker casinoRules={casinoRules} onValueChange={casinoRuleChangeHandler} />

                <RuleSwitcher
                    casinoRules={casinoRules}
                    onValueChange={casinoRuleChangeHandler}
                    ruleName={CasinoRulesKeys.doublingAfterSplit}
                />

                <RuleSwitcher
                    casinoRules={casinoRules}
                    onValueChange={casinoRuleChangeHandler}
                    ruleName={CasinoRulesKeys.hitSplitAces}
                >
                    <HelpIcon
                        onPress={() => {
                            props.navigation.navigate(RouteNames.hitSplitAces);
                        }}
                    />
                </RuleSwitcher>

                <SplitsNumberPicker
                    casinoRules={casinoRules}
                    onValueChange={casinoRuleChangeHandler}
                />

                <RuleSwitcher
                    casinoRules={casinoRules}
                    onValueChange={casinoRuleChangeHandler}
                    ruleName={CasinoRulesKeys.surrender}
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

                <Switcher
                    label="Dealer cards animation"
                    onValueChange={setIsDealerAnimationEnabled}
                    value={isDealerAnimationEnabled}
                />

                <Switcher
                    disabled={props.trainingStatus.isCompleted}
                    label="Untrained pairs priority"
                    onValueChange={setUntrainedPairsPriority}
                    value={!props.trainingStatus.isCompleted && untrainedPairsPriority}
                >
                    <HelpIcon
                        onPress={() => {
                            props.navigation.navigate(RouteNames.untrainedPairsPriority);
                        }}
                    />
                </Switcher>

                <Switcher
                    label="Selected hands only"
                    onValueChange={(value) => {
                        setSelectedHandsOnly(value);
                        isProgressBlockedHandler({
                            nextSelectedHandsOnly: value
                        });
                    }}
                    value={selectedHandsOnly}
                />

                {selectedHandsOnly && (
                    <View
                        style={{
                            borderLeftColor: 'white',
                            borderLeftWidth: 2,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginLeft: 16,
                            marginTop: 16
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                const nextSelectedHands = Object.values(HandCode).reduce(
                                    (hands, handCode) => ({ ...hands, [handCode]: true }),
                                    {}
                                ) as Dictionary<boolean, HandCode>;
                                setSelectedHands(nextSelectedHands);
                                isProgressBlockedHandler({
                                    nextSelectedHands
                                });
                            }}
                            style={{
                                alignItems: 'center',
                                backgroundColor: doubleColor,
                                marginBottom: 8,
                                marginLeft: '2%',
                                paddingVertical: 4,
                                width: '48%'
                            }}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 20
                                }}
                            >
                                Select all
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                const nextSelectedHands = Object.values(HandCode).reduce(
                                    (hands, handCode) => ({ ...hands, [handCode]: false }),
                                    {}
                                ) as Dictionary<boolean, HandCode>;
                                setSelectedHands(nextSelectedHands);
                                isProgressBlockedHandler({
                                    nextSelectedHands
                                });
                            }}
                            style={{
                                alignItems: 'center',
                                backgroundColor: doubleColor,
                                marginBottom: 8,
                                marginLeft: '2%',
                                paddingVertical: 4,
                                width: '48%'
                            }}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 20
                                }}
                            >
                                Unselect all
                            </Text>
                        </TouchableOpacity>

                        {Object.values(trainingHands).map((trainingHand) => (
                            <TouchableOpacity
                                key={trainingHand.name}
                                onPress={() => {
                                    const nextSelectedHands = {
                                        ...selectedHands,
                                        [trainingHand.code]: !selectedHands[trainingHand.code]
                                    };
                                    setSelectedHands(nextSelectedHands);
                                    isProgressBlockedHandler({
                                        nextSelectedHands
                                    });
                                }}
                                style={{
                                    alignItems: 'center',
                                    backgroundColor: selectedHands[trainingHand.code]
                                        ? standColor
                                        : undefined,
                                    paddingVertical: 4,
                                    width: '33.33%'
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 20
                                    }}
                                >
                                    {trainingHand.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <Switcher
                    label="Sound effects 🔊"
                    onValueChange={setIsSoundEnabled}
                    value={isSoundEnabled}
                />
            </OnBoardingSection>

            <OnBoardingSection
                onBoardingStep={props.onBoardingStep}
                style={{
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingTop: 24
                }}
            >
                {!isSomeHandSelected(selectedHandsOnly, selectedHands) && (
                    <Text
                        style={{
                            color: warningColor,
                            fontSize: 20,
                            fontStyle: 'italic',
                            paddingBottom: 16
                        }}
                    >
                        Some hand must be selected to save the changes
                    </Text>
                )}

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
                    isEnabled={props.onBoardingStep === -1}
                    marginTop={8}
                    onPress={() => {
                        const title = 'Reset training';
                        const body =
                            'Resetting the training will mark all hands as untrained, ' +
                            'setting the progress and precision indicators to 0%, ' +
                            'and set the player earnings to 0$ as well. ' +
                            'Are you sure you want to reset the training?';

                        if (Platform.OS === 'web') {
                            const response = window.confirm(body);
                            if (response) {
                                props.resetTrainingStatus();
                            }
                        } else {
                            Alert.alert(title, body, [
                                {
                                    text: 'Cancel',
                                    style: 'cancel'
                                },
                                {
                                    text: 'Reset',
                                    onPress: props.resetTrainingStatus
                                }
                            ]);
                        }
                    }}
                    text="Reset training"
                    width="100%"
                />
            </OnBoardingSection>
        </ScrollView>
    );
};
