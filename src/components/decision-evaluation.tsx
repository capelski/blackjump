import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { tableCenterHeight } from '../constants';
import { DecisionEvaluation } from '../types';

interface DecisionEvaluationProps {
    decisionEvaluation: DecisionEvaluation;
    showDecisionsHandler: () => void;
}

export const DecisionEvaluationComponent: React.FC<DecisionEvaluationProps> = (props) => (
    <View
        style={{
            height: tableCenterHeight,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: props.decisionEvaluation.hit ? '#5cb85c' : '#dc3545'
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
                {props.decisionEvaluation.hit
                    ? 'Well done!'
                    : props.decisionEvaluation.failureReason}
            </Text>
        </TouchableOpacity>
    </View>
);
