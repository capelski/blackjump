import React from 'react';
import { ScrollView, Text } from 'react-native';
import { HandComponent } from '../components/hand-component';
import { CardSuit, SimpleCardSymbol, SpecialCardSymbol } from '../types';

export const HoleCard: React.FC = () => {
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
                Hole card
            </Text>
            <ScrollView
                style={{
                    margin: 16
                }}
            >
                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                    In Hole card games the dealer's hand immediately receives its second card face
                    down (the hole card) after receiving its first card face up.
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
                                isHoleCard: true,
                                isRandom: true,
                                suit: CardSuit.diamonds,
                                symbol: SimpleCardSymbol.Ten
                            }
                        ],
                        values: [1, 11]
                    }}
                    handsNumber={1}
                    isCurrentHand={false}
                    isSoundEnabled={false}
                    skipAnimation={true}
                />

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16, marginTop: 16 }}>
                    Additionally, when Blackjack Peek is enabled, the dealer peeks at the hole card
                    and reveals it if it makes the dealer's hand a blackjack, winning over all
                    players' non blackjack hands.
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
                                isHoleCard: true,
                                isRandom: true,
                                suit: CardSuit.diamonds,
                                symbol: SimpleCardSymbol.Ten
                            }
                        ],
                        values: [1, 11]
                    }}
                    handsNumber={1}
                    isCurrentHand={false}
                    isSoundEnabled={false}
                    peeking={true}
                    skipAnimation={true}
                />

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
                                symbol: SimpleCardSymbol.Ten
                            }
                        ],
                        values: [11, 21]
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
