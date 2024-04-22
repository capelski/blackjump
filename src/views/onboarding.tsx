import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Button } from '../components/button';
import { doubleColor, hitColor } from '../constants';
import { CardSuit } from '../types';

interface OnboardingProps {
  skipOnboardingHandler: () => void;
  startOnboardingHandler: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = (props) => {
  return (
    <React.Fragment>
      <ScrollView
        style={{
          margin: 16,
        }}
        contentContainerStyle={{
          alignItems: 'center',
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            textAlign: 'center',
          }}
        >
          Welcome to
        </Text>

        <Text
          style={{
            color: 'white',
            fontSize: 30,
            fontWeight: 'bold',
            paddingVertical: 32,
            textAlign: 'center',
          }}
        >
          {CardSuit.clubs}
          {CardSuit.hearts} Blackjump {CardSuit.diamonds}
          {CardSuit.spades}
        </Text>

        <Text
          style={{
            color: 'white',
            fontSize: 24,
            paddingBottom: 32,
            textAlign: 'center',
          }}
        >
          The app that will help you master Blackjack basic strategy
        </Text>

        <Button
          height={56}
          backgroundColor={hitColor}
          isEnabled={true}
          onPress={props.startOnboardingHandler}
          text="Start onboarding"
          width="75%"
        />
        <Button
          height={56}
          backgroundColor={doubleColor}
          isEnabled={true}
          marginTop={16}
          onPress={props.skipOnboardingHandler}
          text="Skip onboarding"
          width="75%"
        />
      </ScrollView>
    </React.Fragment>
  );
};
