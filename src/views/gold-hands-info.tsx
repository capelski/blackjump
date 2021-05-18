import React from 'react';
import { ScrollView, Text } from 'react-native';
import { HandComponent } from '../components/hand-component';
import { CardSuit, SimpleCardSymbol, SpecialCardSymbol } from '../types';

export const GoldHandsInfo: React.FC = () => {
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
                Gold hands
            </Text>
            <ScrollView
                style={{
                    margin: 16
                }}
            >
                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    When Gold hands are enabled you will be dealt specific initial hands and dealer
                    will be dealt specific up cards, prioritizing those you haven't trained yet and
                    those which you didn't get right.
                </Text>

                <Text
                    style={{ color: 'white', fontSize: 20, fontStyle: 'italic', marginBottom: 16 }}
                >
                    Gold cards have golden symbols and a golden square (instead of the suit):
                </Text>

                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            {
                                isBlueCard: false,
                                isGoldCard: true,
                                suit: CardSuit.spades,
                                symbol: SimpleCardSymbol.Nine
                            },
                            {
                                isBlueCard: false,
                                isGoldCard: true,
                                suit: CardSuit.hearts,
                                symbol: SimpleCardSymbol.Eight
                            }
                        ],
                        values: [17]
                    }}
                    handsNumber={1}
                    isCurrentHand={false}
                    isSoundEnabled={false}
                    skipAnimation={true}
                />

                <Text style={{ color: 'white', fontSize: 20, marginVertical: 16 }}>
                    Additionally, you can filter the hands you will be dealt by configuring the gold
                    hands Levels.
                </Text>

                <Text
                    style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}
                >
                    Notice that when enabling Gold hands you will get hands that are infrequent when
                    playing in real scenarios so the results (i.e. the money earnings) are not
                    relevant.
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    Once you have trained each possible hand, disable Gold hands in order to train
                    in more similar conditions to the ones in real scenarios.
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    Another consequence of enabling Gold hands, for example, is that you will never
                    be dealt a Blackjack as initial hand (because it's a hand that requires no
                    training).
                </Text>

                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            {
                                isBlueCard: false,
                                isGoldCard: false,
                                suit: CardSuit.spades,
                                symbol: SimpleCardSymbol.Ace
                            },
                            {
                                isBlueCard: false,
                                isGoldCard: false,
                                suit: CardSuit.hearts,
                                symbol: SpecialCardSymbol.Jack
                            }
                        ],
                        values: [21]
                    }}
                    handsNumber={1}
                    isCurrentHand={false}
                    isSoundEnabled={false}
                    skipAnimation={true}
                />
            </ScrollView>
        </React.Fragment>
    );
};
