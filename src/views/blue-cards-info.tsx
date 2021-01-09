import React from 'react';
import { ScrollView, Text } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { HandComponent } from '../components/hand-component';
import { WithNavBar, WithNavBarPropsFromScreenProps } from '../components/with-nav-bar';
import { CardSuit, Hand, SimpleCardSymbol } from '../types';

export const BlueCardsInfo: React.FC<{
    navigation: NavigationScreenProp<{ routeName: string }>;
    screenProps: WithNavBarPropsFromScreenProps;
}> = ({ navigation, screenProps }) => {
    const hardFourteen: Hand = {
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
                suit: CardSuit.diamonds,
                symbol: SimpleCardSymbol.Nine
            }
        ],
        values: [14]
    };

    const splitFour: Hand = {
        bet: 1,
        cards: [
            {
                isBlueCard: false,
                isGoldCard: false,
                suit: CardSuit.clubs,
                symbol: SimpleCardSymbol.Four
            },
            {
                isBlueCard: false,
                isGoldCard: false,
                suit: CardSuit.spades,
                symbol: SimpleCardSymbol.Four
            }
        ],
        values: [8]
    };

    return (
        <WithNavBar
            navigation={navigation}
            player={screenProps.player}
            trainedHandsStats={screenProps.trainedHandsStats}
        >
            <ScrollView
                style={{
                    flexGrow: 1,
                    margin: 16
                }}
                contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text
                    style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}
                >
                    Blue cards
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    When this option is enabled, each time you Hit or Split a hand, instead of being
                    a dealt a random card, you will be dealt a card that turns your current hand
                    into a hand you haven't trained yet (or a hand you didn't get right) against the
                    dealer's up card.
                </Text>

                <Text
                    style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}
                >
                    Notice that enabling this option will increase your probabilities of winning,
                    since you won't get busted as much as you would when being dealt random cards
                    (specially on high value hands like Hard 16).
                </Text>

                <HandComponent hand={hardFourteen} isCurrentHand={false} />

                <Text style={{ color: 'white', fontSize: 20, marginVertical: 16 }}>
                    Let's say you have a Hard 14 and the dealer's up card is a 9. If you decide to
                    Hit, the app will check whether there are any hands greater than 14 which you
                    haven't trained yet (or you didn't get right) against a dealer's 9. Hands
                    greater than 14 are:
                </Text>

                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            ...hardFourteen.cards,
                            {
                                isBlueCard: true,
                                isGoldCard: false,
                                suit: CardSuit.spades,
                                symbol: SimpleCardSymbol.Ace
                            }
                        ],
                        values: [15]
                    }}
                    isCurrentHand={false}
                />
                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            ...hardFourteen.cards,
                            {
                                isBlueCard: true,
                                isGoldCard: false,
                                suit: CardSuit.clubs,
                                symbol: SimpleCardSymbol.Two
                            }
                        ],
                        values: [16]
                    }}
                    isCurrentHand={false}
                />
                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            ...hardFourteen.cards,
                            {
                                isBlueCard: true,
                                isGoldCard: false,
                                suit: CardSuit.hearts,
                                symbol: SimpleCardSymbol.Three
                            }
                        ],
                        values: [17]
                    }}
                    isCurrentHand={false}
                />
                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            ...hardFourteen.cards,
                            {
                                isBlueCard: true,
                                isGoldCard: false,
                                suit: CardSuit.diamonds,
                                symbol: SimpleCardSymbol.Four
                            }
                        ],
                        values: [18]
                    }}
                    isCurrentHand={false}
                />
                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            ...hardFourteen.cards,
                            {
                                isBlueCard: true,
                                isGoldCard: false,
                                suit: CardSuit.hearts,
                                symbol: SimpleCardSymbol.Five
                            }
                        ],
                        values: [19]
                    }}
                    isCurrentHand={false}
                />
                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            ...hardFourteen.cards,
                            {
                                isBlueCard: true,
                                isGoldCard: false,
                                suit: CardSuit.spades,
                                symbol: SimpleCardSymbol.Six
                            }
                        ],
                        values: [20]
                    }}
                    isCurrentHand={false}
                />

                <Text style={{ color: 'white', fontSize: 20, marginVertical: 16 }}>
                    - If you haven't trained any of those hands yet (against a dealer's 9), you will
                    be dealt a blue card that turns the Hard 14 into one of those hands
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    - If you have already trained all of those hands (against a dealer's 9), you
                    will then be dealt a random card
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    The same behavior will be applied when splitting a hand. Let's say the dealer
                    has a 6, you have a 4,4 and you decide to Split it.
                </Text>

                <HandComponent hand={splitFour} isCurrentHand={false} />

                <Text style={{ color: 'white', fontSize: 20, marginVertical: 16 }}>
                    The app will then check which hands greater than 4 you haven't trained yet (or
                    didn't get right) against a dealer's 6 and turn each of the 4s into one of those
                    hands. Available hands greater than 4 are:
                </Text>

                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            splitFour.cards[0],
                            {
                                isBlueCard: true,
                                isGoldCard: false,
                                suit: CardSuit.spades,
                                symbol: SimpleCardSymbol.Ace
                            }
                        ],
                        values: [5, 15]
                    }}
                    isCurrentHand={false}
                />
                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            splitFour.cards[0],
                            {
                                isBlueCard: true,
                                isGoldCard: false,
                                suit: CardSuit.hearts,
                                symbol: SimpleCardSymbol.Two
                            }
                        ],
                        values: [6]
                    }}
                    isCurrentHand={false}
                />
                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            splitFour.cards[0],
                            {
                                isBlueCard: true,
                                isGoldCard: false,
                                suit: CardSuit.diamonds,
                                symbol: SimpleCardSymbol.Three
                            }
                        ],
                        values: [7]
                    }}
                    isCurrentHand={false}
                />
                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            splitFour.cards[0],
                            {
                                isBlueCard: true,
                                isGoldCard: false,
                                suit: CardSuit.spades,
                                symbol: SimpleCardSymbol.Four
                            }
                        ],
                        values: [8]
                    }}
                    isCurrentHand={false}
                />
                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            splitFour.cards[0],
                            {
                                isBlueCard: true,
                                isGoldCard: false,
                                suit: CardSuit.hearts,
                                symbol: SimpleCardSymbol.Five
                            }
                        ],
                        values: [9]
                    }}
                    isCurrentHand={false}
                />
                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            splitFour.cards[0],
                            {
                                isBlueCard: true,
                                isGoldCard: false,
                                suit: CardSuit.clubs,
                                symbol: SimpleCardSymbol.Six
                            }
                        ],
                        values: [10]
                    }}
                    isCurrentHand={false}
                />
                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            splitFour.cards[0],
                            {
                                isBlueCard: true,
                                isGoldCard: false,
                                suit: CardSuit.diamonds,
                                symbol: SimpleCardSymbol.Seven
                            }
                        ],
                        values: [11]
                    }}
                    isCurrentHand={false}
                />
                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            splitFour.cards[0],
                            {
                                isBlueCard: true,
                                isGoldCard: false,
                                suit: CardSuit.spades,
                                symbol: SimpleCardSymbol.Eight
                            }
                        ],
                        values: [12]
                    }}
                    isCurrentHand={false}
                />
                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            splitFour.cards[0],
                            {
                                isBlueCard: true,
                                isGoldCard: false,
                                suit: CardSuit.hearts,
                                symbol: SimpleCardSymbol.Nine
                            }
                        ],
                        values: [13]
                    }}
                    isCurrentHand={false}
                />
                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            splitFour.cards[0],
                            {
                                isBlueCard: true,
                                isGoldCard: false,
                                suit: CardSuit.clubs,
                                symbol: SimpleCardSymbol.Ten
                            }
                        ],
                        values: [14]
                    }}
                    isCurrentHand={false}
                />

                <Text style={{ color: 'white', fontSize: 20, marginVertical: 16 }}>
                    After you have trained each hand at least once Blue cards won't apply anymore.
                </Text>
            </ScrollView>
        </WithNavBar>
    );
};
