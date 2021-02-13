import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { CasinoRuleSwitch } from '../components/casino-rule-switch';
import { HandDecisionsTable } from '../components/hand-decisions-table';
import { handRepresentationToRelevantHand } from '../logic/basic-strategy';
import { AppRoute, GameConfig, RouteNames } from '../types';

type HandDecisionsProps = {
    gameConfig: GameConfig;
    route: AppRoute<RouteNames.handDecisions>;
};

export const HandDecisions: React.FC<HandDecisionsProps> = (props) => {
    const [casinoRules, setCasinoRules] = useState(props.gameConfig.casinoRules);

    const handRepresentation = props.route.params['handRepresentation'];
    const relevantHand = handRepresentationToRelevantHand(handRepresentation);

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
                {relevantHand.name} decisions
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
    );
};
