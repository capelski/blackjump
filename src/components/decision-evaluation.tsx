import React from 'react';
import { Pressable, StyleProp, Text, TextStyle, View } from 'react-native';
import { dangerColor, splitColor } from '../constants';
import { DecisionEvaluation } from '../types';

interface DecisionEvaluationProps {
  decisionEvaluation: DecisionEvaluation;
  showDecisionsHandler?: () => void;
}

const textProperties: StyleProp<TextStyle> = {
  color: 'white',
  fontSize: 20,
};

const boldTextProperties: StyleProp<TextStyle> = {
  ...textProperties,
  fontWeight: 'bold',
};

export const DecisionEvaluationComponent: React.FC<DecisionEvaluationProps> = (props) => (
  <View
    style={{
      alignItems: 'center',
      backgroundColor: props.decisionEvaluation.isHit ? splitColor : dangerColor,
      flex: 1,
      justifyContent: 'center',
      width: '100%',
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
          paddingHorizontal: 8,
        }}
      >
        <Text style={boldTextProperties}>{props.decisionEvaluation.handName}</Text>
        <Text style={textProperties}> vs </Text>
        <Text style={boldTextProperties}>{props.decisionEvaluation.dealerSymbol}</Text>
        <Text style={textProperties}> = </Text>
        <Text style={boldTextProperties}>{props.decisionEvaluation.dynamicDecision}</Text>

        <Pressable onPress={props.showDecisionsHandler} style={{ marginTop: 8 }}>
          <Text
            style={{
              backgroundColor: 'white',
              borderRadius: 16,
              color: dangerColor,
              fontSize: 20,
              paddingHorizontal: 16,
              paddingVertical: 2,
              textAlign: 'center',
            }}
          >
            {props.decisionEvaluation.handName} decisions ➡️
          </Text>
        </Pressable>
      </View>
    )}
  </View>
);
