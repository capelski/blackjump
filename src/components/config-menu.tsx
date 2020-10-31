import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { getTrainingPairs } from '../logic/training-hands';
import { updatePersistedSettings } from '../persisted-settings';
import { GameSettingsKeys, ScreenTypes, TrainingStatus } from '../types';
import { Button } from './button';
import { WithNavBar, WithNavBarPropsFromScreenProps } from './with-nav-bar';

interface ConfigMenuProps {
    setTrainingStatus: (trainingStatus: TrainingStatus) => void;
    trainingStatus: TrainingStatus;
}

const textStyle = {
    color: 'white',
    fontSize: 20
};

export const ConfigMenu: React.FC<{
    navigation: NavigationScreenProp<{ routeName: string }>;
    screenProps: ConfigMenuProps & WithNavBarPropsFromScreenProps;
}> = ({ navigation, screenProps }) => {
    const [gameSettings, setGameSettings] = useState(screenProps.trainingStatus.gameSettings);
    const [selectedLevels, setSelectedLevels] = useState(screenProps.trainingStatus.selectedLevels);
    const [selectedTrainingPairs, setSelectedTrainingPairs] = useState(
        screenProps.trainingStatus.selectedTrainingPairs
    );

    const saveHandler = () => {
        screenProps.setTrainingStatus({
            gameSettings,
            currentTrainingPair: -1,
            selectedLevels,
            selectedTrainingPairs
        });
        navigation.navigate(ScreenTypes.table);
        updatePersistedSettings({ gameSettings, selectedLevels });
    };

    const isSaveButtonEnabled =
        (screenProps.trainingStatus.gameSettings[GameSettingsKeys.canDoubleAfterSplit] !==
            gameSettings[GameSettingsKeys.canDoubleAfterSplit] ||
            screenProps.trainingStatus.gameSettings[GameSettingsKeys.canDoubleOnAnyInitialHand] !==
                gameSettings[GameSettingsKeys.canDoubleOnAnyInitialHand] ||
            screenProps.trainingStatus.gameSettings[GameSettingsKeys.canSurrender] !==
                gameSettings[GameSettingsKeys.canSurrender] ||
            screenProps.trainingStatus.selectedLevels[1] !== selectedLevels[1] ||
            screenProps.trainingStatus.selectedLevels[2] !== selectedLevels[2] ||
            screenProps.trainingStatus.selectedLevels[3] !== selectedLevels[3] ||
            screenProps.trainingStatus.selectedLevels[4] !== selectedLevels[4]) &&
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
                {Object.values(GameSettingsKeys).map((setting) => (
                    <View
                        key={setting}
                        style={{ flexDirection: 'row', marginTop: 16, width: '100%' }}
                    >
                        <Switch
                            disabled={false}
                            onValueChange={(newValue) => {
                                const nextGameSettings = { ...gameSettings, [setting]: newValue };
                                setGameSettings(nextGameSettings);
                                setSelectedTrainingPairs(
                                    getTrainingPairs(nextGameSettings, selectedLevels)
                                );
                            }}
                            style={{ marginRight: 8 }}
                            trackColor={{ true: '#428bca', false: 'white' }}
                            value={gameSettings[setting]}
                        />
                        <Text style={textStyle}>{setting}</Text>
                    </View>
                ))}

                <View style={{ width: '100%', marginTop: 24 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ ...textStyle, marginLeft: 8 }}>Active hand levels</Text>
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
                        <Text style={{ ...textStyle, marginLeft: 8 }}>
                            ({selectedTrainingPairs.length} hands)
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginTop: 16,
                            width: '100%'
                        }}
                    >
                        {Object.keys(screenProps.trainingStatus.selectedLevels).map((number) => (
                            <View key={number} style={{ flexDirection: 'row', marginRight: 8 }}>
                                <Switch
                                    disabled={false}
                                    onValueChange={(newValue) => {
                                        const nextSelectedLevels = {
                                            ...selectedLevels,
                                            [number]: newValue
                                        };
                                        setSelectedLevels(nextSelectedLevels);
                                        setSelectedTrainingPairs(
                                            getTrainingPairs(gameSettings, nextSelectedLevels)
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
