import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from '../components/divider';
import { OnBoardingSection } from '../components/onboarding-section';
import { doubleColor } from '../constants';
import { getSpecificTrainingPair } from '../logic/training-pairs';
import {
    AppNavigation,
    Hand,
    HandRepresentation,
    Phases,
    RelevantHands,
    RouteNames,
    TrainedHands
} from '../types';
import { getObjectKeys } from '../utils';

type TrainingHandsProps = {
    navigation: AppNavigation;
    onBoardingStep: number;
    phase: Phases;
    relevantHands: RelevantHands;
    startTrainingRound: (playerHand: Hand, dealerHand: Hand) => void;
    trainedHands: TrainedHands;
};

export const TrainingHands: React.FC<TrainingHandsProps> = (props) => {
    const [unfoldedHand, setUnfoldedHand] = useState<HandRepresentation | undefined>(
        HandRepresentation.Hard5
    );

    return (
        <React.Fragment>
            <OnBoardingSection onBoardingStep={props.onBoardingStep}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 24,
                        fontWeight: 'bold',
                        paddingVertical: 16,
                        textAlign: 'center'
                    }}
                >
                    Training hands
                </Text>
            </OnBoardingSection>
            <ScrollView
                style={{
                    flex: 1
                }}
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
            >
                {getObjectKeys(props.trainedHands).map((handRepresentation) => {
                    const dealerHands = props.trainedHands[handRepresentation];
                    const handName = props.relevantHands[handRepresentation].name;

                    return (
                        <OnBoardingSection
                            isHighlighted={unfoldedHand === handRepresentation}
                            key={handRepresentation}
                            onBoardingStep={props.onBoardingStep}
                            style={{ paddingVertical: 8, paddingHorizontal: 16, width: '100%' }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    setUnfoldedHand(
                                        unfoldedHand !== handRepresentation
                                            ? handRepresentation
                                            : undefined
                                    );
                                }}
                                style={{ width: '100%' }}
                            >
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 20,
                                        marginBottom: 16,
                                        textAlign: 'center'
                                    }}
                                >
                                    {handName}
                                </Text>
                            </TouchableOpacity>
                            {unfoldedHand && unfoldedHand === handRepresentation && (
                                <React.Fragment>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            justifyContent: 'space-around',
                                            opacity:
                                                props.phase === Phases.finished ? undefined : 0.3
                                        }}
                                    >
                                        {getObjectKeys(dealerHands).map((dealerSymbol) => {
                                            const backgroundColor =
                                                dealerHands[dealerSymbol] === 0
                                                    ? '#333'
                                                    : dealerHands[dealerSymbol] === 1
                                                    ? 'lightgreen'
                                                    : 'lightcoral';

                                            return (
                                                <TouchableOpacity
                                                    key={dealerSymbol}
                                                    onPress={
                                                        props.onBoardingStep > -1
                                                            ? undefined
                                                            : () => {
                                                                  if (
                                                                      props.phase ===
                                                                      Phases.finished
                                                                  ) {
                                                                      const trainingPair = getSpecificTrainingPair(
                                                                          handRepresentation,
                                                                          dealerSymbol
                                                                      );
                                                                      props.startTrainingRound(
                                                                          trainingPair.player,
                                                                          trainingPair.dealer
                                                                      );
                                                                      props.navigation.navigate(
                                                                          RouteNames.table
                                                                      );
                                                                  }
                                                              }
                                                    }
                                                    style={{
                                                        alignItems: 'center',
                                                        backgroundColor: backgroundColor,
                                                        borderRadius: 8,
                                                        marginBottom: 8,
                                                        paddingVertical: 4,
                                                        width: '18%'
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            color: 'white',
                                                            fontSize: 20,
                                                            fontWeight: 'bold'
                                                        }}
                                                    >
                                                        {dealerSymbol}
                                                    </Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                    <TouchableOpacity
                                        onPress={
                                            props.onBoardingStep > -1
                                                ? undefined
                                                : () => {
                                                      props.navigation.navigate(
                                                          RouteNames.handDecisions,
                                                          {
                                                              handRepresentation
                                                          }
                                                      );
                                                  }
                                        }
                                    >
                                        <Text
                                            style={{
                                                backgroundColor: doubleColor,
                                                borderRadius: 16,
                                                color: 'white',
                                                fontSize: 20,
                                                marginVertical: 16,
                                                marginHorizontal: 24,
                                                paddingVertical: 4,
                                                textAlign: 'center'
                                            }}
                                        >
                                            {handName} decisions ➡️
                                        </Text>
                                    </TouchableOpacity>
                                </React.Fragment>
                            )}
                            <Divider />
                        </OnBoardingSection>
                    );
                })}
            </ScrollView>
        </React.Fragment>
    );
};
