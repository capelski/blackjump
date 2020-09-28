import React from 'react';
import { Text, TextStyle, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';

interface ButtonProps {
    backgroundColor: string;
    isEnabled: boolean;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    text: string;
}

const buttonsStyle: TextStyle = {
    paddingVertical: 16,
    paddingHorizontal: 32,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    width: '100%',
    textAlign: 'center'
};

export const Button: React.FC<ButtonProps> = (props) => (
    <TouchableOpacity style={props.style} onPress={props.isEnabled ? props.onPress : undefined}>
        <Text
            style={{
                ...buttonsStyle,
                backgroundColor: props.backgroundColor,
                opacity: props.isEnabled ? 1 : 0.4
            }}
        >
            {props.text}
        </Text>
    </TouchableOpacity>
);
