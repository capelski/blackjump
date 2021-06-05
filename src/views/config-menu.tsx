import React, { useState } from 'react';
import { Alert, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { updateGameConfig, updatePlayerEarnings, updateTrainingProgress } from '../async-storage';
import { Button } from '../components/button';
import { DoublingPicker } from '../components/casino-rules/doubling-picker';
import { RuleSwitcher } from '../components/casino-rules/rule-switcher';
import { SplitsNumberPicker } from '../components/casino-rules/splits-number-picker';
import { Divider } from '../components/divider';
import { HelpIcon } from '../components/help-icon';
import { OnBoardingSection } from '../components/onboarding-section';
import {
    dangerColor,
    doubleColor,
    hitColor,
    splitColor,
    standColor,
    warningColor
} from '../constants';
import { getTrainingHands } from '../logic/training-hand';
import { getTrainingPairsNumber } from '../logic/training-pair';
import { getDefaultTrainingStatus, getIsProgressBlocked } from '../logic/training-status';
import {
    AppNavigation,
    CasinoRules,
    CasinoRulesKeys,
    Doubling,
    GameConfig,
    OnBoardingSections,
    Phases,
    RouteNames,
    SelectedHands,
    SplitsNumber,
    TrainingHands,
    TrainingStatus
} from '../types';
import { getObjectKeys } from '../utils';

type ConfigMenuProps = {
    gameConfig: GameConfig;
    isProgressBlocked: boolean;
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
    const [casinoRules, setCasinoRules] = useState(props.gameConfig.casinoRules);
    const [isDealerAnimationEnabled, setIsDealerAnimationEnabled] = useState(
        props.gameConfig.isDealerAnimationEnabled
    );
    const [isProgressBlocked, setIsProgressBlocked] = useState(props.isProgressBlocked);
    const [isSoundEnabled, setIsSoundEnabled] = useState(props.gameConfig.isSoundEnabled);
    const [trainingHands, setTrainingHands] = useState(props.trainingHands);
    const [trainingPairsNumber, setTrainingPairsNumber] = useState(
        getTrainingPairsNumber(props.trainingHands, props.gameConfig.untrainedPairsHands)
    );
    const [untrainedPairsHands, setUntrainedPairsHands] = useState(
        props.gameConfig.untrainedPairsHands
    );
    const [untrainedPairsPriority, setUntrainedPairsPriority] = useState(
        props.gameConfig.untrainedPairsPriority
    );

    const isSomeHandSelected = (selectedHands: SelectedHands) =>
        Object.values(selectedHands).some((x) => x);

    const isProgressBlockedHandler = (options?: {
        nextCasinoRules?: CasinoRules;
        nextHands?: SelectedHands;
        nextTrainingHands?: TrainingHands;
        nextUntrainedPairsPriority?: boolean;
    }) => {
        setIsProgressBlocked(
            isSomeHandSelected((options && options.nextHands) || untrainedPairsHands) &&
                getIsProgressBlocked(
                    {
                        casinoRules: (options && options.nextCasinoRules) || casinoRules,
                        isDealerAnimationEnabled,
                        isSoundEnabled,
                        untrainedPairsHands: (options && options.nextHands) || untrainedPairsHands,
                        untrainedPairsPriority:
                            options && options.nextUntrainedPairsPriority !== undefined
                                ? options.nextUntrainedPairsPriority
                                : untrainedPairsPriority
                    },
                    (options && options.nextTrainingHands) || trainingHands,
                    props.trainingStatus.trainingProgress,
                    props.progress
                )
        );
    };

    const casinoRuleChangeHandler = (nextCasinoRules: CasinoRules) => {
        const nextTrainingHands = getTrainingHands(nextCasinoRules);
        const nextTrainingPairsNumber = getTrainingPairsNumber(
            nextTrainingHands,
            untrainedPairsHands
        );

        setTrainingPairsNumber(nextTrainingPairsNumber);
        setTrainingHands(nextTrainingHands);
        isProgressBlockedHandler({ nextCasinoRules, nextTrainingHands });
    };

    const saveHandler = () => {
        const nextGameConfig: GameConfig = {
            casinoRules,
            isDealerAnimationEnabled,
            isSoundEnabled,
            untrainedPairsHands,
            untrainedPairsPriority
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
            props.gameConfig.isDealerAnimationEnabled !== isDealerAnimationEnabled ||
            props.gameConfig.isSoundEnabled !== isSoundEnabled ||
            getObjectKeys(props.gameConfig.untrainedPairsHands).some(
                (key) => props.gameConfig.untrainedPairsHands[key] !== untrainedPairsHands[key]
            ) ||
            props.gameConfig.untrainedPairsPriority !== untrainedPairsPriority) &&
        isSomeHandSelected(untrainedPairsHands);

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
                {isProgressBlocked && (
                    <Text
                        style={{
                            color: warningColor,
                            fontSize: 20,
                            fontStyle: 'italic',
                            paddingTop: 16
                        }}
                    >
                        ⚠️ Selected hands are blocking untrained pairs. Modify the selection or
                        disable Untrained pairs priority to train the missing pairs
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
                        Dealer cards animation
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        paddingTop: 16,
                        width: '100%'
                    }}
                >
                    <View style={{ width: '15%' }}>
                        <Switch
                            onValueChange={(value) => {
                                setUntrainedPairsPriority(value);
                                isProgressBlockedHandler({
                                    nextUntrainedPairsPriority: value
                                });
                            }}
                            style={{ marginRight: 8 }}
                            trackColor={{ true: hitColor, false: 'white' }}
                            value={untrainedPairsPriority}
                        />
                    </View>

                    <View style={{ width: '85%' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text
                                style={{
                                    color: isProgressBlocked ? warningColor : 'white',
                                    fontSize: 20
                                }}
                            >
                                Untrained pairs priority
                            </Text>
                            <HelpIcon
                                onPress={() => {
                                    props.navigation.navigate(RouteNames.untrainedPairsPriority);
                                }}
                            />
                        </View>

                        {untrainedPairsPriority && (
                            <View
                                style={{
                                    marginTop: 16
                                }}
                            >
                                <View
                                    style={{
                                        flexBasis: '100%',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        marginTop: 16
                                    }}
                                >
                                    {Object.values(trainingHands).map((trainingHand) => (
                                        <TouchableOpacity
                                            key={trainingHand.name}
                                            onPress={() => {
                                                const nextHands = {
                                                    ...untrainedPairsHands,
                                                    [trainingHand.code]: !untrainedPairsHands[
                                                        trainingHand.code
                                                    ]
                                                };
                                                setUntrainedPairsHands(nextHands);
                                                setTrainingPairsNumber(
                                                    getTrainingPairsNumber(trainingHands, nextHands)
                                                );
                                                isProgressBlockedHandler({
                                                    nextHands
                                                });
                                            }}
                                            style={{
                                                alignItems: 'center',
                                                backgroundColor: untrainedPairsHands[
                                                    trainingHand.code
                                                ]
                                                    ? standColor
                                                    : undefined,
                                                paddingVertical: 4,
                                                width: '32.33%'
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

                                <Text style={{ ...textStyle, marginTop: 16, textAlign: 'center' }}>
                                    ({trainingPairsNumber} training pairs)
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

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
