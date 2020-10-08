import React from 'react';
import { View } from 'react-native';
import { Phases } from '../types';
import { Button } from './button';

interface ActionsProps {
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

export const Actions: React.FC<ActionsProps> = (props) => (
    <View style={{ width: '100%', height: 112, flexDirection: 'row', flexWrap: 'wrap' }}>
        {props.phase === Phases.player && (
            <React.Fragment>
                <Button
                    height="50%"
                    backgroundColor="#428bca"
                    isEnabled={true}
                    onPress={props.hitHandler}
                    text="Hit"
                    width="50%"
                />
                <Button
                    height="50%"
                    backgroundColor="#46b8da"
                    isEnabled={true}
                    onPress={props.standHandler}
                    text="Stand"
                    width="50%"
                />
                <Button
                    height="50%"
                    backgroundColor="#5cb85c"
                    isEnabled={props.isSplitEnabled}
                    onPress={props.splitHandler}
                    text="Split"
                    width="33%"
                />
                <Button
                    height="50%"
                    backgroundColor="#ffc107"
                    isEnabled={props.isDoubleEnabled}
                    onPress={props.doubleHandler}
                    text="Double"
                    width="34%"
                />
                <Button
                    height="50%"
                    backgroundColor="#dc3545"
                    isEnabled={props.isSurrenderEnabled}
                    onPress={props.surrenderHandler}
                    text="Surrender"
                    width="33%"
                />
            </React.Fragment>
        )}
        {props.phase === Phases.finished && (
            <Button
                height="100%"
                backgroundColor="#428bca"
                isEnabled={true}
                onPress={props.startTrainingRound}
                text="Next"
                width="100%"
            />
        )}
    </View>
);
