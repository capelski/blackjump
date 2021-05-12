import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { DoublingPicker } from '../components/casino-rules/doubling-picker';
import { RuleSwitcher } from '../components/casino-rules/rule-switcher';
import { HandDecisionsTable } from '../components/hand-decisions-table';
import { handDecisionSetGetters } from '../logic/hand-decision-set';
import { AppRoute, CasinoRules, CasinoRulesKeys, RelevantHands, RouteNames } from '../types';

type HandDecisionsProps = {
    casinoRules: CasinoRules;
    relevantHands: RelevantHands;
    route: AppRoute<RouteNames.handDecisions>;
};

export const HandDecisions: React.FC<HandDecisionsProps> = (props) => {
    const [casinoRules, setCasinoRules] = useState(props.casinoRules);

    const handRepresentation = props.route.params['handRepresentation'];
    const relevantHand = props.relevantHands[handRepresentation];
    const handDecisionSet = handDecisionSetGetters[handRepresentation](casinoRules);

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
            <HandDecisionsTable handDecisionSet={handDecisionSet} />

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
