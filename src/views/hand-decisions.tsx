import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { RuleSwitcher } from '../components/casino-rules/rule-switcher';
import { DoublingPicker } from '../components/casino-rules/doubling-picker';
import { HandDecisionsTable } from '../components/hand-decisions-table';
import { handRepresentationToRelevantHand } from '../logic/basic-strategy';
import { AppRoute, CasinoRulesKeys, GameConfig, RouteNames } from '../types';

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

            {relevantHand.dependencies.map((dependency) => {
                return dependency === CasinoRulesKeys.doubleAfterSplit ? (
                    <RuleSwitcher
                        casinoRules={casinoRules}
                        key={dependency}
                        ruleName={CasinoRulesKeys.doubleAfterSplit}
                        setCasinoRules={setCasinoRules}
                    />
                ) : dependency === CasinoRulesKeys.doubling ? (
                    <DoublingPicker
                        casinoRules={casinoRules}
                        key={dependency}
                        setCasinoRules={setCasinoRules}
                    />
                ) : (
                    <RuleSwitcher
                        casinoRules={casinoRules}
                        key={dependency}
                        ruleName={CasinoRulesKeys.surrender}
                        setCasinoRules={setCasinoRules}
                    />
                );
            })}
        </ScrollView>
    );
};
