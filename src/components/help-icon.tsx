import React from 'react';
import { Pressable, Text } from 'react-native';
import { tableColor } from '../constants';

interface HelpIconProps {
  onPress: () => void;
}

export const HelpIcon: React.FC<HelpIconProps> = (props) => {
  return (
    <Pressable onPress={props.onPress}>
      <Text
        style={{
          backgroundColor: 'white',
          borderRadius: 16,
          color: tableColor,
          fontSize: 18,
          fontWeight: 'bold',
          marginLeft: 8,
          marginTop: 2,
          paddingHorizontal: 8,
        }}
      >
        ?
      </Text>
    </Pressable>
  );
};
