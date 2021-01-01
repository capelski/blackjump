import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { handRepresentationToRelevantHand } from '../logic/basic-strategy';
import { BadDecision, ScreenTypes } from '../types';
import { Divider } from './divider';
import { HandDecisionsParams } from './hand-decisions';
import { WithNavBar, WithNavBarPropsFromScreenProps } from './with-nav-bar';

interface BadDecisionsProps {
    badDecisions: BadDecision[];
}

export const BadDecisions: React.FC<{
    navigation: NavigationScreenProp<{ routeName: string }>;
    screenProps: BadDecisionsProps & WithNavBarPropsFromScreenProps;
}> = ({ navigation, screenProps }) => {
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
                Bad decisions
            </Text>
            <ScrollView
                style={{
                    flex: 1,
                    padding: 16,
                    width: '100%'
                }}
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
            >
                {screenProps.badDecisions.length === 0 ? (
                    <Text style={{ color: 'white', fontSize: 20 }}>
                        No bad decision taken so far
                    </Text>
                ) : (
                    screenProps.badDecisions.map((badDecision, index) => {
                        const relevantHand = handRepresentationToRelevantHand(
                            badDecision.handRepresentation
                        );
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    navigation.navigate<HandDecisionsParams>(
                                        ScreenTypes.handDecisions,
                                        {
                                            handRepresentation: badDecision.handRepresentation,
                                            previousRoute: ScreenTypes.badDecisions
                                        }
                                    );
                                }}
                                style={{ marginBottom: 16, width: '100%' }}
                            >
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 20,
                                        marginBottom: 16,
                                        textAlign: 'center'
                                    }}
                                >
                                    {badDecision.takenAction} a {relevantHand.name} against dealer's{' '}
                                    {badDecision.dealerHandValue}. See hand strategy ➡️
                                </Text>
                                <Divider />
                            </TouchableOpacity>
                        );
                    })
                )}
            </ScrollView>
        </WithNavBar>
    );
};
