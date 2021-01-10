import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Actions, ActionsProps } from '../components/actions';
import { DecisionEvaluationComponent } from '../components/decision-evaluation';
import { Divider } from '../components/divider';
import { HandComponent } from '../components/hand-component';
import { WithNavBar, WithNavBarPropsFromScreenProps } from '../components/with-nav-bar';
import { tableCenterHeight } from '../constants';
import { DecisionEvaluation, Hand, NavigationProps, Phases, Player, ScreenTypes } from '../types';

type TableProps = NavigationProps<ScreenTypes.table> &
    ActionsProps &
    WithNavBarPropsFromScreenProps & {
        dealerHand?: Hand;
        decisionEvaluation?: DecisionEvaluation;

        phase: Phases;
        player: Player;
    };

export const Table: React.FC<TableProps> = (props) => (
    <WithNavBar
        navigation={props.navigation}
        route={props.route}
        player={props.player}
        trainedHandsStats={props.trainedHandsStats}
    >
        <View
            style={{
                flex: 1,
                width: '100%'
            }}
        >
            <View style={{ minHeight: 128, justifyContent: 'center' }}>
                {props.dealerHand && (
                    <HandComponent
                        hand={props.dealerHand}
                        isCurrentHand={props.phase === Phases.dealer}
                    />
                )}
            </View>
            <View style={{ height: tableCenterHeight, justifyContent: 'center', width: '100%' }}>
                <Divider />
                {props.decisionEvaluation ? (
                    <DecisionEvaluationComponent
                        decisionEvaluation={props.decisionEvaluation}
                        showDecisionsHandler={() => {
                            props.navigation.navigate(ScreenTypes.handDecisions, {
                                handRepresentation: props.player.lastActionHand!
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
                {props.player.hands.map((hand, index) => (
                    <HandComponent
                        key={index}
                        hand={hand}
                        isCurrentHand={
                            props.phase === Phases.player && index === props.player.handIndex
                        }
                    />
                ))}
            </ScrollView>
        </View>
        <Actions {...props} />
    </WithNavBar>
);
