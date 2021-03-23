import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Actions, ActionsProps } from '../components/actions';
import { DecisionEvaluationComponent } from '../components/decision-evaluation';
import { Divider } from '../components/divider';
import { HandComponent } from '../components/hand-component';
import { OnBoardingSection } from '../components/onboarding-section';
import { tableCenterHeight } from '../constants';
import {
    AppNavigation,
    DecisionEvaluation,
    Hand,
    OnBoardingSections,
    Phases,
    Player,
    RouteNames
} from '../types';

type TableProps = ActionsProps & {
    dealerHand?: Hand;
    decisionEvaluation?: DecisionEvaluation;
    navigation: AppNavigation;
    onBoardingStep: number;
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
            <OnBoardingSection
                isHighlighted={OnBoardingSections.tableDealerHand}
                onBoardingStep={props.onBoardingStep}
                style={{ minHeight: 128, justifyContent: 'center' }}
            >
                {props.dealerHand && (
                    <HandComponent
                        hand={props.dealerHand}
                        isCurrentHand={props.phase === Phases.dealer}
                        isSoundEnabled={props.gameConfig.isSoundEnabled}
                        navigation={props.navigation}
                    />
                )}
            </OnBoardingSection>

            <OnBoardingSection
                isHighlighted={OnBoardingSections.tableFeedback}
                onBoardingStep={props.onBoardingStep}
                style={{ height: tableCenterHeight, justifyContent: 'center', width: '100%' }}
            >
                <Divider />
                {props.decisionEvaluation ? (
                    <DecisionEvaluationComponent
                        decisionEvaluation={props.decisionEvaluation}
                        showDecisionsHandler={
                            props.onBoardingStep > -1
                                ? undefined
                                : () => {
                                      props.navigation.navigate(RouteNames.handDecisions, {
                                          handRepresentation: props.player.lastActionHand!
                                      });
                                  }
                        }
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
            </OnBoardingSection>

            <OnBoardingSection
                isHighlighted={OnBoardingSections.tablePlayerHands}
                onBoardingStep={props.onBoardingStep}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'space-evenly'
                    }}
                    style={{ width: '100%' }}
                >
                    {props.player.hands.map((hand, index) => (
                        <HandComponent
                            hand={hand}
                            isCurrentHand={
                                props.phase === Phases.player && index === props.player.handIndex
                            }
                            isSoundEnabled={props.gameConfig.isSoundEnabled}
                            key={index}
                            navigation={props.navigation}
                        />
                    ))}
                </ScrollView>
            </OnBoardingSection>
        </View>

        <OnBoardingSection
            isHighlighted={OnBoardingSections.tableActions}
            onBoardingStep={props.onBoardingStep}
        >
            <Actions
                gameConfig={props.gameConfig}
                handlers={props.handlers}
                isDoubleEnabled={props.isDoubleEnabled}
                isSplitEnabled={props.isSplitEnabled}
                isSurrenderEnabled={props.isSurrenderEnabled}
                phase={props.phase}
                onBoardingStep={props.onBoardingStep}
                startTrainingRound={props.startTrainingRound}
                trainedHands={props.trainedHands}
            />
        </OnBoardingSection>
    </React.Fragment>
);
