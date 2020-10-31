import React from 'react';
import { Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { HandComponent } from './hand-component';
import { WithNavBar, WithNavBarPropsFromScreenProps } from './with-nav-bar';

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
        <View
            style={{
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
                padding: 16
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
                        { suit: '\u2663', symbol: '5' },
                        { suit: '\u2665', symbol: '3' }
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
                        { suit: '\u2660', symbol: '9' },
                        { suit: '\u2666', symbol: '9' }
                    ],
                    values: [18]
                }}
                isCurrentHand={false}
            ></HandComponent>
            <Text style={{ color: 'white', fontSize: 20 }}>
                The optimal decisions for a 9,9 are to Split from 2 to 6, Stand on 7, Split from 8
                to 9 and Stand from 10 to A. A total of 4 groups of actions, thus the hand level is
                4.
            </Text>
        </View>
    </WithNavBar>
);
