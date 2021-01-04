import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { updateGameConfig } from '../async-storage';
import { getTrainingPairsNumber } from '../logic/training-pairs';
import { CasinoRulesKeys, GameConfig, ScreenTypes } from '../types';
import { Button } from './button';
import { CasinoRuleSwitch } from './casino-rule-switch';
import { Divider } from './divider';
import { HelpIcon } from './help-icon';
import { WithNavBar, WithNavBarPropsFromScreenProps } from './with-nav-bar';

interface ConfigMenuProps {
    gameConfig: GameConfig;
    setGameConfig: (gameConfig: GameConfig) => void;
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
    const [dealUntrainedHands, setDealUntrainedHands] = useState(
        screenProps.gameConfig.dealUntrainedHands
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
            dealUntrainedHands,
            reachUntrainedHands,
            selectedLevels
        });
        navigation.navigate(ScreenTypes.table);
        updateGameConfig({ casinoRules, dealUntrainedHands, reachUntrainedHands, selectedLevels });
    };

    const isSaveButtonEnabled =
        (screenProps.gameConfig.casinoRules[CasinoRulesKeys.canDoubleAfterSplit] !==
            casinoRules[CasinoRulesKeys.canDoubleAfterSplit] ||
            screenProps.gameConfig.casinoRules[CasinoRulesKeys.canDoubleOnAnyInitialHand] !==
                casinoRules[CasinoRulesKeys.canDoubleOnAnyInitialHand] ||
            screenProps.gameConfig.casinoRules[CasinoRulesKeys.canSurrender] !==
                casinoRules[CasinoRulesKeys.canSurrender] ||
            screenProps.gameConfig.dealUntrainedHands !== dealUntrainedHands ||
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
            totalAttemptedDecisions={screenProps.totalAttemptedDecisions}
            totalRightDecisions={screenProps.totalRightDecisions}
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
                    backgroundColor="#428bca"
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
                            setDealUntrainedHands(value);
                        }}
                        style={{ marginRight: 8 }}
                        trackColor={{ true: '#428bca', false: 'white' }}
                        value={dealUntrainedHands}
                    />
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 20
                        }}
                    >
                        Deal untrained hands
                    </Text>
                    <HelpIcon
                        onPress={() => {
                            // TODO navigation.navigate(ScreenTypes.dealUntrainedHandsInfo);
                        }}
                    />
                </View>

                {/* TODO Levels don't apply if deal untrained hands is disabled */}
                <View style={{ width: '100%', marginTop: 16 }}>
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
                        {Object.keys(screenProps.gameConfig.selectedLevels).map((number) => (
                            <View key={number} style={{ flexDirection: 'row', marginRight: 8 }}>
                                <Switch
                                    disabled={false}
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
                                    trackColor={{ true: '#428bca', false: 'white' }}
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
                        trackColor={{ true: '#428bca', false: 'white' }}
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
                            // TODO navigation.navigate(ScreenTypes.reachUntrainedHandsInfo);
                        }}
                    />
                </View>

                <Button
                    height={56}
                    backgroundColor="#428bca"
                    isEnabled={isSaveButtonEnabled}
                    marginBottom={40}
                    marginTop={32}
                    onPress={saveHandler}
                    text="Save"
                    width="50%"
                />
            </ScrollView>
        </WithNavBar>
    );
};
