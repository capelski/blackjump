import React from 'react';
import { DimensionValue, Pressable, Text, View } from 'react-native';

interface ButtonProps {
  backgroundColor?: string;
  height: DimensionValue;
  isEnabled: boolean;
  marginBottom?: number;
  marginTop?: number;
  onPress: () => void;
  text: string;
  textColor?: string;
  textSize?: number;
  width: DimensionValue;
}

export const Button: React.FC<ButtonProps> = (props) => (
  <Pressable
    style={{
      height: props.height,
      marginBottom: props.marginBottom,
      marginTop: props.marginTop,
      width: props.width,
    }}
    onPress={props.isEnabled ? props.onPress : undefined}
  >
    <View
      style={{
        alignItems: 'center',
        backgroundColor: props.backgroundColor,
        height: '100%',
        justifyContent: 'center',
        opacity: props.isEnabled ? 1 : 0.4,
        width: '100%',
      }}
    >
      <Text
        style={{
          color: props.textColor || 'white',
          fontSize: props.textSize || 20,
          fontWeight: 'bold',
        }}
      >
        {props.text}
      </Text>
    </View>
  </Pressable>
);
