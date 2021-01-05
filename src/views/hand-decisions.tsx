import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { CasinoRuleSwitch } from '../components/casino-rule-switch';
import { HandDecisionsTable } from '../components/hand-decisions-table';
import {
    WithNavBar,
    WithNavBarParams,
    WithNavBarPropsFromScreenProps
} from '../components/with-nav-bar';
import { handRepresentationToRelevantHand } from '../logic/basic-strategy';
import { GameConfig, HandRepresentation } from '../types';

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

                <HandDecisionsTable casinoRules={casinoRules} relevantHand={relevantHand} />

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
