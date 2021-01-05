import React from 'react';
import { ScrollView, Text } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { HandComponent } from '../components/hand-component';
import { WithNavBar, WithNavBarPropsFromScreenProps } from '../components/with-nav-bar';
import { CardSuit, SimpleCardSymbol } from '../types';

export const HandsLevelInfo: React.FC<{
    navigation: NavigationScreenProp<{ routeName: string }>;
    screenProps: WithNavBarPropsFromScreenProps;
}> = ({ navigation, screenProps }) => (
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
            <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                A hand level tells how many different optimal actions are for that hand depending on
                the dealer's up card. For example:
            </Text>

            <HandComponent
                hand={{
                    bet: 1,
                    cards: [
                        { suit: CardSuit.clubs, symbol: SimpleCardSymbol.Five },
                        { suit: CardSuit.hearts, symbol: SimpleCardSymbol.Three }
                    ],
                    values: [8]
                }}
                isCurrentHand={false}
            ></HandComponent>
            <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                The optimal decision for a Hard 8 is to always Hit, no matter the dealer's up card.
                Thus the hand level is 1.
            </Text>

            <HandComponent
                hand={{
                    bet: 1,
                    cards: [
                        { suit: CardSuit.spades, symbol: SimpleCardSymbol.Nine },
                        { suit: CardSuit.diamonds, symbol: SimpleCardSymbol.Nine }
                    ],
                    values: [18]
                }}
                isCurrentHand={false}
            ></HandComponent>
            <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                The optimal decisions for a 9,9 are to Split from 2 to 6, Stand on 7, Split from 8
                to 9 and Stand from 10 to A. A total of 4 groups of actions, thus the hand level is
                4.
            </Text>

            <Text style={{ color: 'white', fontSize: 20 }}>
                Keep in mind that the game settings affect the level of some hands (e.g. Hard 16 is
                level 2, but becomes level 3 when Surrender action is enabled).
            </Text>
        </ScrollView>
    </WithNavBar>
);
