import * as Linking from 'expo-linking';
import React, { useState } from 'react';
// TODO Replace deprecated CheckBox component
import { CheckBox, Text, View } from 'react-native';
import { getTrainingPairs } from '../logic/training-hands';
import { GameConfig, ScreenTypes } from '../types';
import { Button } from './button';

interface ConfigMenuProps {
    gameConfig: GameConfig;
    setCurrentScreen: (screen: ScreenTypes) => void;
    setGameConfig: (gameConfig: GameConfig) => void;
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
    const [canDoubleAfterSplit, setCanDoubleAfterSplit] = useState(
        props.gameConfig.canDoubleAfterSplit
    );
    const [canDoubleOnAnyInitialHand, setCanDoubleOnAnyInitialHand] = useState(
        props.gameConfig.canDoubleOnAnyInitialHand
    );
    const [canSurrender, setCanSurrender] = useState(props.gameConfig.canSurrender);
    const [selectedLevels, setSelectedLevels] = useState(props.gameConfig.selectedLevels);

    const saveHandler = () => {
        const nextGameConfig: GameConfig = {
            canDoubleAfterSplit,
            canDoubleOnAnyInitialHand,
            canSurrender,
            currentTrainingPair: -1,
            selectedLevels,
            selectedTrainingPairs: []
        };
        nextGameConfig.selectedTrainingPairs = getTrainingPairs(nextGameConfig);
        props.setGameConfig(nextGameConfig);
        props.setCurrentScreen(ScreenTypes.table);
    };

    const isSaveButtonEnabled =
        props.gameConfig.canDoubleAfterSplit !== canDoubleAfterSplit ||
        props.gameConfig.canDoubleOnAnyInitialHand !== canDoubleOnAnyInitialHand ||
        props.gameConfig.canSurrender !== canSurrender ||
        props.gameConfig.selectedLevels[1] !== selectedLevels[1] ||
        props.gameConfig.selectedLevels[2] !== selectedLevels[2] ||
        props.gameConfig.selectedLevels[3] !== selectedLevels[3] ||
        props.gameConfig.selectedLevels[4] !== selectedLevels[4];

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
            <View style={{ flexDirection: 'row', width: '100%' }}>
                <CheckBox
                    disabled={false}
                    value={canDoubleAfterSplit}
                    onValueChange={(newValue) => setCanDoubleAfterSplit(newValue)}
                    style={checkboxStyle}
                />
                <Text style={textStyle}>Can double after split</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%' }}>
                <CheckBox
                    disabled={false}
                    value={canDoubleOnAnyInitialHand}
                    onValueChange={(newValue) => setCanDoubleOnAnyInitialHand(newValue)}
                    style={checkboxStyle}
                />
                <Text style={textStyle}>Can double on any initial hand</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%' }}>
                <CheckBox
                    disabled={false}
                    value={canSurrender}
                    onValueChange={(newValue) => setCanSurrender(newValue)}
                    style={checkboxStyle}
                />
                <Text style={textStyle}>Can surrender</Text>
            </View>
            <View style={{ width: '100%', marginVertical: 8 }}>
                <Text style={{ ...textStyle, marginLeft: 8 }}>
                    Selected hand levels ({props.gameConfig.selectedTrainingPairs.length} hands):
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                    {Object.keys(props.gameConfig.selectedLevels).map((number) => (
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
