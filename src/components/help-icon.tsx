import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface HelpIconProps {
    onPress: () => void;
}

export const HelpIcon: React.FC<HelpIconProps> = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Text
                style={{
                    backgroundColor: '#428bca',
                    borderRadius: 12,
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                    paddingHorizontal: 8,
                    marginLeft: 8
                }}
            >
                ?
            </Text>
        </TouchableOpacity>
    );
};