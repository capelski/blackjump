import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
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
    SimpleCardSymbol
} from '../types';

interface HandsLevelInfoProps extends WithNavBarPropsFromScreenProps {
    gameConfig: GameConfig;
}

const levelsColor: Dictionary<string, number> = {
    1: 'white',
    2: 'yellow',
    3: 'orange',
    4: 'lightcoral'
};

export const HandsLevelInfo: React.FC<{
    navigation: NavigationScreenProp<{ routeName: string }>;
    screenProps: HandsLevelInfoProps;
}> = ({ navigation, screenProps }) => {
    const [casinoRules, setCasinoRules] = useState(screenProps.gameConfig.casinoRules);

    const hardEight: Hand = {
        bet: 1,
        cards: [
            { suit: CardSuit.clubs, symbol: SimpleCardSymbol.Five },
            { suit: CardSuit.hearts, symbol: SimpleCardSymbol.Three }
        ],
        values: [8]
    };
    const splitNine: Hand = {
        bet: 1,
        cards: [
            { suit: CardSuit.spades, symbol: SimpleCardSymbol.Nine },
            { suit: CardSuit.diamonds, symbol: SimpleCardSymbol.Nine }
        ],
        values: [18]
    };

    return (
        <WithNavBar
            navigation={navigation}
            player={screenProps.player}
            totalAttemptedDecisions={screenProps.totalAttemptedDecisions}
            totalRightDecisions={screenProps.totalRightDecisions}
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
                <Text style={{ color: 'white', fontSize: 24, marginBottom: 16 }}>Hands level</Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    A hand level tells how many different groups of optimal actions there are for
                    that hand depending on the dealer's up card.
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    For example, the optimal action for a Hard 8 is to always Hit, no matter the
                    dealer's up card, thus it's level 1 (only one group of optimal actions).
                </Text>

                <HandComponent hand={hardEight} isCurrentHand={false} />
                <HandDecisionsTable
                    casinoRules={screenProps.gameConfig.casinoRules}
                    relevantHand={handToRelevantHand(hardEight)}
                />

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16, marginTop: 32 }}>
                    A 9,9 however has 4 groups of optimal actions depending on the dealer's up card:
                    Split (dealer's 2 to 6), Stand (dealer's 7), Split (dealer's 8 and 9) and Stand
                    (dealer's 10 and A), so it's level 4.
                </Text>

                <HandComponent hand={splitNine} isCurrentHand={false} />
                <HandDecisionsTable
                    casinoRules={screenProps.gameConfig.casinoRules}
                    relevantHand={handToRelevantHand(splitNine)}
                />

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16, marginTop: 32 }}>
                    Finally, keep in mind that the casino rules modify the level of some hands. For
                    example, Hard 16 is level 2 when Surrender is disabled but it becomes level 3
                    when Surrender is enabled. Here is a list of each hand level:
                </Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {Object.values(decisionsDictionary).map((relevantHand) => {
                        const level = relevantHand.level(casinoRules);
                        return (
                            <Text
                                key={relevantHand.name}
                                style={{
                                    color: levelsColor[level],
                                    fontSize: 20,
                                    marginVertical: 4,
                                    textAlign: 'center',
                                    width: '33%'
                                }}
                            >
                                {relevantHand.name}: {level}
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
