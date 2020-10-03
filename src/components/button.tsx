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
            height: props.height,
            width: props.width
        }}
        onPress={props.isEnabled ? props.onPress : undefined}
    >
        <Text
            style={{
                backgroundColor: props.backgroundColor,
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                height: '100%',
                opacity: props.isEnabled ? 1 : 0.4,
                paddingVertical: 16,
                paddingHorizontal: 32,
                textAlign: 'center',
                width: '100%'
            }}
        >
            {props.text}
        </Text>
    </TouchableOpacity>
);
