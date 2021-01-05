import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { CasinoRuleSwitch } from '../components/casino-rule-switch';
import {
    WithNavBar,
    WithNavBarParams,
    WithNavBarPropsFromScreenProps
} from '../components/with-nav-bar';
import { colors } from '../constants';
import {
    handRepresentationToRelevantHand,
    mapCasinoRulesDecisionToDynamicDecision
} from '../logic/basic-strategy';
import { GameConfig, HandRepresentation } from '../types';
import { numberRange } from '../utils';

interface HandDecisionsProps {
    gameConfig: GameConfig;
}

export interface HandDecisionsParams extends WithNavBarParams {
    handRepresentation: HandRepresentation;
}

export const HandDecisions: React.FC<{
    navigation: NavigationScreenProp<{ routeName: string }, HandDecisionsParams>;
    screenProps: HandDecisionsProps & WithNavBarPropsFromScreenProps;
}> = ({ navigation, screenProps }) => {
    const [casinoRules, setCasinoRules] = useState(screenProps.gameConfig.casinoRules);

    const handRepresentation = navigation.getParam('handRepresentation');
    const relevantHand = handRepresentationToRelevantHand(handRepresentation);
    const handDecisions = numberRange(2, 11).map((number) => ({
        number,
        decision: mapCasinoRulesDecisionToDynamicDecision(
            relevantHand.decisions[number],
            casinoRules
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
                    <CasinoRuleSwitch
                        casinoRule={dependency}
                        key={dependency}
                        onValueChange={(newValue) => {
                            setCasinoRules({ ...casinoRules, [dependency]: newValue });
                        }}
                        value={casinoRules[dependency]}
                    />
                ))}
            </ScrollView>
        </WithNavBar>
    );
};
