import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { splitColor, surrenderColor } from '../constants';
import { DecisionEvaluation } from '../types';

interface DecisionEvaluationProps {
    decisionEvaluation: DecisionEvaluation;
    showDecisionsHandler: () => void;
}

export const DecisionEvaluationComponent: React.FC<DecisionEvaluationProps> = (props) => (
    <View
        style={{
            alignItems: 'center',
            backgroundColor: props.decisionEvaluation.hit ? splitColor : surrenderColor,
            flex: 1,
            justifyContent: 'center',
            width: '100%'
        }}
    >
        <TouchableOpacity
            onPress={props.decisionEvaluation.hit ? undefined : props.showDecisionsHandler}
        >
            <Text
                style={{
                    padding: 8,
                    color: 'white',
                    fontSize: 20,
                    textAlign: 'center'
                }}
            >
                {props.decisionEvaluation.message}
            </Text>
        </TouchableOpacity>
    </View>
);
