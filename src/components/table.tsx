import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { tableCenterHeight } from '../constants';
import { DecisionEvaluation, Hand, Phases, Player, ScreenTypes } from '../types';
import { Actions, ActionsProps } from './actions';
import { DecisionEvaluationComponent } from './decision-evaluation';
import { Divider } from './divider';
import { HandComponent } from './hand-component';
import { HandDecisionsParams } from './hand-decisions';
import { WithNavBar, WithNavBarPropsFromScreenProps } from './with-nav-bar';

interface TableProps {
    dealerHand?: Hand;
    decisionEvaluation?: DecisionEvaluation;
    phase: Phases;
    player: Player;
}

export const Table: React.FC<{
    navigation: NavigationScreenProp<{ routeName: string }>;
    screenProps: TableProps & ActionsProps & WithNavBarPropsFromScreenProps;
}> = ({ navigation, screenProps }) => (
    <WithNavBar
        navigation={navigation}
        player={screenProps.player}
        totalAttemptedDecisions={screenProps.totalAttemptedDecisions}
        totalRightDecisions={screenProps.totalRightDecisions}
    >
        <View
            style={{
                flex: 1,
                width: '100%'
            }}
        >
            <View style={{ minHeight: 128, justifyContent: 'center' }}>
                {screenProps.dealerHand && (
                    <HandComponent
                        hand={screenProps.dealerHand}
                        isCurrentHand={screenProps.phase === Phases.dealer}
                    />
                )}
            </View>
            <View style={{ height: tableCenterHeight, justifyContent: 'center', width: '100%' }}>
                <Divider />
                {screenProps.decisionEvaluation ? (
                    <DecisionEvaluationComponent
                        decisionEvaluation={screenProps.decisionEvaluation}
                        showDecisionsHandler={() => {
                            navigation.navigate<HandDecisionsParams>(ScreenTypes.handDecisions, {
                                handRepresentation: screenProps.player.lastActionHand!,
                                previousRoute: ScreenTypes.table
                            });
                        }}
                    />
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 20,
                                paddingHorizontal: 8,
                                paddingTop: 8,
                                textAlign: 'center'
                            }}
                        >
                            Dealer must draw to 16
                        </Text>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 20,
                                paddingBottom: 8,
                                paddingHorizontal: 8,
                                textAlign: 'center'
                            }}
                        >
                            and stand on all 17s
                        </Text>
                    </View>
                )}
                <Divider />
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-evenly' }}>
                {screenProps.player.hands.map((hand, index) => (
                    <HandComponent
                        key={index}
                        hand={hand}
                        isCurrentHand={
                            screenProps.phase === Phases.player &&
                            index === screenProps.player.handIndex
                        }
                    />
                ))}
            </ScrollView>
        </View>
        <Actions {...screenProps} />
    </WithNavBar>
);
