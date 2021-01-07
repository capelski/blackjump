import React from 'react';
import { ScrollView, Text } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { HandComponent } from '../components/hand-component';
import { WithNavBar, WithNavBarPropsFromScreenProps } from '../components/with-nav-bar';
import { CardSuit, SimpleCardSymbol } from '../types';

export const ReachUntrainedHandsInfo: React.FC<{
    navigation: NavigationScreenProp<{ routeName: string }>;
    screenProps: WithNavBarPropsFromScreenProps;
}> = ({ navigation, screenProps }) => {
    const hardFourteen = {
        bet: 1,
        cards: [
            { suit: CardSuit.clubs, symbol: SimpleCardSymbol.Five },
            { suit: CardSuit.diamonds, symbol: SimpleCardSymbol.Nine }
        ],
        values: [14]
    };

    const splitFour = {
        bet: 1,
        cards: [
            { suit: CardSuit.clubs, symbol: SimpleCardSymbol.Four },
            { suit: CardSuit.spades, symbol: SimpleCardSymbol.Four }
        ],
        values: [8]
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
                    Reach untrained hands
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    When this option is enabled, each time you Hit or Split a hand, instead of being
                    a dealt a random card, you will be dealt a card that turns your current hand
                    into a hand you haven't trained yet against the dealer's up card.
                </Text>

                <HandComponent hand={hardFourteen} isCurrentHand={false} />

                <Text style={{ color: 'white', fontSize: 20, marginVertical: 16 }}>
                    Let's say you have a Hard 14 and the dealer's up card is a 9. You decide to Hit
                    so, provided Reach untrained hands option is enabled, the app will check whether
                    there are any hands greater than 14 which you haven't trained yet against a
                    dealer's 9. Reachable hands greater than 14 include:
                </Text>

                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            ...hardFourteen.cards,
                            { suit: CardSuit.spades, symbol: SimpleCardSymbol.Ace }
                        ],
                        values: [5, 15]
                    }}
                    isCurrentHand={false}
                />
                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            ...hardFourteen.cards,
                            { suit: CardSuit.clubs, symbol: SimpleCardSymbol.Two }
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
                            { suit: CardSuit.hearts, symbol: SimpleCardSymbol.Three }
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
                            { suit: CardSuit.diamonds, symbol: SimpleCardSymbol.Four }
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
                            { suit: CardSuit.hearts, symbol: SimpleCardSymbol.Five }
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
                            { suit: CardSuit.spades, symbol: SimpleCardSymbol.Six }
                        ],
                        values: [20]
                    }}
                    isCurrentHand={false}
                />

                <Text style={{ color: 'white', fontSize: 20, marginVertical: 16 }}>
                    - If you haven't trained any of those hands yet (against a dealer's 9), you will
                    be dealt a card that turns the Hard 14 into one of those hands
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    - If all of those hands have already been trained (against a dealer's 9), you
                    will then be dealt a random card
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    The same behavior will be applied when splitting a hand. Let's say the dealer
                    has a 6, you have a 4,4 and you decide to Split it.
                </Text>

                <HandComponent hand={splitFour} isCurrentHand={false} />

                <Text style={{ color: 'white', fontSize: 20, marginVertical: 16 }}>
                    The app will check which hands greater than 4 haven't been trained yet against a
                    dealer's 6 and turn each of the 4s into one of those hands. Reachable hands
                    greater than 4 are:
                </Text>

                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            splitFour.cards[0],
                            { suit: CardSuit.spades, symbol: SimpleCardSymbol.Ace }
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
                            { suit: CardSuit.hearts, symbol: SimpleCardSymbol.Two }
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
                            { suit: CardSuit.diamonds, symbol: SimpleCardSymbol.Three }
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
                            { suit: CardSuit.spades, symbol: SimpleCardSymbol.Four }
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
                            { suit: CardSuit.hearts, symbol: SimpleCardSymbol.Five }
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
                            { suit: CardSuit.clubs, symbol: SimpleCardSymbol.Six }
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
                            { suit: CardSuit.diamonds, symbol: SimpleCardSymbol.Seven }
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
                            { suit: CardSuit.spades, symbol: SimpleCardSymbol.Eight }
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
                            { suit: CardSuit.hearts, symbol: SimpleCardSymbol.Nine }
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
                            { suit: CardSuit.clubs, symbol: SimpleCardSymbol.Ten }
                        ],
                        values: [14]
                    }}
                    isCurrentHand={false}
                />

                <Text
                    style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginVertical: 16 }}
                >
                    Notice that enabling this option will increase your probabilities of winning,
                    since you won't get busted as much as you would when being dealt random cards
                    (specially on high value hands like Hard 16).
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    After you have trained each hand at least once this feature won't apply anymore.
                </Text>
            </ScrollView>
        </WithNavBar>
    );
};
