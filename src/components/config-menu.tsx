import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { getTrainingPairs } from '../logic/training-hands';
import { GameSettingsKeys, ScreenTypes, TrainingStatus } from '../types';
import { Button } from './button';
import { WithNavBar, WithNavBarPropsFromScreenProps } from './with-nav-bar';

interface ConfigMenuProps {
    setTrainingStatus: (trainingStatus: TrainingStatus) => void;
    trainingStatus: TrainingStatus;
}

const textStyle = {
    color: 'black',
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
                    backgroundColor: 'white',
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
                            value={gameSettings[setting]}
                            onValueChange={(newValue) => {
                                const nextGameSettings = { ...gameSettings, [setting]: newValue };
                                setGameSettings(nextGameSettings);
                                setSelectedTrainingPairs(
                                    getTrainingPairs(nextGameSettings, selectedLevels)
                                );
                            }}
                            style={{ marginRight: 8 }}
                        />
                        <Text style={textStyle}>{setting}</Text>
                    </View>
                ))}

                <View style={{ width: '100%', marginTop: 24 }}>
                    <Text style={{ ...textStyle, marginLeft: 8 }}>
                        Selected hand levels ({selectedTrainingPairs.length} hands):
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginTop: 8,
                            width: '100%'
                        }}
                    >
                        {Object.keys(screenProps.trainingStatus.selectedLevels).map((number) => (
                            <View key={number} style={{ flexDirection: 'row', marginRight: 8 }}>
                                <Switch
                                    disabled={false}
                                    value={selectedLevels[(number as unknown) as number] || false}
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
