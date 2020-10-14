import React from 'react';
import { Text, View } from 'react-native';
import { getRelevantHand, mapGameSettingsDecisionToDynamicDecision } from '../logic/basic-strategy';
import { GameSettings, Hand } from '../types';
import { numberRange } from '../utils';

interface DecisionsProps {
    gameSettings: GameSettings;
    playerHand: Hand;
}

// const checkboxStyle = {
//     height: 32,
//     margin: 8,
//     width: 32,
//     backgroundColor: 'white'
// };

const textStyle = {
    color: 'white',
    fontSize: 20,
    paddingTop: 8
};

export const Decisions: React.FC<DecisionsProps> = (props) => {
    const relevantHand = getRelevantHand(props.playerHand);
    const handDecisions = numberRange(2, 11).map((number) => ({
        number,
        decision: mapGameSettingsDecisionToDynamicDecision(
            relevantHand.decisions[number],
            props.gameSettings
        )
    }));

    // TODO Improve styles
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
            <Text style={textStyle}>{relevantHand.name}</Text>
            {handDecisions.map((dynamicDecision) => (
                <View key={dynamicDecision.number} style={{ flexDirection: 'row', width: '100%' }}>
                    <Text style={textStyle}>{dynamicDecision.number}: </Text>
                    <Text style={textStyle}>{dynamicDecision.decision}</Text>
                </View>
            ))}
            {/* TODO Instead of listing the dependencies, allow to change the settings */}
            {relevantHand.dependencies.length > 0 && (
                <React.Fragment>
                    <Text style={textStyle}>Settings that affect this hand</Text>
                    {relevantHand.dependencies.map((dependency) => (
                        <Text key={dependency} style={textStyle}>
                            {dependency}
                        </Text>
                    ))}
                </React.Fragment>
            )}
        </View>
    );
};
