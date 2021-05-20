import React from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, View } from 'react-native';
import { dangerColor, splitColor } from '../constants';
import { DecisionEvaluation } from '../types';

interface DecisionEvaluationProps {
    decisionEvaluation: DecisionEvaluation;
    showDecisionsHandler?: () => void;
}

const textProperties: StyleProp<TextStyle> = {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
};

export const DecisionEvaluationComponent: React.FC<DecisionEvaluationProps> = (props) => (
    <View
        style={{
            alignItems: 'center',
            backgroundColor: props.decisionEvaluation.isHit ? splitColor : dangerColor,
            flex: 1,
            justifyContent: 'center',
            width: '100%'
        }}
    >
        {props.decisionEvaluation.isHit ? (
            <Text style={textProperties}>Well done</Text>
        ) : (
            <View
                style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    paddingHorizontal: 8
                }}
            >
                <Text
                    style={{
                        ...textProperties,
                        fontWeight: 'bold'
                    }}
                >
                    {props.decisionEvaluation.handName}
                </Text>
                <Text style={textProperties}> must </Text>
                <Text
                    style={{
                        ...textProperties,
                        fontWeight: 'bold'
                    }}
                >
                    {props.decisionEvaluation.dynamicDecision}
                </Text>
                <Text style={textProperties}> vs dealer's </Text>
                <Text
                    style={{
                        ...textProperties,
                        fontWeight: 'bold',
                        marginRight: 8
                    }}
                >
                    {props.decisionEvaluation.dealerSymbol}
                </Text>
                <TouchableOpacity onPress={props.showDecisionsHandler} style={{ marginTop: 8 }}>
                    <Text
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 16,
                            color: dangerColor,
                            fontSize: 20,
                            paddingHorizontal: 16,
                            paddingVertical: 2,
                            textAlign: 'center'
                        }}
                    >
                        {props.decisionEvaluation.handName} decisions ➡️
                    </Text>
                </TouchableOpacity>
            </View>
        )}
    </View>
);
