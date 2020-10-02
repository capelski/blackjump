import React from 'react';
import { Text, View } from 'react-native';
import { DecisionEvaluation } from '../types';

interface DecisionEvaluationProps {
    decisionEvaluation?: DecisionEvaluation;
}

export const DecisionEvaluationComponent: React.FC<DecisionEvaluationProps> = (props) => (
    <View
        style={{
            height: 64,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: props.decisionEvaluation
                ? props.decisionEvaluation.hit
                    ? '#5cb85c'
                    : '#dc3545'
                : undefined
        }}
    >
        {props.decisionEvaluation && (
            <Text
                style={{
                    padding: 8,
                    color: 'white',
                    fontSize: 18,
                    textAlign: 'center'
                }}
            >
                {props.decisionEvaluation.hit
                    ? 'Well done!'
                    : props.decisionEvaluation.failureReason}
            </Text>
        )}
    </View>
);
