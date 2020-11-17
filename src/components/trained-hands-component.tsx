import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { decisionsDictionary } from '../logic/decisions-dictionary';
import { getSpecificTrainingPair } from '../logic/training-pairs';
import {
    HandRepresentation,
    Phases,
    ScreenTypes,
    SimpleCardSymbol,
    TrainedHands,
    TrainingPair
} from '../types';
import { Divider } from './divider';
import { WithNavBar, WithNavBarPropsFromScreenProps } from './with-nav-bar';

interface TrainedHandsComponentProps {
    phase: Phases;
    startTrainingRound: (trainingPair: TrainingPair) => void;
    trainedHands: TrainedHands;
}

export const TrainedHandsComponent: React.FC<{
    navigation: NavigationScreenProp<{ routeName: string }>;
    screenProps: TrainedHandsComponentProps & WithNavBarPropsFromScreenProps;
}> = ({ navigation, screenProps }) => {
    const [unfoldedHand, setUnfoldedHand] = useState<HandRepresentation>();

    return (
        <WithNavBar
            navigation={navigation}
            player={screenProps.player}
            totalAttemptedDecisions={screenProps.totalAttemptedDecisions}
            totalRightDecisions={screenProps.totalRightDecisions}
        >
            <Text
                style={{
                    color: 'white',
                    fontSize: 24,
                    fontWeight: 'bold',
                    paddingVertical: 16,
                    textAlign: 'center'
                }}
            >
                Trained hands
            </Text>
            <ScrollView
                style={{
                    flex: 1,
                    paddingHorizontal: 16,
                    marginVertical: 8,
                    width: '100%'
                }}
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
            >
                {/* TODO Somehow, a Q symbol is making it to trained hands */}
                {(Object.keys(screenProps.trainedHands) as HandRepresentation[]).map(
                    (handRepresentation, index) => {
                        const handRelevantData = decisionsDictionary[handRepresentation];
                        const dealerHands = screenProps.trainedHands[handRepresentation];

                        return (
                            <View key={index} style={{ marginBottom: 16, width: '100%' }}>
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
                                            marginBottom: 16
                                        }}
                                    >
                                        {handRelevantData.name}
                                    </Text>
                                </TouchableOpacity>
                                {unfoldedHand && unfoldedHand === handRepresentation && (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            justifyContent: 'space-around'
                                        }}
                                    >
                                        {(Object.keys(dealerHands) as SimpleCardSymbol[]).map(
                                            (dealerSymbol, dealerIndex) => {
                                                const backgroundColor =
                                                    dealerHands[dealerSymbol] === 0
                                                        ? '#333'
                                                        : dealerHands[dealerSymbol] === 1
                                                        ? 'lightgreen'
                                                        : 'lightcoral';

                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            if (
                                                                screenProps.phase ===
                                                                Phases.finished
                                                            ) {
                                                                screenProps.startTrainingRound(
                                                                    getSpecificTrainingPair(
                                                                        handRepresentation,
                                                                        dealerSymbol
                                                                    )
                                                                );
                                                                navigation.navigate(
                                                                    ScreenTypes.table
                                                                );
                                                            }
                                                        }}
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
                                                            key={dealerIndex}
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
                                            }
                                        )}
                                    </View>
                                )}
                                <Divider />
                            </View>
                        );
                    }
                )}
            </ScrollView>
        </WithNavBar>
    );
};
