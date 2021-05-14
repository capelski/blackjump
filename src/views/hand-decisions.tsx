import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { DoublingPicker } from '../components/casino-rules/doubling-picker';
import { RuleSwitcher } from '../components/casino-rules/rule-switcher';
import { HandDecisionsTable } from '../components/hand-decisions-table';
import { getHandDecisionSetLevel, handDecisionSetGetters } from '../logic/hand-decision-set';
import { AppRoute, CasinoRules, CasinoRulesKeys, RouteNames, TrainingHands } from '../types';

// TODO Get only the corresponding trainingHand as prop
type HandDecisionsProps = {
    casinoRules: CasinoRules;
    route: AppRoute<RouteNames.handDecisions>;
    trainingHands: TrainingHands;
};

export const HandDecisions: React.FC<HandDecisionsProps> = (props) => {
    const [casinoRules, setCasinoRules] = useState(props.casinoRules);

    const handRepresentation = props.route.params['handRepresentation'];
    const trainingHand = props.trainingHands[handRepresentation];
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
            <View
                style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 16,
                    width: '100%'
                }}
            >
                <Text style={{ color: 'white', fontSize: 24 }}>{trainingHand.name} decisions</Text>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 20,
                        fontStyle: 'italic'
                    }}
                >
                    Level {getHandDecisionSetLevel(handDecisionSet)}
                </Text>
            </View>

            <HandDecisionsTable handDecisionSet={handDecisionSet} />

            {trainingHand.dependencies.map((dependency) => {
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
