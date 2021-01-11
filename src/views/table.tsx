import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Actions, ActionsProps } from '../components/actions';
import { DecisionEvaluationComponent } from '../components/decision-evaluation';
import { Divider } from '../components/divider';
import { HandComponent } from '../components/hand-component';
import { tableCenterHeight } from '../constants';
import { AppNavigation, DecisionEvaluation, Hand, Phases, Player, RouteNames } from '../types';

type TableProps = ActionsProps & {
    dealerHand?: Hand;
    decisionEvaluation?: DecisionEvaluation;
    navigation: AppNavigation;
    phase: Phases;
    player: Player;
};

export const Table: React.FC<TableProps> = (props) => (
    <React.Fragment>
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
                            props.navigation.navigate(RouteNames.handDecisions, {
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
        <Actions
            gameConfig={props.gameConfig}
            handlers={props.handlers}
            isDoubleEnabled={props.isDoubleEnabled}
            isSplitEnabled={props.isSplitEnabled}
            isSurrenderEnabled={props.isSurrenderEnabled}
            phase={props.phase}
            startTrainingRound={props.startTrainingRound}
            trainedHands={props.trainedHands}
        />
    </React.Fragment>
);
