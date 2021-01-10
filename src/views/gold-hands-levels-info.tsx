import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { CasinoRuleSwitch } from '../components/casino-rule-switch';
import { HandComponent } from '../components/hand-component';
import { HandDecisionsTable } from '../components/hand-decisions-table';
import { WithNavBar, WithNavBarPropsFromScreenProps } from '../components/with-nav-bar';
import { handToRelevantHand } from '../logic/basic-strategy';
import { decisionsDictionary } from '../logic/decisions-dictionary';
import {
    CardSuit,
    CasinoRulesKeys,
    Dictionary,
    GameConfig,
    Hand,
    NavigationProps,
    ScreenTypes,
    SimpleCardSymbol
} from '../types';

type GoldHandsLevelsInfoProps = NavigationProps<ScreenTypes.goldHandsLevelsInfo> &
    WithNavBarPropsFromScreenProps & {
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
        <WithNavBar
            navigation={props.navigation}
            route={props.route}
            player={props.player}
            trainedHandsStats={props.trainedHandsStats}
        >
            <ScrollView
                style={{
                    margin: 16,
                    overflow: 'scroll'
                }}
                contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text
                    style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}
                >
                    Hand levels
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    The level of a hand tells how many different actions must be memorized for that
                    hand depending on the dealer's up card.
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    For example, a Hard 8 has a single optimal action, regardless the dealer's up
                    card, thus it is level 1.
                </Text>

                <HandComponent hand={hardEight} isCurrentHand={false} />
                <HandDecisionsTable
                    casinoRules={props.gameConfig.casinoRules}
                    relevantHand={handToRelevantHand(hardEight)}
                />

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16, marginTop: 32 }}>
                    The more optimal actions you need to memorize for a hand, the higher the hand
                    level is. For a 9,9 for example 4 different actions must be memorized depending
                    on the dealer's up card, so it's level 4.
                </Text>

                <HandComponent hand={splitNine} isCurrentHand={false} />
                <HandDecisionsTable
                    casinoRules={props.gameConfig.casinoRules}
                    relevantHand={handToRelevantHand(splitNine)}
                />

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
                    {Object.values(decisionsDictionary).map((relevantHand) => {
                        const level = relevantHand.level(casinoRules);
                        return (
                            <Text
                                key={relevantHand.name}
                                style={{
                                    backgroundColor: levelsColor[level],
                                    color: 'white',
                                    fontSize: 20,
                                    marginHorizontal: '1.5%',
                                    marginVertical: 4,
                                    textAlign: 'center',
                                    width: '30%'
                                }}
                            >
                                {relevantHand.name}
                            </Text>
                        );
                    })}
                </View>

                <View style={{ marginBottom: 16 }}>
                    {Object.values(CasinoRulesKeys).map((casinoRule) => (
                        <CasinoRuleSwitch
                            casinoRule={casinoRule}
                            key={casinoRule}
                            onValueChange={(newValue) => {
                                const nextCasinoRules = { ...casinoRules, [casinoRule]: newValue };
                                setCasinoRules(nextCasinoRules);
                            }}
                            value={casinoRules[casinoRule]}
                        />
                    ))}
                </View>
            </ScrollView>
        </WithNavBar>
    );
};
