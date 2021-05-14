import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from '../components/divider';
import { OnBoardingSection } from '../components/onboarding-section';
import { doubleColor } from '../constants';
import { getSpecificTrainingPair } from '../logic/training-pair';
import {
    AppNavigation,
    Hand,
    HandCode,
    Phases,
    RouteNames,
    TrainingHands as ITrainingHands,
    TrainingProgress
} from '../types';
import { getObjectKeys } from '../utils';

type TrainingHandsProps = {
    navigation: AppNavigation;
    onBoardingStep: number;
    phase: Phases;
    startTrainingRound: (playerHand: Hand, dealerHand: Hand) => void;
    trainingHands: ITrainingHands;
    trainingProgress: TrainingProgress;
};

export const TrainingHands: React.FC<TrainingHandsProps> = (props) => {
    const [unfoldedHand, setUnfoldedHand] = useState<HandCode | undefined>(HandCode.Hard5);

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
                {getObjectKeys(props.trainingProgress).map((handCode) => {
                    const trainingHandStatus = props.trainingProgress[handCode];
                    const handName = props.trainingHands[handCode].name;

                    return (
                        <OnBoardingSection
                            isHighlighted={unfoldedHand === handCode}
                            key={handCode}
                            onBoardingStep={props.onBoardingStep}
                            style={{ paddingVertical: 8, paddingHorizontal: 16, width: '100%' }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    setUnfoldedHand(
                                        unfoldedHand !== handCode ? handCode : undefined
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
                            {unfoldedHand && unfoldedHand === handCode && (
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
                                        {getObjectKeys(trainingHandStatus).map((dealerSymbol) => {
                                            const backgroundColor =
                                                trainingHandStatus[dealerSymbol] === 0
                                                    ? '#333'
                                                    : trainingHandStatus[dealerSymbol] === 1
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
                                                                          handCode,
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
                                                              trainingHand:
                                                                  props.trainingHands[handCode]
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
