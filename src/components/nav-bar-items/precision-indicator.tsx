import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AppNavigation, RouteNames } from '../../types';

export interface PrecisionIndicatorProps {
  isEnabled: boolean;
  navigation: AppNavigation;
  precision: number;
}

export const PrecisionIndicator: React.FC<PrecisionIndicatorProps> = (props) => {
  const precision = Math.floor(props.precision * 1000) / 10;
  return (
    <Pressable
      onPress={
        props.isEnabled
          ? () => {
              props.navigation.navigate(RouteNames.missedPairs);
            }
          : undefined
      }
      style={{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ color: 'white', fontSize: 20 }}>{precision}%</Text>
        <Svg height={28} viewBox="0 0 1000 1000" width={28} style={{ marginLeft: 4 }}>
          <Path
            fill="white"
            d="M784.5,368.7L990,163.2l-166.9,11.6L834.7,7.9L629.2,213.4l-9,128.5L499.6,462.6c-10.1,0.1-20.1,3.9-27.8,11.6c-15.5,15.5-15.5,40.6,0,56.1c15.5,15.5,40.6,15.5,56.1,0c9.6-9.6,13.3-23,10.9-35.4L656,377.7L784.5,368.7z M671.4,232.6l112-112l-7.1,101l101-7l-112,112l-101,7L671.4,232.6z"
          />
          <Path
            fill="white"
            d="M967.8,357.1l-35.6,33.2c10.7,41.4,15.4,84.1,13.9,127.5c-8.6,246-215.7,439.2-461.7,430.6c-246-8.6-439.2-215.7-430.6-461.7c8.6-246,215.7-439.2,461.7-430.6c28.6,1,56.9,5,84.6,11.4l37.7-35.2c-39.3-11.5-79.9-18.2-120.9-19.6C247,3.3,19.7,215.2,10.3,485.2C0.9,755.1,212.8,982.3,482.7,991.8c269.9,9.4,497.2-202.5,506.6-472.4C991.3,463.9,984,409.5,967.8,357.1z"
          />
          <Path
            fill="white"
            d="M698.1,426.1c7,18.4,11.6,37.7,13.3,57.6c10.2,116.6-76.4,219.9-193.1,230.1C401.7,724,298.5,637.4,288.3,520.8c-10.2-116.6,76.4-219.9,193-230.1c25.8-2.3,51.7,0.3,76.3,7.3l-4-45.6c-24.8-5.3-50.5-7.1-76.1-4.8C337.1,259.8,232.8,384.1,245,524.5C257.3,665,381.6,769.3,522.1,757C662.6,744.7,766.9,620.5,754.6,480c-1.7-19.8-5.8-39.1-11.9-57.7L698.1,426.1z"
          />
        </Svg>
      </View>
    </Pressable>
  );
};
