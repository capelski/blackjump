import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { CardComponent } from '../components/card-component';
import { HandComponent } from '../components/hand-component';
import { CardSuit, Hand, SimpleCardSymbol } from '../types';

export const BlueCardsInfo: React.FC = () => {
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
                Blue cards
            </Text>

            <ScrollView
                style={{
                    margin: 16
                }}
            >
                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    When Blue cards are enabled, each time you Hit or Split a hand, instead of being
                    a dealt a random card, you will be dealt a card that turns your current hand
                    into a hand you haven't trained yet (or a hand you didn't get right) against the
                    dealer's up card.
                </Text>

                <Text
                    style={{ color: 'white', fontSize: 20, fontStyle: 'italic', marginBottom: 16 }}
                >
                    Blue cards have blue symbols and a blue circle (instead of the suit):
                </Text>

                <View style={{ alignItems: 'center' }}>
                    <CardComponent
                        card={{
                            isBlueCard: true,
                            isGoldCard: false,
                            suit: CardSuit.spades,
                            symbol: SimpleCardSymbol.Eight
                        }}
                        isSoundEnabled={false}
                        skipAnimation={true}
                    />
                </View>

                <Text
                    style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginVertical: 16 }}
                >
                    Notice that enabling this option will increase your probabilities of winning,
                    since you won't get busted as much as you would when being dealt random cards
                    (specially on high value hands like Hard 16).
                </Text>

                <HandComponent
                    hand={hardFourteen}
                    isCurrentHand={false}
                    isSoundEnabled={false}
                    skipAnimation={true}
                />

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
                    isSoundEnabled={false}
                    skipAnimation={true}
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
                    isSoundEnabled={false}
                    skipAnimation={true}
                />
                <Text
                    style={{ color: 'white', fontSize: 32, marginBottom: 8, textAlign: 'center' }}
                >
                    ...
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
                                symbol: SimpleCardSymbol.Six
                            }
                        ],
                        values: [20]
                    }}
                    isCurrentHand={false}
                    isSoundEnabled={false}
                    skipAnimation={true}
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

                <HandComponent
                    hand={splitFour}
                    isCurrentHand={false}
                    isSoundEnabled={false}
                    skipAnimation={true}
                />

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
                    isSoundEnabled={false}
                    skipAnimation={true}
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
                    isSoundEnabled={false}
                    skipAnimation={true}
                />
                <Text
                    style={{ color: 'white', fontSize: 32, marginBottom: 8, textAlign: 'center' }}
                >
                    ...
                </Text>
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
                    isSoundEnabled={false}
                    skipAnimation={true}
                />

                <Text style={{ color: 'white', fontSize: 20, marginVertical: 16 }}>
                    After you have trained each hand at least once Blue cards won't apply anymore.
                </Text>
            </ScrollView>
        </React.Fragment>
    );
};
