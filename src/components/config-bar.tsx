import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ScreenTypes } from '../types';

interface ConfigBarProps {
    currentScreen: ScreenTypes;
    onConfigClick: () => void;
}

export const ConfigBar: React.FC<ConfigBarProps> = (props) => (
    <View
        style={{
            height: 48,
            width: '100%',
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'flex-end'
        }}
    >
        <TouchableOpacity onPress={props.onConfigClick} style={{ paddingRight: 16 }}>
            {props.currentScreen === ScreenTypes.table ? (
                <Svg height={24} viewBox="340 140 280 279.416" width={24}>
                    <Path
                        fill="white"
                        d="M620,305.666v-51.333l-31.5-5.25c-2.333-8.75-5.833-16.917-9.917-23.917L597.25,199.5l-36.167-36.75l-26.25,18.083
	c-7.583-4.083-15.75-7.583-23.916-9.917L505.667,140h-51.334l-5.25,31.5c-8.75,2.333-16.333,5.833-23.916,9.916L399.5,163.333
	L362.75,199.5l18.667,25.666c-4.083,7.584-7.583,15.75-9.917,24.5l-31.5,4.667v51.333l31.5,5.25
	c2.333,8.75,5.833,16.334,9.917,23.917l-18.667,26.25l36.167,36.167l26.25-18.667c7.583,4.083,15.75,7.583,24.5,9.917l5.25,30.916
	h51.333l5.25-31.5c8.167-2.333,16.333-5.833,23.917-9.916l26.25,18.666l36.166-36.166l-18.666-26.25
	c4.083-7.584,7.583-15.167,9.916-23.917L620,305.666z M480,333.666c-29.75,0-53.667-23.916-53.667-53.666s24.5-53.667,53.667-53.667
	S533.667,250.25,533.667,280S509.75,333.666,480,333.666z"
                    ></Path>
                </Svg>
            ) : (
                <Svg height={24} viewBox="0 0 352 512" width={24}>
                    <Path
                        fill="white"
                        d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                    ></Path>
                </Svg>
            )}
        </TouchableOpacity>
    </View>
);
