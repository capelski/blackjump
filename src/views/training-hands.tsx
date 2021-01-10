import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from '../components/divider';
import { WithNavBar, WithNavBarPropsFromScreenProps } from '../components/with-nav-bar';
import { decisionsDictionary } from '../logic/decisions-dictionary';
import { getSpecificTrainingPair } from '../logic/training-pairs';
import {
    Hand,
    HandRepresentation,
    NavigationProps,
    Phases,
    ScreenTypes,
    SimpleCardSymbol,
    TrainedHands
} from '../types';

type TrainingHandsProps = NavigationProps<ScreenTypes.trainingHands> &
    WithNavBarPropsFromScreenProps & {
        phase: Phases;
        startTrainingRound: (playerHand: Hand, dealerHand: Hand) => void;
        trainedHands: TrainedHands;
    };

export const TrainingHands: React.FC<TrainingHandsProps> = (props) => {
    const [unfoldedHand, setUnfoldedHand] = useState<HandRepresentation>();

    return (
        <WithNavBar
            navigation={props.navigation}
            route={props.route}
            player={props.player}
            trainedHandsStats={props.trainedHandsStats}
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
                Training hands
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
                {(Object.keys(props.trainedHands) as HandRepresentation[]).map(
                    (handRepresentation, index) => {
                        const handRelevantData = decisionsDictionary[handRepresentation];
                        const dealerHands = props.trainedHands[handRepresentation];

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
                                            marginBottom: 16,
                                            textAlign: 'center'
                                        }}
                                    >
                                        {handRelevantData.name}
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
                                                    props.phase === Phases.finished
                                                        ? undefined
                                                        : 0.3
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
                                                            key={dealerIndex}
                                                            onPress={() => {
                                                                if (
                                                                    props.phase === Phases.finished
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
                                        <TouchableOpacity
                                            onPress={() => {
                                                props.navigation.navigate(
                                                    ScreenTypes.handDecisions,
                                                    {
                                                        handRepresentation
                                                    }
                                                );
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    fontSize: 20,
                                                    marginVertical: 16,
                                                    textAlign: 'center'
                                                }}
                                            >
                                                See hand strategy ➡️
                                            </Text>
                                        </TouchableOpacity>
                                    </React.Fragment>
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
