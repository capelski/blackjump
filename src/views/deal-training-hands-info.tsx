import React from 'react';
import { ScrollView, Text } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Button } from '../components/button';
import { HandComponent } from '../components/hand-component';
import { WithNavBar, WithNavBarPropsFromScreenProps } from '../components/with-nav-bar';
import { CardSuit, ScreenTypes, SimpleCardSymbol, SpecialCardSymbol } from '../types';

export const DealTrainingHandsInfo: React.FC<{
    navigation: NavigationScreenProp<{ routeName: string }>;
    screenProps: WithNavBarPropsFromScreenProps;
}> = ({ navigation, screenProps }) => {
    return (
        <WithNavBar
            navigation={navigation}
            player={screenProps.player}
            trainedHandsStats={screenProps.trainedHandsStats}
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
                    Deal training hands
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    When this option is enabled you will be dealt specific initial hands,
                    prioritizing those you haven't trained yet and those which you didn't get right.
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    This feature is meant for you to practice ALL the possible hands against ALL
                    possible dealer's cards.
                </Text>

                <Text
                    style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}
                >
                    Keep in mind that, when enabled, you will get hands that are infrequent when
                    playing in real scenarios so be aware that the results (i.e. the money earnings)
                    are just an indicative.
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    Once you have trained each possible hand, disable this feature in order to train
                    in similar conditions to the ones you will find in real scenarios.
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    A consequence of enabling this feature, for example, you will never be dealt a
                    BlackJack as initial hand (because it's a hand that requires no training).
                </Text>

                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            { suit: CardSuit.spades, symbol: SimpleCardSymbol.Ace },
                            { suit: CardSuit.hearts, symbol: SpecialCardSymbol.Jack }
                        ],
                        values: [21]
                    }}
                    isCurrentHand={false}
                />

                <Text style={{ color: 'white', fontSize: 20, marginVertical: 16 }}>
                    Finally, you can choose which initial hands you want to be dealt by selecting
                    the active hand levels. You can read about hands level here:
                </Text>

                <Button
                    height={56}
                    backgroundColor="#428bca"
                    isEnabled={true}
                    marginBottom={24}
                    marginTop={16}
                    onPress={() => {
                        navigation.navigate(ScreenTypes.handsLevelInfo);
                    }}
                    text="Hands level"
                    width="100%"
                />
            </ScrollView>
        </WithNavBar>
    );
};
