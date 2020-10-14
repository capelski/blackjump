import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { DecisionEvaluation } from '../types';

interface DecisionEvaluationProps {
    decisionEvaluation?: DecisionEvaluation;
    showDecisionsHandler: () => void;
}

export const DecisionEvaluationComponent: React.FC<DecisionEvaluationProps> = (props) => (
    <View
        style={{
            height: 80,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 16,
            backgroundColor: props.decisionEvaluation
                ? props.decisionEvaluation.hit
                    ? '#5cb85c'
                    : '#dc3545'
                : undefined
        }}
    >
        {props.decisionEvaluation && (
            <TouchableOpacity
                onPress={props.decisionEvaluation.hit ? undefined : props.showDecisionsHandler}
            >
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
                        : props.decisionEvaluation.failureReason + ' ➡️'}
                </Text>
            </TouchableOpacity>
        )}
    </View>
);
