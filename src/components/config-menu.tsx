import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { updateGameConfig } from '../async-storage';
import { getTrainingPairsNumber } from '../logic/training-pairs';
import { CasinoRulesKeys, GameConfig, ScreenTypes } from '../types';
import { Button } from './button';
import { CasinoRuleSwitch } from './casino-rule-switch';
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
            selectedLevels
        });
        navigation.navigate(ScreenTypes.table);
        updateGameConfig({ casinoRules, selectedLevels });
    };

    const isSaveButtonEnabled =
        (screenProps.gameConfig.casinoRules[CasinoRulesKeys.canDoubleAfterSplit] !==
            casinoRules[CasinoRulesKeys.canDoubleAfterSplit] ||
            screenProps.gameConfig.casinoRules[CasinoRulesKeys.canDoubleOnAnyInitialHand] !==
                casinoRules[CasinoRulesKeys.canDoubleOnAnyInitialHand] ||
            screenProps.gameConfig.casinoRules[CasinoRulesKeys.canSurrender] !==
                casinoRules[CasinoRulesKeys.canSurrender] ||
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
            <View
                style={{
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                    padding: 16,
                    width: '100%'
                }}
            >
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

                <View style={{ width: '100%', marginTop: 24 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ ...textStyle, marginLeft: 8 }}>Active hand levels</Text>
                        <Text style={{ ...textStyle, marginLeft: 8 }}>
                            ({selectedHandsNumber} hands)
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenTypes.handsLevelInfo);
                            }}
                        >
                            <Text
                                style={{
                                    backgroundColor: '#428bca',
                                    borderRadius: 12,
                                    color: 'white',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    paddingHorizontal: 8,
                                    marginLeft: 8
                                }}
                            >
                                ?
                            </Text>
                        </TouchableOpacity>
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
                <Button
                    height={56}
                    backgroundColor="#428bca"
                    isEnabled={isSaveButtonEnabled}
                    marginTop={32}
                    onPress={saveHandler}
                    text="Save"
                    width="50%"
                />
                <Button
                    height={56}
                    backgroundColor="#428bca"
                    isEnabled={true}
                    marginTop={64}
                    onPress={() => {
                        Linking.openURL(
                            'https://wizardofodds.com/games/blackjack/strategy/4-decks/'
                        );
                    }}
                    text="View strategy table"
                    width="100%"
                />
            </View>
        </WithNavBar>
    );
};
