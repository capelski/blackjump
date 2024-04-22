import React from 'react';
import { Text, View } from 'react-native';
import { getHandValidValues, isBlackjack } from '../logic/hand';
import { AppNavigation, Hand } from '../types';
import { CardComponent } from './card-component';

interface HandComponentProps {
  hand: Hand;
  handsNumber: number;
  isCurrentHand: boolean;
  isSoundEnabled: boolean;
  navigation?: AppNavigation;
  peeking?: boolean;
  skipAnimation?: boolean;
}

export const HandComponent: React.FC<HandComponentProps> = (props) => {
  const handValues = getHandValidValues(props.hand).join('/');
  const displayValues = isBlackjack(props.hand, props.handsNumber)
    ? 'Blackjack'
    : handValues.indexOf('21') > -1
    ? '21'
    : handValues;

  return (
    <View
      style={{
        backgroundColor: props.isCurrentHand ? 'rgba(255, 255, 255, 0.2)' : undefined,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '100%',
        paddingTop: 8,
        paddingHorizontal: 8,
      }}
    >
      {props.hand.cards.map((card, index) => (
        <CardComponent
          card={card}
          isSoundEnabled={props.isSoundEnabled}
          key={index}
          navigation={props.navigation}
          skipAnimation={props.skipAnimation}
        />
      ))}
      <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
        {props.peeking ? (
          <Text style={{ color: 'black', fontSize: 32 }}>👁️</Text>
        ) : (
          <React.Fragment>
            <Text style={{ color: 'white', fontSize: 25 }}> {displayValues}</Text>
            {props.hand.outcome && (
              <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>
                {props.hand.outcome}
              </Text>
            )}
          </React.Fragment>
        )}
      </View>
    </View>
  );
};
