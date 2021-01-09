import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { Alert, ScrollView, Switch, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { updateGameConfig, updateTrainedHands } from '../async-storage';
import { Button } from '../components/button';
import { CasinoRuleSwitch } from '../components/casino-rule-switch';
import { Divider } from '../components/divider';
import { HelpIcon } from '../components/help-icon';
import { WithNavBar, WithNavBarPropsFromScreenProps } from '../components/with-nav-bar';
import { hitColor, surrenderColor } from '../constants';
import { getEmptyTrainedHands } from '../logic/trained-hands';
import { getTrainingPairsNumber } from '../logic/training-pairs';
import {
    CasinoRulesKeys,
    GameConfig,
    ScreenTypes,
    TrainedHands,
    TrainedHandsStats
} from '../types';

interface ConfigMenuProps {
    gameConfig: GameConfig;
    setGameConfig: (gameConfig: GameConfig) => void;
    setTrainedHands: (trainedHands: TrainedHands) => void;
    setTrainedHandsStats: (trainedHandsStats: TrainedHandsStats) => void;
}

const textStyle = {
    color: 'white',
    fontSize: 20
};

export const ConfigMenu: React.FC<{
    navigation: NavigationScreenProp<{ routeName: string }>;
    screenProps: ConfigMenuProps & WithNavBarPropsFromScreenProps;
}> = ({ navigation, screenProps }) => {
    const [casinoRules, setCasinoRules] = useState(screenProps.gameConfig.casinoRules);
    const [dealTrainingHands, setDealTrainingHands] = useState(
        screenProps.gameConfig.dealTrainingHands
    );
    const [reachUntrainedHands, setReachUntrainedHands] = useState(
        screenProps.gameConfig.reachUntrainedHands
    );
    const [selectedHandsNumber, setSelectedHandsNumber] = useState(
        getTrainingPairsNumber(
            screenProps.gameConfig.casinoRules,
            screenProps.gameConfig.selectedLevels
        )
    );
    const [selectedLevels, setSelectedLevels] = useState(screenProps.gameConfig.selectedLevels);

    const saveHandler = () => {
        screenProps.setGameConfig({
            casinoRules,
            dealTrainingHands,
            reachUntrainedHands,
            selectedLevels
        });
        navigation.navigate(ScreenTypes.table);
        updateGameConfig({ casinoRules, dealTrainingHands, reachUntrainedHands, selectedLevels });
    };

    const isSaveButtonEnabled =
        (screenProps.gameConfig.casinoRules[CasinoRulesKeys.canDoubleAfterSplit] !==
            casinoRules[CasinoRulesKeys.canDoubleAfterSplit] ||
            screenProps.gameConfig.casinoRules[CasinoRulesKeys.canDoubleOnAnyInitialHand] !==
                casinoRules[CasinoRulesKeys.canDoubleOnAnyInitialHand] ||
            screenProps.gameConfig.casinoRules[CasinoRulesKeys.canSurrender] !==
                casinoRules[CasinoRulesKeys.canSurrender] ||
            screenProps.gameConfig.dealTrainingHands !== dealTrainingHands ||
            screenProps.gameConfig.reachUntrainedHands !== reachUntrainedHands ||
            screenProps.gameConfig.selectedLevels[1] !== selectedLevels[1] ||
            screenProps.gameConfig.selectedLevels[2] !== selectedLevels[2] ||
            screenProps.gameConfig.selectedLevels[3] !== selectedLevels[3] ||
            screenProps.gameConfig.selectedLevels[4] !== selectedLevels[4]) &&
        (selectedLevels[1] || selectedLevels[2] || selectedLevels[3] || selectedLevels[4]);

    return (
        <WithNavBar
            navigation={navigation}
            player={screenProps.player}
            trainedHandsStats={screenProps.trainedHandsStats}
        >
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
                        Linking.openURL(
                            'https://wizardofodds.com/games/blackjack/strategy/4-decks/'
                        );
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
                            setSelectedHandsNumber(
                                getTrainingPairsNumber(nextCasinoRules, selectedLevels)
                            );
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
                            setDealTrainingHands(value);
                        }}
                        style={{ marginRight: 8 }}
                        trackColor={{ true: hitColor, false: 'white' }}
                        value={dealTrainingHands}
                    />
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 20
                        }}
                    >
                        Deal training hands
                    </Text>
                    <HelpIcon
                        onPress={() => {
                            navigation.navigate(ScreenTypes.dealTrainingHandsInfo);
                        }}
                    />
                </View>

                <View
                    style={{
                        marginTop: 16,
                        opacity: dealTrainingHands ? undefined : 0.3,
                        width: '100%'
                    }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ ...textStyle, marginLeft: 8 }}>
                            Active hand levels ({selectedHandsNumber} hands)
                        </Text>
                        <HelpIcon
                            onPress={() => {
                                navigation.navigate(ScreenTypes.handsLevelInfo);
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginTop: 16,
                            width: '100%'
                        }}
                    >
                        {Object.keys(selectedLevels).map((number) => (
                            <View key={number} style={{ flexDirection: 'row', marginRight: 8 }}>
                                <Switch
                                    disabled={!dealTrainingHands}
                                    onValueChange={(newValue) => {
                                        const nextSelectedLevels = {
                                            ...selectedLevels,
                                            [number]: newValue
                                        };
                                        setSelectedLevels(nextSelectedLevels);
                                        setSelectedHandsNumber(
                                            getTrainingPairsNumber(casinoRules, nextSelectedLevels)
                                        );
                                    }}
                                    style={{ marginRight: 8 }}
                                    trackColor={{ true: hitColor, false: 'white' }}
                                    value={selectedLevels[(number as unknown) as number] || false}
                                />
                                <Text style={textStyle}>{number}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={{ flexDirection: 'row', paddingTop: 16, width: '100%' }}>
                    <Switch
                        onValueChange={(value) => {
                            setReachUntrainedHands(value);
                        }}
                        style={{ marginRight: 8 }}
                        trackColor={{ true: hitColor, false: 'white' }}
                        value={reachUntrainedHands}
                    />
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 20
                        }}
                    >
                        Reach untrained hands
                    </Text>
                    <HelpIcon
                        onPress={() => {
                            navigation.navigate(ScreenTypes.reachUntrainedHandsInfo);
                        }}
                    />
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
                                        screenProps.setTrainedHands(nextTrainedHands);
                                        updateTrainedHands(nextTrainedHands);
                                        screenProps.setTrainedHandsStats({ passed: 0, trained: 0 });
                                    }
                                }
                            ]
                        );
                    }}
                    text="Reset training"
                    width="75%"
                />
            </ScrollView>
        </WithNavBar>
    );
};
