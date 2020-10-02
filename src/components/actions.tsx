import React from 'react';
import { View } from 'react-native';
import { Phases } from '../types';
import { Button } from './button';

interface ActionsProps {
    phase: Phases;
    isDoubleEnabled: boolean;
    isSplitEnabled: boolean;
    doubleHandler: () => void;
    hitHandler: () => void;
    splitHandler: () => void;
    standHandler: () => void;
    startTrainingRound: () => void;
}

const buttonHeight = 56;

export const Actions: React.FC<ActionsProps> = (props) => (
    <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
        {props.phase === Phases.player && (
            <React.Fragment>
                <Button
                    height={buttonHeight}
                    backgroundColor="#428bca"
                    isEnabled={true}
                    onPress={props.hitHandler}
                    text="Hit"
                />
                <Button
                    height={buttonHeight}
                    backgroundColor="#46b8da"
                    isEnabled={true}
                    onPress={props.standHandler}
                    text="Stand"
                />
                <Button
                    height={buttonHeight}
                    backgroundColor="#5cb85c"
                    isEnabled={props.isSplitEnabled}
                    onPress={props.splitHandler}
                    text="Split"
                />
                <Button
                    height={buttonHeight}
                    backgroundColor="#dc3545"
                    isEnabled={props.isDoubleEnabled}
                    onPress={props.doubleHandler}
                    text="Double"
                />
            </React.Fragment>
        )}
        {props.phase === Phases.finished && (
            <Button
                height={buttonHeight * 2}
                backgroundColor="#428bca"
                isEnabled={true}
                onPress={props.startTrainingRound}
                text="Next"
                width="100%"
            />
        )}
    </View>
);
