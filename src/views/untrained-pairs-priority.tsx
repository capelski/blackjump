import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { CardComponent } from '../components/card-component';
import { HandComponent } from '../components/hand-component';
import { createCard } from '../logic/card';
import { CardSuit, Hand, SimpleCardSymbol, SpecialCardSymbol } from '../types';

export const UntrainedPairsPriority: React.FC = () => {
  const hardNine: Hand = {
    bet: 1,
    cards: [
      createCard(SimpleCardSymbol.Five, CardSuit.clubs),
      createCard(SimpleCardSymbol.Four, CardSuit.hearts),
    ],
    values: [9],
  };

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
        Untrained pairs priority
      </Text>
      <ScrollView
        style={{
          margin: 16,
        }}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>
          Prioritizes untrained/missed pairs instead of dealing random cards (a training pair
          consists of a player hand and a dealer up card). When enabling Untrained pairs priority:
        </Text>

        <Text style={{ color: 'white', fontSize: 20, marginTop: 24 }}>
          • Non-random cards will be dealt. Non-random cards are golden and have a square instead of
          a suit
        </Text>

        <View style={{ alignItems: 'center', marginTop: 16 }}>
          <CardComponent
            card={createCard(SimpleCardSymbol.Eight)}
            isSoundEnabled={false}
            skipAnimation={true}
          />
        </View>

        <Text style={{ color: 'white', fontSize: 20, marginTop: 24 }}>
          • Each time you start training a random pair you will be dealt an untrained/missed hand
          against the corresponding dealer up card
        </Text>

        <Text style={{ color: 'white', fontSize: 20, marginBottom: 16, marginTop: 24 }}>
          • Each time you Hit or Split a hand you might be dealt a card that turns your current hand
          into an untrained/missed pair
        </Text>

        <HandComponent
          hand={hardNine}
          handsNumber={1}
          isCurrentHand={false}
          isSoundEnabled={false}
          skipAnimation={true}
        />
        <Text style={{ color: 'white', fontSize: 20, marginBottom: 8, textAlign: 'center' }}>
          Hit
        </Text>
        <HandComponent
          hand={{
            bet: 1,
            cards: [...hardNine.cards, createCard(SimpleCardSymbol.Ace)],
            values: [10, 20],
          }}
          handsNumber={1}
          isCurrentHand={false}
          isSoundEnabled={false}
          skipAnimation={true}
        />
        <Text style={{ color: 'white', fontSize: 32, marginBottom: 8, textAlign: 'center' }}>
          ...
        </Text>
        <HandComponent
          hand={{
            bet: 1,
            cards: [...hardNine.cards, createCard(SimpleCardSymbol.Ten)],
            values: [20],
          }}
          handsNumber={1}
          isCurrentHand={false}
          isSoundEnabled={false}
          skipAnimation={true}
        />

        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontStyle: 'italic',
            marginTop: 24,
          }}
        >
          You still will be dealt a random card when no untrained/missed pairs can be reached from
          your current hand or when the risk of busting your current hand is greater than 0
        </Text>

        <Text style={{ color: 'white', fontSize: 20, marginTop: 24 }}>
          • You will never be dealt a hand that requires no actions (i.e. a Blackjack or 21)
        </Text>

        <HandComponent
          hand={{
            bet: 1,
            cards: [
              createCard(SimpleCardSymbol.Ace, CardSuit.spades),
              createCard(SpecialCardSymbol.Jack, CardSuit.hearts),
            ],
            values: [11, 21],
          }}
          handsNumber={1}
          isCurrentHand={false}
          isSoundEnabled={false}
          skipAnimation={true}
        />

        <Text style={{ color: 'white', fontSize: 20, marginTop: 24 }}>
          • When you complete the training (i.e. reach 100% progress), Untrained pairs priority will
          be automatically disabled
        </Text>
      </ScrollView>
    </React.Fragment>
  );
};
