import * as Linking from 'expo-linking';
import React, { useState } from 'react';
// TODO Replace deprecated CheckBox component
import { CheckBox, Text, View } from 'react-native';
import { GameConfig } from '../types';
import { Button } from './button';

interface ConfigMenuProps {
    gameConfig: GameConfig;
    setGameConfig: (gameConfig: GameConfig) => void;
}

const checkboxStyle = {
    height: 32,
    margin: 8,
    width: 32
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

    const setGameConfig = () => {
        props.setGameConfig({
            canDoubleAfterSplit,
            canDoubleOnAnyInitialHand
        });
    };

    const isSaveButtonEnabled =
        props.gameConfig.canDoubleAfterSplit !== canDoubleAfterSplit ||
        props.gameConfig.canDoubleOnAnyInitialHand !== canDoubleOnAnyInitialHand;

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
            <Button
                height={56}
                backgroundColor="#428bca"
                isEnabled={isSaveButtonEnabled}
                marginTop={16}
                onPress={setGameConfig}
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
