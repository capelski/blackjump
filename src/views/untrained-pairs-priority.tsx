import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { CardComponent } from '../components/card-component';
import { HandComponent } from '../components/hand-component';
import { createCard } from '../logic/card';
import { CardSuit, Hand, SimpleCardSymbol, SpecialCardSymbol } from '../types';

export const UntrainedPairsPriority: React.FC = () => {
    const hardFourteen: Hand = {
        bet: 1,
        cards: [createCard(SimpleCardSymbol.Five), createCard(SimpleCardSymbol.Nine)],
        values: [14]
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
                Untrained pairs priority
            </Text>
            <ScrollView
                style={{
                    margin: 16
                }}
            >
                <Text style={{ color: 'white', fontSize: 20 }}>
                    Prioritizes untrained/missed pairs instead of dealing random cards (a training
                    pair consists of a player hand and a dealer up card). When enabling Untrained
                    pairs priority:
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginTop: 24 }}>
                    • Non-random cards will be dealt. Non-random cards are golden and have a square
                    instead of a suit
                </Text>

                <View style={{ alignItems: 'center', marginTop: 16 }}>
                    <CardComponent
                        card={createCard(SimpleCardSymbol.Eight)}
                        isSoundEnabled={false}
                        skipAnimation={true}
                    />
                </View>

                <Text style={{ color: 'white', fontSize: 20, marginTop: 24 }}>
                    • Each time you start training a random pair you will be dealt an
                    untrained/missed hand against the corresponding dealer up card
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginBottom: 16, marginTop: 24 }}>
                    • Each time you Hit or Split a hand you will be dealt a card that turns your
                    current hand into an untrained/missed pair
                </Text>

                <HandComponent
                    hand={hardFourteen}
                    handsNumber={1}
                    isCurrentHand={false}
                    isSoundEnabled={false}
                    skipAnimation={true}
                />
                <Text
                    style={{ color: 'white', fontSize: 20, marginBottom: 8, textAlign: 'center' }}
                >
                    Hit
                </Text>
                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [...hardFourteen.cards, createCard(SimpleCardSymbol.Ace)],
                        values: [15]
                    }}
                    handsNumber={1}
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
                        cards: [...hardFourteen.cards, createCard(SimpleCardSymbol.Six)],
                        values: [20]
                    }}
                    handsNumber={1}
                    isCurrentHand={false}
                    isSoundEnabled={false}
                    skipAnimation={true}
                />

                <Text style={{ color: 'white', fontSize: 20, marginTop: 24 }}>
                    (In case you have already trained all pairs reachable from the current hand, you
                    will be dealt a random card)
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginTop: 24 }}>
                    • Your are likely to win more, since you will be dealt infrequent hands and you
                    won't get as busted as you would when being dealt random cards
                </Text>

                <Text style={{ color: 'white', fontSize: 20, marginTop: 24 }}>
                    • You will never be dealt a hand that requires no actions (i.e. a Blackjack or
                    21)
                </Text>

                <HandComponent
                    hand={{
                        bet: 1,
                        cards: [
                            createCard(SimpleCardSymbol.Ace, CardSuit.spades),
                            createCard(SpecialCardSymbol.Jack, CardSuit.hearts)
                        ],
                        values: [11, 21]
                    }}
                    handsNumber={1}
                    isCurrentHand={false}
                    isSoundEnabled={false}
                    skipAnimation={true}
                />

                <Text style={{ color: 'white', fontSize: 20, marginTop: 24 }}>
                    • When you complete the training (i.e. reach 100% progress), Untrained pairs
                    priority will be automatically disabled
                </Text>
            </ScrollView>
        </React.Fragment>
    );
};
