import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DoublingPicker } from '../components/casino-rules/doubling-picker';
import { RuleSwitcher } from '../components/casino-rules/rule-switcher';
import { SplitsNumberPicker } from '../components/casino-rules/splits-number-picker';
import { HandComponent } from '../components/hand-component';
import { HandDecisionsTable } from '../components/hand-decisions-table';
import { getTrainingHands } from '../logic/training-hand';

import {
    AppNavigation,
    CardSuit,
    CasinoRulesKeys,
    Dictionary,
    Doubling,
    GameConfig,
    Hand,
    HandCode,
    RouteNames,
    SimpleCardSymbol,
    SplitsNumber
} from '../types';

type HandLevelProps = {
    gameConfig: GameConfig;
    navigation: AppNavigation;
};

const levelsColor: Dictionary<string, number> = {
    1: '#a0c5e4',
    2: '#5496cf',
    3: '#2e618d',
    4: '#1a3750'
};

export const HandLevel: React.FC<HandLevelProps> = (props) => {
    const [casinoRules, setCasinoRules] = useState(props.gameConfig.casinoRules);

    const trainingHands = getTrainingHands(casinoRules);

    const hardEight: Hand = {
        bet: 1,
        cards: [
            {
                isRandom: true,
                suit: CardSuit.clubs,
                symbol: SimpleCardSymbol.Five
            },
            {
                isRandom: true,
                suit: CardSuit.hearts,
                symbol: SimpleCardSymbol.Three
            }
        ],
        values: [8]
    };
    const splitNine: Hand = {
        bet: 1,
        cards: [
            {
                isRandom: true,
                suit: CardSuit.spades,
                symbol: SimpleCardSymbol.Nine
            },
            {
                isRandom: true,
                suit: CardSuit.diamonds,
                symbol: SimpleCardSymbol.Nine
            }
        ],
        values: [18]
    };

    return (
        <React.Fragment>
            <Text
                style={{
                    color: 'white',
                    fontSize: 24,
                    fontWeight: 'bold',
                    paddingTop: 16,
                    textAlign: 'center'
                }}
            >
                Hand level
            </Text>

            <ScrollView
                style={{
                    margin: 16
                }}
            >
                <Text style={{ color: 'white', fontSize: 20 }}>
                    The level of a hand tells how many different action ranges the hand has
                    depending on the dealer's up card:
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16, marginTop: 32 }}>
                    • Hard 8 has a single action range, Hit (Dealer's 2-A), thus it's level 1
                </Text>

                <HandComponent
                    hand={hardEight}
                    handsNumber={1}
                    isCurrentHand={false}
                    isSoundEnabled={false}
                    skipAnimation={true}
                />
                <HandDecisionsTable handDecisionSet={trainingHands[HandCode.Hard8].decisionSet} />

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16, marginTop: 32 }}>
                    • 9,9 has four action ranges (when splitting is enabled), Split (2-6)/Stand{' '}
                    (7)/Split (8-9)/Stand (10-A), thus it's level 4
                </Text>

                <HandComponent
                    hand={splitNine}
                    handsNumber={1}
                    isCurrentHand={false}
                    isSoundEnabled={false}
                    skipAnimation={true}
                />
                <HandDecisionsTable handDecisionSet={trainingHands[HandCode.Split9s].decisionSet} />

                <Text style={{ color: 'white', fontSize: 20, marginTop: 32 }}>
                    When using Untrained pairs priority, the Initial hand levels will restrict the
                    initial hands being dealt. For example:
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginTop: 16 }}>
                    • Disabling level 1 will prevent Hard 8 initial hand, as well as all other level
                    1 hands
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginTop: 16 }}>
                    • Disabling level 4 will prevent 9,9 initial hand, as well as all other level 4
                    hands
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginTop: 32 }}>
                    P.D: Casino rules modify the level of some hands (e.g. Hard 16 is level 2 when
                    Surrender is disabled but it becomes level 3 when enabling Surrender):
                </Text>

                <View style={{ flexDirection: 'row', marginTop: 24 }}>
                    {Object.keys(props.gameConfig.untrainedPairsHandLevels).map((level) => (
                        <Text
                            key={level}
                            style={{
                                backgroundColor: levelsColor[parseInt(level)],
                                color: 'white',
                                flexGrow: 1,
                                fontSize: 20,
                                textAlign: 'center'
                            }}
                        >
                            {level}
                        </Text>
                    ))}
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 16 }}>
                    {Object.values(trainingHands).map((trainingHand) => (
                        <TouchableOpacity
                            key={trainingHand.name}
                            onPress={() => {
                                props.navigation.navigate(RouteNames.handDecisions, {
                                    trainingHand
                                });
                            }}
                            style={{
                                alignItems: 'center',
                                backgroundColor: levelsColor[trainingHand.level],
                                marginBottom: '1%',
                                marginRight: '1%',
                                width: '32.33%'
                            }}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 20
                                }}
                            >
                                {trainingHand.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={{ marginBottom: 16 }}>
                    <RuleSwitcher
                        casinoRules={casinoRules}
                        ruleName={CasinoRulesKeys.blackjackPeek}
                        setCasinoRules={setCasinoRules}
                    />

                    <RuleSwitcher
                        casinoRules={casinoRules}
                        ruleName={CasinoRulesKeys.dealerHitsSoft17}
                        setCasinoRules={setCasinoRules}
                    />

                    <DoublingPicker casinoRules={casinoRules} setCasinoRules={setCasinoRules} />

                    <RuleSwitcher
                        casinoRules={casinoRules}
                        isDisabled={
                            casinoRules[CasinoRulesKeys.doubling] === Doubling.none ||
                            casinoRules[CasinoRulesKeys.splitsNumber] === SplitsNumber.none
                        }
                        ruleName={CasinoRulesKeys.doublingAfterSplit}
                        setCasinoRules={setCasinoRules}
                    />

                    <SplitsNumberPicker casinoRules={casinoRules} setCasinoRules={setCasinoRules} />

                    <RuleSwitcher
                        casinoRules={casinoRules}
                        ruleName={CasinoRulesKeys.surrender}
                        setCasinoRules={setCasinoRules}
                    />
                </View>
            </ScrollView>
        </React.Fragment>
    );
};
