import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
    backgroundColor: string;
    height: number | string;
    isEnabled: boolean;
    onPress: () => void;
    text: string;
    width: number | string;
}

export const Button: React.FC<ButtonProps> = (props) => (
    <TouchableOpacity
        style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            backgroundColor: props.backgroundColor,
            height: props.height,
            opacity: props.isEnabled ? 1 : 0.4,
            width: props.width
        }}
        onPress={props.isEnabled ? props.onPress : undefined}
    >
        <Text
            style={{
                paddingVertical: 16,
                paddingHorizontal: 32,
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white'
            }}
        >
            {props.text}
        </Text>
    </TouchableOpacity>
);
