import React from 'react';
import { Text, TextStyle, TouchableOpacity } from 'react-native';

interface ButtonProps {
    backgroundColor: string;
    height: number;
    isEnabled: boolean;
    onPress: () => void;
    text: string;
    width?: string;
}

const buttonStyle: TextStyle = {
    paddingVertical: 16,
    paddingHorizontal: 32,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
};

export const Button: React.FC<ButtonProps> = (props) => (
    <TouchableOpacity
        style={{
            backgroundColor: props.backgroundColor,
            height: props.height,
            opacity: props.isEnabled ? 1 : 0.4,
            width: props.width || '50%'
        }}
        onPress={props.isEnabled ? props.onPress : undefined}
    >
        <Text style={buttonStyle}>{props.text}</Text>
    </TouchableOpacity>
);
