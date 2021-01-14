import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from '../components/divider';
import { doubleColor } from '../constants';
import { decisionsDictionary } from '../logic/decisions-dictionary';
import { getSpecificTrainingPair } from '../logic/training-pairs';
import { AppNavigation, FailedHand, Hand, Phases, RouteNames } from '../types';

type FailedHandsProps = {
    failedHands: FailedHand[];
    navigation: AppNavigation;
    phase: Phases;
    startTrainingRound: (playerHand: Hand, dealerHand: Hand) => void;
};

export const FailedHands: React.FC<FailedHandsProps> = (props) => {
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
                Failed hands
            </Text>
            <ScrollView
                style={{
                    flex: 1,
                    margin: 16
                }}
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
            >
                {props.failedHands.length === 0 ? (
                    <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
                        No failed hands so far. Nice job!
                    </Text>
                ) : (
                    Object.values(props.failedHands).map((failedHand, index) => {
                        const handRelevantData = decisionsDictionary[failedHand.handRepresentation];

                        return (
                            <View key={index} style={{ marginBottom: 16, width: '100%' }}>
                                <View
                                    style={{
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'center'
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
                                        {handRelevantData.name}
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
                                                    fontWeight: 'bold',
                                                    marginBottom: 16,
                                                    marginLeft: 16,
                                                    paddingHorizontal: 8,
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
        </React.Fragment>
    );
};
