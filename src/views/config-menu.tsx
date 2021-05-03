import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { Alert, ScrollView, Switch, Text, View } from 'react-native';
import { updateGameConfig, updateTrainedHands } from '../async-storage';
import { Button } from '../components/button';
import { CasinoRuleSwitch } from '../components/casino-rule-switch';
import { Divider } from '../components/divider';
import { HelpIcon } from '../components/help-icon';
import { OnBoardingSection } from '../components/onboarding-section';
import { doubleColor, hitColor, splitColor, surrenderColor } from '../constants';
import { getEmptyTrainingHands } from '../logic/training-hands';
import { getAreGoldHandsBlockingProgress, getGoldHandsNumber } from '../logic/training-pairs';
import {
    AppNavigation,
    CasinoRulesKeys,
    GameConfig,
    OnBoardingSections,
    Phases,
    RouteNames,
    TrainingHands
} from '../types';

type ConfigMenuProps = {
    areGoldHandsBlockingProgress: boolean;
    gameConfig: GameConfig;
    navigation: AppNavigation;
    onBoardingStep: number;
    phase: Phases;
    progress: number;
    setGameConfig: (gameConfig: GameConfig) => void;
    setTrainingHands: (trainingHands: TrainingHands) => void;
    trainingHands: TrainingHands;
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
        getGoldHandsNumber(props.gameConfig.casinoRules, props.gameConfig.goldHandsLevels)
    );
    const [isDealerAnimationEnabled, setIsDealerAnimationEnabled] = useState(
        props.gameConfig.isDealerAnimationEnabled
    );
    const [isSoundEnabled, setIsSoundEnabled] = useState(props.gameConfig.isSoundEnabled);
    const [useBlueCards, setUseBlueCards] = useState(props.gameConfig.useBlueCards);
    const [useGoldHands, setUseGoldHands] = useState(props.gameConfig.useGoldHands);

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
        (props.gameConfig.casinoRules[CasinoRulesKeys.doubleAfterSplit] !==
            casinoRules[CasinoRulesKeys.doubleAfterSplit] ||
            props.gameConfig.casinoRules[CasinoRulesKeys.doubleOnlyOn_9_10_11] !==
                casinoRules[CasinoRulesKeys.doubleOnlyOn_9_10_11] ||
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
        (goldHandsLevels[1] || goldHandsLevels[2] || goldHandsLevels[3] || goldHandsLevels[4]);

    return (
        <ScrollView
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
            style={{
                flexGrow: 1,
                width: '100%'
            }}
        >
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
                            color: doubleColor,
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

                {Object.values(CasinoRulesKeys).map((casinoRule) => (
                    <CasinoRuleSwitch
                        casinoRule={casinoRule}
                        key={casinoRule}
                        onValueChange={(newValue) => {
                            const nextCasinoRules = { ...casinoRules, [casinoRule]: newValue };
                            setCasinoRules(nextCasinoRules);
                            setGoldHandsNumber(
                                getGoldHandsNumber(nextCasinoRules, goldHandsLevels)
                            );
                            setAreGoldHandsBlockingProgress(
                                props.progress < 100 &&
                                    getAreGoldHandsBlockingProgress(
                                        { ...props.gameConfig, casinoRules: nextCasinoRules },
                                        props.trainingHands.trained
                                    )
                            );
                        }}
                        value={casinoRules[casinoRule]}
                    />
                ))}
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
                            setAreGoldHandsBlockingProgress(
                                props.progress < 100 &&
                                    getAreGoldHandsBlockingProgress(
                                        { ...props.gameConfig, useGoldHands: value },
                                        props.trainingHands.trained
                                    )
                            );
                        }}
                        style={{ marginRight: 8 }}
                        trackColor={{ true: hitColor, false: 'white' }}
                        value={useGoldHands}
                    />

                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text
                                style={{
                                    color: areGoldHandsBlockingProgress ? doubleColor : 'white',
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
                                        color: areGoldHandsBlockingProgress ? doubleColor : 'white'
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
                                {Object.keys(goldHandsLevels).map((number) => (
                                    <React.Fragment key={number}>
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
                                                        casinoRules,
                                                        nextGoldHandsLevels
                                                    )
                                                );
                                                setAreGoldHandsBlockingProgress(
                                                    props.progress < 100 &&
                                                        getAreGoldHandsBlockingProgress(
                                                            {
                                                                ...props.gameConfig,
                                                                goldHandsLevels: nextGoldHandsLevels
                                                            },
                                                            props.trainingHands.trained
                                                        )
                                                );
                                            }}
                                            style={{ marginTop: 16 }}
                                            trackColor={{ true: hitColor, false: 'white' }}
                                            value={goldHandsLevels[parseInt(number)] || false}
                                        />
                                        <Text
                                            style={{
                                                ...textStyle,
                                                color: areGoldHandsBlockingProgress
                                                    ? doubleColor
                                                    : 'white',
                                                marginTop: 16,
                                                paddingLeft: 4
                                            }}
                                        >
                                            {number}
                                        </Text>
                                    </React.Fragment>
                                ))}
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
                    paddingBottom: 40,
                    paddingHorizontal: 16,
                    paddingTop: 24
                }}
            >
                <Button
                    height={56}
                    backgroundColor={hitColor}
                    isEnabled={isSaveButtonEnabled}
                    onPress={saveHandler}
                    text="Save"
                    width="75%"
                />

                <Button
                    height={56}
                    backgroundColor={splitColor}
                    isEnabled={true}
                    marginTop={56}
                    onPress={() => {
                        Linking.openURL(
                            'https://wizardofodds.com/games/blackjack/strategy/4-decks/'
                        );
                    }}
                    text="View basic strategy table"
                    width="100%"
                />

                <Button
                    height={56}
                    backgroundColor={splitColor}
                    isEnabled={props.phase === Phases.finished}
                    marginTop={8}
                    onPress={() => {
                        props.navigation.navigate(RouteNames.onboarding);
                    }}
                    text="Onboarding"
                    width="100%"
                />

                <Button
                    height={56}
                    backgroundColor={surrenderColor}
                    isEnabled={true}
                    marginTop={24}
                    onPress={() => {
                        Alert.alert(
                            'Reset training',
                            'If you reset the training all training hands will be marked as ' +
                                'untrained, setting the progress and precision indicators to 0%.' +
                                'Are you sure you want to reset the training?',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel'
                                },
                                {
                                    text: 'Reset',
                                    onPress: () => {
                                        const nextTrainingHands = getEmptyTrainingHands();
                                        props.setTrainingHands(nextTrainingHands);
                                        updateTrainedHands(nextTrainingHands.trained);
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
