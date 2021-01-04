import React from 'react';
import { View } from 'react-native';
import { actionsHeight, colors } from '../constants';
import { getRandomCard } from '../logic/card';
import { createHand } from '../logic/hand';
import { getRandomTrainingPair } from '../logic/training-pairs';
import { BaseDecisions, GameConfig, Hand, Phases, PlayerDecisions, TrainedHands } from '../types';
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
                        const trainingPair =
                            props.gameConfig.dealUntrainedHands &&
                            getRandomTrainingPair(props.gameConfig, props.trainedHands);

                        const playerHand = trainingPair
                            ? trainingPair.player
                            : createHand([getRandomCard(), getRandomCard()]);
                        const dealerHand = trainingPair
                            ? trainingPair.dealer
                            : createHand([getRandomCard()]);

                        props.startTrainingRound(playerHand, dealerHand);
                    }}
                    text="Next"
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
