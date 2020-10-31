import React from 'react';
import { View } from 'react-native';
import { actionsHeight, colors } from '../constants';
import { BaseDecisions, Phases, PlayerDecisions } from '../types';
import { Button } from './button';

export interface ActionsProps {
    phase: Phases;
    isDoubleEnabled: boolean;
    isSplitEnabled: boolean;
    isSurrenderEnabled: boolean;
    doubleHandler: () => void;
    hitHandler: () => void;
    splitHandler: () => void;
    standHandler: () => void;
    startTrainingRound: () => void;
    surrenderHandler: () => void;
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
                    onPress={props.startTrainingRound}
                    text="Next"
                    width="100%"
                />
            ) : (
                <React.Fragment>
                    <Button
                        height="50%"
                        backgroundColor={colors[BaseDecisions.hit]}
                        isEnabled={isPlayerTurn}
                        onPress={props.hitHandler}
                        text={BaseDecisions.hit}
                        width="50%"
                    />
                    <Button
                        height="50%"
                        backgroundColor={colors[BaseDecisions.stand]}
                        isEnabled={isPlayerTurn}
                        onPress={props.standHandler}
                        text={BaseDecisions.stand}
                        width="50%"
                    />
                    <Button
                        height="50%"
                        backgroundColor={colors[BaseDecisions.split]}
                        isEnabled={isPlayerTurn && props.isSplitEnabled}
                        onPress={props.splitHandler}
                        text={BaseDecisions.split}
                        width="33%"
                    />
                    <Button
                        height="50%"
                        backgroundColor={colors[PlayerDecisions.double]}
                        isEnabled={isPlayerTurn && props.isDoubleEnabled}
                        onPress={props.doubleHandler}
                        text={PlayerDecisions.double}
                        width="34%"
                    />
                    <Button
                        height="50%"
                        backgroundColor={colors[PlayerDecisions.surrender]}
                        isEnabled={isPlayerTurn && props.isSurrenderEnabled}
                        onPress={props.surrenderHandler}
                        text={PlayerDecisions.surrender}
                        width="33%"
                    />
                </React.Fragment>
            )}
        </View>
    );
};
