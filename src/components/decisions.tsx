import React, { useState } from 'react';
// TODO Replace deprecated CheckBox component
import { CheckBox, ScrollView, Text, View } from 'react-native';
import { colors } from '../constants';
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

    return (
        <ScrollView
            style={{
                flex: 1,
                padding: 16,
                width: '100%'
            }}
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
        >
            <Text style={{ color: 'white', fontSize: 30, paddingTop: 16, paddingBottom: 8 }}>
                {relevantHand.name}
            </Text>

            {handDecisions.map((dynamicDecision) => (
                <View key={dynamicDecision.number} style={{ flexDirection: 'row', width: '100%' }}>
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 20,
                            fontWeight: 'bold',
                            paddingTop: 12,
                            textAlign: 'center',
                            width: '15%'
                        }}
                    >
                        {dynamicDecision.number}
                    </Text>
                    <Text
                        style={{
                            backgroundColor: colors[dynamicDecision.decision],
                            color: 'white',
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: 8,
                            paddingVertical: 4,
                            paddingHorizontal: 8,
                            textAlign: 'center',
                            width: '85%'
                        }}
                    >
                        {dynamicDecision.decision}
                    </Text>
                </View>
            ))}

            {relevantHand.dependencies.map((dependency) => (
                <View
                    key={dependency}
                    style={{ flexDirection: 'row', width: '100%', paddingTop: 16 }}
                >
                    <CheckBox
                        disabled={false}
                        value={gameSettings[dependency]}
                        onValueChange={(newValue) => {
                            setGameSettings({ ...gameSettings, [dependency]: newValue });
                        }}
                        style={checkboxStyle}
                    />
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 20,
                            paddingTop: 8
                        }}
                    >
                        {dependency}
                    </Text>
                </View>
            ))}
        </ScrollView>
    );
};
