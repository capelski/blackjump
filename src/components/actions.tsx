import React from 'react';
import { View } from 'react-native';
import { actionsHeight, colors } from '../constants';
import { getRandomCard } from '../logic/card';
import { createHand } from '../logic/hand';
import { onBoardingSteps } from '../logic/onboarding';
import { getRandomTrainingPair } from '../logic/training-pairs';
import {
    BaseDecisions,
    CardSuit,
    GameConfig,
    Hand,
    Phases,
    PlayerDecisions,
    SimpleCardSymbol,
    TrainedHands
} from '../types';
import { Button } from './button';

export interface ActionsProps {
    gameConfig: GameConfig;
    handlers: {
        double: () => void;
        hit: () => void;
        split: () => void;
        stand: () => void;
        surrender: () => void;
    };
    isDoubleEnabled: boolean;
    isSplitEnabled: boolean;
    isSurrenderEnabled: boolean;
    phase: Phases;
    onBoardingStep: number;
    startTrainingRound: (playerHand: Hand, dealerHand: Hand) => void;
    trainedHands: TrainedHands;
}

export const Actions: React.FC<ActionsProps> = (props) => {
    const isPlayerTurn = props.phase === Phases.player;

    return (
        <View
            style={{ width: '100%', height: actionsHeight, flexDirection: 'row', flexWrap: 'wrap' }}
        >
            {props.phase === Phases.finished ? (
                <Button
                    height="100%"
                    backgroundColor={colors[BaseDecisions.hit]}
                    isEnabled={true}
                    onPress={() => {
                        let dealerHand: Hand;
                        let playerHand: Hand;

                        if (
                            onBoardingSteps[props.onBoardingStep] &&
                            onBoardingSteps[props.onBoardingStep].id === 1
                        ) {
                            // Prevent dealing a BlackJack as initial hand when onboarding is active
                            playerHand = createHand([
                                {
                                    isBlueCard: false,
                                    isGoldCard: false,
                                    suit: CardSuit.clubs,
                                    symbol: SimpleCardSymbol.Seven
                                },
                                getRandomCard()
                            ]);
                            dealerHand = createHand([getRandomCard()]);
                        } else if (props.gameConfig.useGoldHands) {
                            const trainingPair = getRandomTrainingPair(
                                props.gameConfig,
                                props.trainedHands
                            );
                            playerHand = trainingPair.player;
                            dealerHand = trainingPair.dealer;
                        } else {
                            playerHand = createHand([getRandomCard(), getRandomCard()]);
                            dealerHand = createHand([getRandomCard()]);
                        }

                        props.startTrainingRound(playerHand, dealerHand);
                    }}
                    text="Train"
                    width="100%"
                />
            ) : (
                <React.Fragment>
                    <Button
                        height="50%"
                        backgroundColor={colors[BaseDecisions.hit]}
                        isEnabled={isPlayerTurn}
                        onPress={props.handlers.hit}
                        text={BaseDecisions.hit}
                        width="50%"
                    />
                    <Button
                        height="50%"
                        backgroundColor={colors[BaseDecisions.stand]}
                        isEnabled={isPlayerTurn}
                        onPress={props.handlers.stand}
                        text={BaseDecisions.stand}
                        width="50%"
                    />
                    <Button
                        height="50%"
                        backgroundColor={colors[BaseDecisions.split]}
                        isEnabled={isPlayerTurn && props.isSplitEnabled}
                        onPress={props.handlers.split}
                        text={BaseDecisions.split}
                        width="33%"
                    />
                    <Button
                        height="50%"
                        backgroundColor={colors[PlayerDecisions.double]}
                        isEnabled={isPlayerTurn && props.isDoubleEnabled}
                        onPress={props.handlers.double}
                        text={PlayerDecisions.double}
                        width="34%"
                    />
                    <Button
                        height="50%"
                        backgroundColor={colors[PlayerDecisions.surrender]}
                        isEnabled={isPlayerTurn && props.isSurrenderEnabled}
                        onPress={props.handlers.surrender}
                        text={PlayerDecisions.surrender}
                        width="33%"
                    />
                </React.Fragment>
            )}
        </View>
    );
};
