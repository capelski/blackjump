import React, { useState } from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { colors } from '../constants';
import { getRelevantHand, mapGameSettingsDecisionToDynamicDecision } from '../logic/basic-strategy';
import { GameSettings, Player } from '../types';
import { numberRange } from '../utils';
import { WithNavBar, WithNavBarPropsFromScreenProps } from './with-nav-bar';

interface DecisionsProps {
    gameSettings: GameSettings;
    player: Player;
}

export const Decisions: React.FC<{
    navigation: NavigationScreenProp<{ routeName: string }>;
    screenProps: DecisionsProps & WithNavBarPropsFromScreenProps;
}> = ({ navigation, screenProps }) => {
    const [gameSettings, setGameSettings] = useState(screenProps.gameSettings);

    const relevantHand = getRelevantHand(screenProps.player.lastActionHand!);
    const handDecisions = numberRange(2, 11).map((number) => ({
        number,
        decision: mapGameSettingsDecisionToDynamicDecision(
            relevantHand.decisions[number],
            gameSettings
        )
    }));

    return (
        <WithNavBar
            navigation={navigation}
            player={screenProps.player}
            totalAttemptedDecisions={screenProps.totalAttemptedDecisions}
            totalRightDecisions={screenProps.totalRightDecisions}
        >
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
                    <View
                        key={dynamicDecision.number}
                        style={{ flexDirection: 'row', width: '100%' }}
                    >
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
                        <Switch
                            disabled={false}
                            onValueChange={(newValue) => {
                                setGameSettings({ ...gameSettings, [dependency]: newValue });
                            }}
                            style={{ marginRight: 8 }}
                            trackColor={{ true: '#428bca', false: 'white' }}
                            value={gameSettings[dependency]}
                        />
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 20
                            }}
                        >
                            {dependency}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </WithNavBar>
    );
};
