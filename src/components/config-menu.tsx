import * as Linking from 'expo-linking';
import React, { useState } from 'react';
// TODO Replace deprecated CheckBox component
import { CheckBox, Text, View } from 'react-native';
import { getTrainingPairs } from '../logic/training-hands';
import { GameSettingsKeys, ScreenTypes, TrainingStatus } from '../types';
import { Button } from './button';

interface ConfigMenuProps {
    setCurrentScreen: (screen: ScreenTypes) => void;
    setTrainingStatus: (trainingStatus: TrainingStatus) => void;
    trainingStatus: TrainingStatus;
}

const checkboxStyle = {
    height: 32,
    margin: 8,
    width: 32,
    backgroundColor: 'white'
};

const textStyle = {
    color: 'white',
    fontSize: 20,
    paddingTop: 8
};

export const ConfigMenu: React.FC<ConfigMenuProps> = (props) => {
    const [gameSettings, setGameSettings] = useState(props.trainingStatus.gameSettings);
    const [selectedLevels, setSelectedLevels] = useState(props.trainingStatus.selectedLevels);

    const saveHandler = () => {
        const nextTrainingStatus: TrainingStatus = {
            gameSettings,
            currentTrainingPair: -1,
            selectedLevels,
            selectedTrainingPairs: []
        };
        nextTrainingStatus.selectedTrainingPairs = getTrainingPairs(nextTrainingStatus);
        props.setTrainingStatus(nextTrainingStatus);
        props.setCurrentScreen(ScreenTypes.table);
    };

    const isSaveButtonEnabled =
        props.trainingStatus.gameSettings[GameSettingsKeys.canDoubleAfterSplit] !==
            gameSettings[GameSettingsKeys.canDoubleAfterSplit] ||
        props.trainingStatus.gameSettings[GameSettingsKeys.canDoubleOnAnyInitialHand] !==
            gameSettings[GameSettingsKeys.canDoubleOnAnyInitialHand] ||
        props.trainingStatus.gameSettings[GameSettingsKeys.canSurrender] !==
            gameSettings[GameSettingsKeys.canSurrender] ||
        props.trainingStatus.selectedLevels[1] !== selectedLevels[1] ||
        props.trainingStatus.selectedLevels[2] !== selectedLevels[2] ||
        props.trainingStatus.selectedLevels[3] !== selectedLevels[3] ||
        props.trainingStatus.selectedLevels[4] !== selectedLevels[4];

    return (
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
                <View key={setting} style={{ flexDirection: 'row', width: '100%' }}>
                    <CheckBox
                        disabled={false}
                        value={gameSettings[setting]}
                        onValueChange={(newValue) => {
                            setGameSettings({ ...gameSettings, [setting]: newValue });
                        }}
                        style={checkboxStyle}
                    />
                    <Text style={textStyle}>{setting}</Text>
                </View>
            ))}

            <View style={{ width: '100%', marginVertical: 8 }}>
                <Text style={{ ...textStyle, marginLeft: 8 }}>
                    Selected hand levels ({props.trainingStatus.selectedTrainingPairs.length}{' '}
                    hands):
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                    {Object.keys(props.trainingStatus.selectedLevels).map((number) => (
                        <View key={number} style={{ flexDirection: 'row', marginRight: 8 }}>
                            <CheckBox
                                disabled={false}
                                value={selectedLevels[(number as unknown) as number] || false}
                                onValueChange={(newValue) =>
                                    setSelectedLevels({
                                        ...selectedLevels,
                                        [number]: newValue
                                    })
                                }
                                style={checkboxStyle}
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
                marginTop={16}
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
                    Linking.openURL('https://wizardofodds.com/games/blackjack/strategy/4-decks/');
                }}
                text="View strategy table"
                width="100%"
            />
        </View>
    );
};
