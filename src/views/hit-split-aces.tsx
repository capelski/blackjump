import React from 'react';
import { ScrollView, Text } from 'react-native';
import { HandComponent } from '../components/hand-component';
import { createCard } from '../logic/card';
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
          textAlign: 'center',
        }}
      >
        Hit split aces
      </Text>
      <ScrollView
        style={{
          margin: 16,
        }}
      >
        <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
          Hitting split aces is usually not allowed. On this scenario, one single card will be dealt
          to each hand after splitting the aces and player's turn will be terminated.
        </Text>

        <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
          If another ace is dealt to any of the hands and re-splitting aces is allowed, the player
          can decide to split aces again or to stand.
        </Text>

        <HandComponent
          hand={{
            bet: 1,
            cards: [
              createCard(SimpleCardSymbol.Ace, CardSuit.clubs),
              createCard(SimpleCardSymbol.Ace, CardSuit.diamonds),
            ],
            values: [2, 12],
          }}
          handsNumber={1}
          isCurrentHand={true}
          isSoundEnabled={false}
          skipAnimation={true}
        />

        <HandComponent
          hand={{
            bet: 1,
            cards: [createCard(SimpleCardSymbol.Ace, CardSuit.hearts)],
            values: [1, 11],
          }}
          handsNumber={1}
          isCurrentHand={false}
          isSoundEnabled={false}
          skipAnimation={true}
        />

        <Text style={{ color: 'white', fontSize: 20, fontStyle: 'italic', marginBottom: 16 }}>
          Note that an ace and ten value card after a split are counted as a non-blackjack 21:
        </Text>

        <HandComponent
          hand={{
            bet: 1,
            cards: [
              createCard(SimpleCardSymbol.Ace, CardSuit.clubs),
              createCard(SimpleCardSymbol.Ten, CardSuit.spades),
            ],
            values: [21],
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
              createCard(SimpleCardSymbol.Ace, CardSuit.hearts),
              createCard(SpecialCardSymbol.King, CardSuit.diamonds),
            ],
            values: [21],
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
