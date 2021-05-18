import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { DoublingPicker } from '../components/casino-rules/doubling-picker';
import { RuleSwitcher } from '../components/casino-rules/rule-switcher';
import { HandComponent } from '../components/hand-component';
import { HandDecisionsTable } from '../components/hand-decisions-table';
import { getTrainingHands } from '../logic/training-hand';

import {
    CardSuit,
    CasinoRulesKeys,
    Dictionary,
    GameConfig,
    Hand,
    HandCode,
    SimpleCardSymbol
} from '../types';

type GoldHandsLevelsInfoProps = {
    gameConfig: GameConfig;
};

const levelsColor: Dictionary<string, number> = {
    1: '#a0c5e4',
    2: '#5496cf',
    3: '#2e618d',
    4: '#1a3750'
};

export const GoldHandsLevelsInfo: React.FC<GoldHandsLevelsInfoProps> = (props) => {
    const [casinoRules, setCasinoRules] = useState(props.gameConfig.casinoRules);

    const trainingHands = getTrainingHands(casinoRules);

    const hardEight: Hand = {
        bet: 1,
        cards: [
            {
                isBlueCard: false,
                isGoldCard: false,
                suit: CardSuit.clubs,
                symbol: SimpleCardSymbol.Five
            },
            {
                isBlueCard: false,
                isGoldCard: false,
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
                isBlueCard: false,
                isGoldCard: false,
                suit: CardSuit.spades,
                symbol: SimpleCardSymbol.Nine
            },
            {
                isBlueCard: false,
                isGoldCard: false,
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
                Hand levels
            </Text>

            <ScrollView
                style={{
                    margin: 16
                }}
            >
                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    The level of a hand tells how many different actions must be memorized for that
                    hand depending on the dealer's up card.
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    For example, a Hard 8 has a single optimal action, regardless the dealer's up
                    card, thus it is level 1.
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
                    The more optimal actions you need to memorize for a hand, the higher the hand
                    level is. For a 9,9 for example 4 different actions must be memorized depending
                    on the dealer's up card, so it's level 4.
                </Text>

                <HandComponent
                    hand={splitNine}
                    handsNumber={1}
                    isCurrentHand={false}
                    isSoundEnabled={false}
                    skipAnimation={true}
                />
                <HandDecisionsTable handDecisionSet={trainingHands[HandCode.Split9s].decisionSet} />

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16, marginTop: 32 }}>
                    When disabling a level, the hands on that level will never be dealt as initial
                    hands if Gold hands are enabled. For example, disabling level 1 will prevent
                    Hard 8 from being dealt as initial hand while disabling level 4 will prevent
                    9,9.
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    Notice that the casino rules modify the level of some hands. For example, Hard
                    16 is level 2 when Surrender is disabled but it becomes level 3 when Surrender
                    is enabled. Here is a list of each hand level:
                </Text>

                <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                    {Object.keys(props.gameConfig.goldHandsLevels).map((level) => (
                        <View
                            key={level}
                            style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: '25%'
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 20 }}>{level}</Text>
                            <View
                                style={{
                                    marginLeft: 8,
                                    backgroundColor: levelsColor[parseInt(level)],
                                    height: 20,
                                    width: 40
                                }}
                            />
                        </View>
                    ))}
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {Object.values(trainingHands).map((trainingHand) => (
                        <Text
                            key={trainingHand.name}
                            style={{
                                backgroundColor: levelsColor[trainingHand.level],
                                color: 'white',
                                fontSize: 20,
                                marginHorizontal: '1.5%',
                                marginVertical: 4,
                                textAlign: 'center',
                                width: '30%'
                            }}
                        >
                            {trainingHand.name}
                        </Text>
                    ))}
                </View>

                <View style={{ marginBottom: 16 }}>
                    <RuleSwitcher
                        casinoRules={casinoRules}
                        ruleName={CasinoRulesKeys.blackjackPeek}
                        setCasinoRules={setCasinoRules}
                    />

                    <DoublingPicker casinoRules={casinoRules} setCasinoRules={setCasinoRules} />

                    <RuleSwitcher
                        casinoRules={casinoRules}
                        ruleName={CasinoRulesKeys.doublingAfterSplit}
                        setCasinoRules={setCasinoRules}
                    />

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
