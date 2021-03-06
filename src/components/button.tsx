import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
    backgroundColor?: string;
    height: number | string;
    isEnabled: boolean;
    marginBottom?: number;
    marginTop?: number;
    onPress: () => void;
    text: string;
    textColor?: string;
    textSize?: number;
    width: number | string;
}

export const Button: React.FC<ButtonProps> = (props) => (
    <TouchableOpacity
        style={{
            height: props.height,
            marginBottom: props.marginBottom,
            marginTop: props.marginTop,
            width: props.width
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
                width: '100%'
            }}
        >
            <Text
                style={{
                    color: props.textColor || 'white',
                    fontSize: props.textSize || 20,
                    fontWeight: 'bold'
                }}
            >
                {props.text}
            </Text>
        </View>
    </TouchableOpacity>
);
