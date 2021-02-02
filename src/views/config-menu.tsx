import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { Alert, ScrollView, Switch, Text, View } from 'react-native';
import { updateGameConfig, updateTrainedHands } from '../async-storage';
import { Button } from '../components/button';
import { CasinoRuleSwitch } from '../components/casino-rule-switch';
import { Divider } from '../components/divider';
import { HelpIcon } from '../components/help-icon';
import { hitColor, surrenderColor } from '../constants';
import { getEmptyTrainedHands } from '../logic/trained-hands';
import { getGoldHandsNumber } from '../logic/training-pairs';
import {
    AppNavigation,
    CasinoRulesKeys,
    FailedHand,
    GameConfig,
    RouteNames,
    TrainedHands,
    TrainedHandsStats
} from '../types';

type ConfigMenuProps = {
    gameConfig: GameConfig;
    navigation: AppNavigation;
    setGameConfig: (gameConfig: GameConfig) => void;
    setFailedHands: (failedHands: FailedHand[]) => void;
    setTrainedHands: (trainedHands: TrainedHands) => void;
    setTrainedHandsStats: (trainedHandsStats: TrainedHandsStats) => void;
};

const textStyle = {
    color: 'white',
    fontSize: 20
};

export const ConfigMenu: React.FC<ConfigMenuProps> = (props) => {
    const [casinoRules, setCasinoRules] = useState(props.gameConfig.casinoRules);
    const [goldHandsLevels, setGoldHandsLevels] = useState(props.gameConfig.goldHandsLevels);
    const [goldHandsNumber, setGoldHandsNumber] = useState(
        getGoldHandsNumber(props.gameConfig.casinoRules, props.gameConfig.goldHandsLevels)
    );
    const [useBlueCards, setUseBlueCards] = useState(props.gameConfig.useBlueCards);
    const [useGoldHands, setUseGoldHands] = useState(props.gameConfig.useGoldHands);

    const saveHandler = () => {
        const nextGameConfig: GameConfig = {
            casinoRules,
            goldHandsLevels,
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
            props.gameConfig.useBlueCards !== useBlueCards ||
            props.gameConfig.useGoldHands !== useGoldHands) &&
        (goldHandsLevels[1] || goldHandsLevels[2] || goldHandsLevels[3] || goldHandsLevels[4]);

    return (
        <ScrollView
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
            style={{
                flexGrow: 1,

                padding: 16,
                width: '100%'
            }}
        >
            <Button
                height={56}
                backgroundColor={hitColor}
                isEnabled={true}
                marginBottom={24}
                marginTop={16}
                onPress={() => {
                    Linking.openURL('https://wizardofodds.com/games/blackjack/strategy/4-decks/');
                }}
                text="View strategy table"
                width="100%"
            />

            <Text
                style={{
                    color: 'white',
                    fontSize: 20,
                    marginVertical: 8,
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
                        setGoldHandsNumber(getGoldHandsNumber(nextCasinoRules, goldHandsLevels));
                    }}
                    value={casinoRules[casinoRule]}
                />
            ))}

            <Text
                style={{
                    color: 'white',
                    fontSize: 20,
                    marginBottom: 8,
                    marginTop: 24,
                    width: '100%'
                }}
            >
                App settings
            </Text>

            <Divider />

            <View style={{ flexDirection: 'row', paddingTop: 16, width: '100%' }}>
                <Switch
                    onValueChange={(value) => {
                        setUseBlueCards(value);
                    }}
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
                    }}
                    style={{ marginRight: 8 }}
                    trackColor={{ true: hitColor, false: 'white' }}
                    value={useGoldHands}
                />

                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={{
                                color: 'white',
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
                            <Text style={{ ...textStyle }}>Hand levels</Text>
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
                                            const nextGoldHands = {
                                                ...goldHandsLevels,
                                                [number]: newValue
                                            };
                                            setGoldHandsLevels(nextGoldHands);
                                            setGoldHandsNumber(
                                                getGoldHandsNumber(casinoRules, nextGoldHands)
                                            );
                                        }}
                                        style={{ marginTop: 16 }}
                                        trackColor={{ true: hitColor, false: 'white' }}
                                        value={goldHandsLevels[parseInt(number)] || false}
                                    />
                                    <Text style={{ ...textStyle, marginTop: 16, paddingLeft: 4 }}>
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

            <Button
                height={56}
                backgroundColor={hitColor}
                isEnabled={isSaveButtonEnabled}
                marginTop={40}
                onPress={saveHandler}
                text="Save"
                width="75%"
            />
            <Button
                height={56}
                backgroundColor={surrenderColor}
                isEnabled={true}
                marginBottom={40}
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
                                    const nextTrainedHands = getEmptyTrainedHands();
                                    props.setFailedHands([]);
                                    props.setTrainedHands(nextTrainedHands);
                                    updateTrainedHands(nextTrainedHands);
                                    props.setTrainedHandsStats({ passed: 0, trained: 0 });
                                }
                            }
                        ]
                    );
                }}
                text="Reset training"
                width="75%"
            />
        </ScrollView>
    );
};
