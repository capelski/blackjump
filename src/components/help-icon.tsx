import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { hitColor } from '../constants';

interface HelpIconProps {
    onPress: () => void;
}

export const HelpIcon: React.FC<HelpIconProps> = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Text
                style={{
                    backgroundColor: hitColor,
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
