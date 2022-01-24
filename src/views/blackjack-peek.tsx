import React from 'react';
import { ScrollView, Text } from 'react-native';
import { HandComponent } from '../components/hand-component';
import { createCard } from '../logic/card';
import { CardSuit, SimpleCardSymbol } from '../types';

export const BlackjackPeek: React.FC = () => {
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
                Blackjack Peek
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
                            createCard(SimpleCardSymbol.Eight, CardSuit.clubs),
                            createCard(SimpleCardSymbol.Ten, CardSuit.diamonds, true)
                        ],
                        values: [8]
                    }}
                    handsNumber={1}
                    isCurrentHand={false}
                    isSoundEnabled={false}
                    skipAnimation={true}
                />

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16, marginTop: 16 }}>
                    When Blackjack Peek is enabled and the dealer's hand could be a blackjack (e.g.
                    the first card is an ace or a ten value card), the dealer peeks at the hole
                    card.
                </Text>

                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            createCard(SimpleCardSymbol.Ace, CardSuit.clubs),
                            createCard(SimpleCardSymbol.Ten, CardSuit.diamonds, true)
                        ],
                        values: [1, 11]
                    }}
                    handsNumber={1}
                    isCurrentHand={false}
                    isSoundEnabled={false}
                    peeking={true}
                    skipAnimation={true}
                />

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16, marginTop: 16 }}>
                    If the hole card makes the dealer's hand a blackjack, the dealer reveals the
                    hole card winning over all players' non blackjack hands.
                </Text>

                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            createCard(SimpleCardSymbol.Ace, CardSuit.clubs),
                            createCard(SimpleCardSymbol.Ten, CardSuit.diamonds)
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
