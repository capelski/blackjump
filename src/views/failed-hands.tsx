import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from '../components/divider';
import { OnBoardingSection } from '../components/onboarding-section';
import { doubleColor } from '../constants';
import { getSpecificTrainingPair } from '../logic/training-pair';
import { AppNavigation, FailedHand, Hand, Phases, RelevantHands, RouteNames } from '../types';

type FailedHandsProps = {
    failedHands: FailedHand[];
    navigation: AppNavigation;
    onBoardingStep: number;
    phase: Phases;
    relevantHands: RelevantHands;
    startTrainingRound: (playerHand: Hand, dealerHand: Hand) => void;
};

export const FailedHands: React.FC<FailedHandsProps> = (props) => {
    return (
        <OnBoardingSection
            onBoardingStep={props.onBoardingStep}
            style={{ alignItems: undefined, flex: 1 }}
        >
            <Text
                style={{
                    color: 'white',
                    fontSize: 24,
                    fontWeight: 'bold',
                    paddingTop: 16,
                    textAlign: 'center'
                }}
            >
                Failed hands
            </Text>
            <ScrollView
                style={{
                    margin: 16
                }}
                contentContainerStyle={{ flex: 1 }}
            >
                {props.failedHands.length === 0 ? (
                    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                            No failed hands so far. Nice job!
                        </Text>
                    </View>
                ) : (
                    Object.values(props.failedHands).map((failedHand) => {
                        const handName = props.relevantHands[failedHand.handRepresentation].name;

                        return (
                            <View key={handName} style={{ marginBottom: 16, width: '100%' }}>
                                <View
                                    style={{
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: 'white',
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                marginBottom: 16,
                                                textAlign: 'center'
                                            }}
                                        >
                                            {handName}
                                        </Text>
                                        <Text
                                            style={{
                                                color: 'white',
                                                fontSize: 20,
                                                marginBottom: 16,
                                                textAlign: 'center'
                                            }}
                                        >
                                            {' '}
                                            vs dealer's{' '}
                                        </Text>
                                        <Text
                                            style={{
                                                color: 'white',
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                marginBottom: 16,
                                                textAlign: 'center'
                                            }}
                                        >
                                            {failedHand.dealerSymbol}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            opacity:
                                                props.phase === Phases.finished ? undefined : 0.3
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (props.phase === Phases.finished) {
                                                    const trainingPair = getSpecificTrainingPair(
                                                        failedHand.handRepresentation,
                                                        failedHand.dealerSymbol
                                                    );
                                                    props.startTrainingRound(
                                                        trainingPair.player,
                                                        trainingPair.dealer
                                                    );
                                                    props.navigation.navigate(RouteNames.table);
                                                }
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    backgroundColor: doubleColor,
                                                    borderRadius: 16,
                                                    color: 'white',
                                                    fontSize: 20,
                                                    marginBottom: 16,
                                                    paddingHorizontal: 16,
                                                    paddingVertical: 4,
                                                    textAlign: 'center'
                                                }}
                                            >
                                                Train ➡️
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Divider />
                            </View>
                        );
                    })
                )}
            </ScrollView>
        </OnBoardingSection>
    );
};
