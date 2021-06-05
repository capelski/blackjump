import React from 'react';
import { ScrollView, Text } from 'react-native';
import { HandComponent } from '../components/hand-component';
import { CardSuit, SimpleCardSymbol, SpecialCardSymbol } from '../types';

export const HitSplitAces: React.FC = () => {
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
                Hit split aces
            </Text>
            <ScrollView
                style={{
                    margin: 16
                }}
            >
                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    Hitting split aces is usually not allowed. On this scenario, one single card
                    will be dealt to each hand after splitting the aces and player's turn will be
                    terminated.
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    If another ace is dealt to any of the hands and re-splitting aces is allowed,
                    the player can decide to split aces again or to stand.
                </Text>

                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            {
                                isRandom: true,
                                suit: CardSuit.clubs,
                                symbol: SimpleCardSymbol.Ace
                            },
                            {
                                isRandom: true,
                                suit: CardSuit.diamonds,
                                symbol: SimpleCardSymbol.Ace
                            }
                        ],
                        values: [2, 12]
                    }}
                    handsNumber={1}
                    isCurrentHand={true}
                    isSoundEnabled={false}
                    skipAnimation={true}
                />

                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            {
                                isRandom: true,
                                suit: CardSuit.hearts,
                                symbol: SimpleCardSymbol.Ace
                            }
                        ],
                        values: [1, 11]
                    }}
                    handsNumber={1}
                    isCurrentHand={false}
                    isSoundEnabled={false}
                    skipAnimation={true}
                />

                <Text
                    style={{ color: 'white', fontSize: 20, fontStyle: 'italic', marginBottom: 16 }}
                >
                    Note that an ace and ten value card after a split are counted as a non-blackjack
                    21:
                </Text>

                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            {
                                isRandom: true,
                                suit: CardSuit.clubs,
                                symbol: SimpleCardSymbol.Ace
                            },
                            {
                                isRandom: true,
                                suit: CardSuit.spades,
                                symbol: SimpleCardSymbol.Ten
                            }
                        ],
                        values: [21]
                    }}
                    handsNumber={1}
                    isCurrentHand={false}
                    isSoundEnabled={false}
                    skipAnimation={true}
                />

                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            {
                                isRandom: true,
                                suit: CardSuit.hearts,
                                symbol: SimpleCardSymbol.Ace
                            },
                            {
                                isRandom: true,
                                suit: CardSuit.diamonds,
                                symbol: SpecialCardSymbol.King
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
