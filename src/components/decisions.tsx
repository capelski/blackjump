import React, { useState } from 'react';
// TODO Replace deprecated CheckBox component
import { CheckBox, ScrollView, Text, View } from 'react-native';
import { getRelevantHand, mapGameSettingsDecisionToDynamicDecision } from '../logic/basic-strategy';
import { GameSettings, Hand } from '../types';
import { numberRange } from '../utils';

interface DecisionsProps {
    gameSettings: GameSettings;
    playerHand: Hand;
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

export const Decisions: React.FC<DecisionsProps> = (props) => {
    const [gameSettings, setGameSettings] = useState(props.gameSettings);

    const relevantHand = getRelevantHand(props.playerHand);
    const handDecisions = numberRange(2, 11).map((number) => ({
        number,
        decision: mapGameSettingsDecisionToDynamicDecision(
            relevantHand.decisions[number],
            gameSettings
        )
    }));

    // TODO Improve styles
    return (
        <ScrollView
            style={{
                flex: 1,
                padding: 16,
                width: '100%'
            }}
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
        >
            <Text style={textStyle}>{relevantHand.name}</Text>
            {handDecisions.map((dynamicDecision) => (
                <View key={dynamicDecision.number} style={{ flexDirection: 'row', width: '100%' }}>
                    <Text style={textStyle}>{dynamicDecision.number}: </Text>
                    <Text style={textStyle}>{dynamicDecision.decision}</Text>
                </View>
            ))}

            {relevantHand.dependencies.map((dependency) => (
                <View key={dependency} style={{ flexDirection: 'row', width: '100%' }}>
                    <CheckBox
                        disabled={false}
                        value={gameSettings[dependency]}
                        onValueChange={(newValue) => {
                            setGameSettings({ ...gameSettings, [dependency]: newValue });
                        }}
                        style={checkboxStyle}
                    />
                    <Text style={textStyle}>{dependency}</Text>
                </View>
            ))}
        </ScrollView>
    );
};
