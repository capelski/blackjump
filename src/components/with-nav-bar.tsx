import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { NavigationScreenProp } from 'react-navigation';
import { configBarHeight, splitColor, surrenderColor } from '../constants';
import { allTrainingPairsNumber } from '../logic/training-pairs';
import { Player, ScreenTypes, TrainedHandsStats } from '../types';

export interface WithNavBarPropsFromScreenProps {
    player: Player;
    trainedHandsStats: TrainedHandsStats;
}

export interface WithNavBarParams {
    previousRoute?: string;
}

interface WithNavBarProps extends WithNavBarPropsFromScreenProps {
    navigation: NavigationScreenProp<{ routeName: string }, WithNavBarParams>;
}

const textStyles = { color: 'white', fontSize: 20 };

export const WithNavBar: React.FC<WithNavBarProps> = (props) => {
    const earningsColor =
        props.player.cash > 0 ? splitColor : props.player.cash < 0 ? surrenderColor : 'white';
    const previousRoute = props.navigation.getParam('previousRoute');

    return (
        <View style={{ flex: 1, width: '100%' }}>
            <View
                style={{
                    alignItems: 'center',
                    backgroundColor: 'black',
                    flexDirection: 'row',
                    height: configBarHeight,
                    justifyContent: 'space-around',
                    width: '100%'
                }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'center', width: '25%' }}>
                    <Text style={{ color: earningsColor, fontSize: 20 }}>
                        {`${props.player.cash > 0 ? '+' : ''}${props.player.cash}`}
                    </Text>
                    <Svg height={24} viewBox="0 0 468 468" width={24} style={{ marginTop: 2 }}>
                        <G transform="translate(0,468) scale(0.078000,-0.078000)">
                            <Path
                                fill={earningsColor}
                                d="M2600 5595 c0 -237 -3 -305 -12 -305 -7 0 -63 -5 -125 -10 -140 -12
                    -299 -49 -398 -91 -11 -4 -49 -20 -85 -35 -304 -124 -635 -421 -789 -706 -33
                    -63 -80 -169 -88 -202 -35 -143 -41 -258 -23 -421 37 -323 180 -591 420 -785
                    77 -62 83 -66 116 -87 28 -18 244 -126 279 -140 27 -10 103 -36 115 -38 19 -5
                    100 -27 120 -35 59 -20 254 -55 418 -75 l52 -7 0 -515 0 -516 -82 6 c-76 5
                    -198 30 -223 45 -5 4 -12 7 -15 8 -71 14 -269 163 -285 215 -4 11 -10 19 -14
                    19 -12 0 -75 133 -95 200 l-17 55 -410 -3 -410 -2 6 -63 c17 -165 65 -343 132
                    -487 26 -54 99 -185 115 -205 4 -5 27 -35 51 -65 72 -93 202 -215 327 -306 60
                    -44 244 -154 257 -154 5 0 25 -9 44 -19 34 -18 167 -63 264 -90 62 -17 188
                    -31 276 -31 l79 0 0 -325 0 -325 375 0 375 0 2 332 3 333 85 6 c121 9 341 58
                    430 96 8 3 18 7 22 7 3 1 10 4 14 8 4 5 13 8 20 8 16 0 162 70 249 119 39 22
                    77 44 85 48 8 4 20 12 27 17 7 6 36 27 64 46 70 47 221 181 267 237 20 24 47
                    57 60 71 36 42 132 200 162 267 104 232 133 496 79 720 -11 44 -21 89 -24 100
                    -7 28 -110 235 -132 264 -193 254 -402 410 -708 524 -138 51 -348 95 -495 102
                    -58 3 -129 8 -158 11 l-52 5 2 502 3 502 58 -2 c154 -5 367 -94 455 -188 66
                    -71 103 -148 110 -230 l5 -65 431 0 432 0 -4 38 c-4 47 -29 151 -52 222 -141
                    430 -441 791 -800 962 -133 63 -169 78 -235 94 -5 2 -44 12 -86 23 -42 11
                    -123 25 -180 31 -57 6 -112 13 -121 16 -17 5 -18 28 -18 290 l0 284 -375 0
                    -375 0 0 -305z m0 -1585 l0 -450 -57 0 c-52 1 -84 6 -159 23 -30 7 -158 59
                    -164 66 -3 3 -18 13 -35 21 -54 28 -151 128 -186 192 -32 59 -34 69 -34 158 0
                    69 6 111 20 154 56 167 269 281 528 285 l87 1 0 -450z m975 -1485 c219 -17
                    399 -118 472 -266 46 -93 48 -281 3 -367 -80 -153 -329 -259 -612 -261 l-88
                    -1 0 448 c0 247 3 452 7 456 4 4 37 4 73 2 36 -3 101 -8 145 -11z"
                            />
                        </G>
                    </Svg>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', width: '30%' }}>
                    <Text style={textStyles}>
                        {(props.trainedHandsStats.trained &&
                            Math.floor(
                                (props.trainedHandsStats.passed * 1000) /
                                    props.trainedHandsStats.trained
                            ) / 10) ||
                            0}
                        %
                    </Text>
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

                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate(ScreenTypes.trainingHands);
                    }}
                    style={{ alignItems: 'center', width: '30%' }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={textStyles}>
                            {Math.floor(
                                (props.trainedHandsStats.trained * 1000) / allTrainingPairsNumber
                            ) / 10}
                            %
                        </Text>
                        <Svg
                            height={28}
                            viewBox="0 0 1000 1000"
                            width={28}
                            style={{ marginLeft: 4 }}
                        >
                            <Path
                                fill="white"
                                d="M819.5,386.3h-2.5c-18.4,0-33.4,5.3-48,14.3c-12.7-37.1-45-63.7-86.6-63.7c-18.4,0-35.9,5.3-50.4,14.3c-12.7-37-45-63.7-86.6-63.7c-16.2,0-31.3,4.1-44.7,11.2v-95.3c0-51.9-39.3-94-91.6-94s-94.7,42.1-94.7,94v365l-57.5-57.3c-37-36.7-102.4-31.5-133.9,0s-52.1,94.9-7,140l264.5,262.7c5.5,5.4,11.5,9.9,17.8,13.8c48.2,39.3,103.5,62.6,220.3,62.6c266.9,0,291.6-144,291.6-321.6v-188C910.1,428.4,871.8,386.3,819.5,386.3z M860.3,668.4c0,150.3-0.7,272.1-241.8,272.1c-102.1,0-163.4-22.8-209.9-68.9L158.3,622.9c-22.2-22.2-16.6-50.5,1.6-68.6c18.1-18.1,51.4-18.8,68.9-1.4c0,0,43.9,43.7,81.8,81.3c28.6,28.5,53.8,53.5,53.8,53.5V213.2c0-24.6,20.1-44.5,44.9-44.5c24.8,0,41.7,19.9,41.7,44.5V515h0.5c-0.3,1.6-0.5,3.3-0.5,5c0,13.7,11.2,24.7,24.9,24.7c13.8,0,24.9-11.1,24.9-24.7c0-1.7-0.2-3.4-0.5-5h0.5V391.3c0-24.6,17.9-44.5,42.7-44.5c0,0,43.9-0.6,43.9,44.5v163.3h0.5c-0.3,1.6-0.5,3.3-0.5,5c0,13.7,11.2,24.7,24.9,24.7c13.8,0,24.9-11.1,24.9-24.7c0-1.7-0.2-3.3-0.5-5h0.5V440.8c0-24.6,17.6-44.5,42.4-44.5c0,0,44.8,2.8,44.8,44.5v143.5h0.5c-0.3,1.6-0.5,3.3-0.5,4.9c0,13.7,11.2,24.7,24.9,24.7c13.8,0,24.3-11.1,24.3-24.7c0-1.7-0.2-3.3-0.5-4.9h0.5v-98c0-24.6,18.5-44.5,43.3-44.5c0,0,43.4-1.8,43.4,44.5C860.3,486.3,860.3,628.4,860.3,668.4z M277.5,343.4v-83.1c-7.9-17.7-12.4-37.3-12.4-58c0-78.8,63.9-142.7,142.7-142.7s142.7,63.9,142.7,142.7c0,10.8-1.3,21.2-3.6,31.3c17.9,0.7,34.1,8.1,45.9,20.1c4.6-16.4,7.3-33.5,7.3-51.4C600,96.1,513.9,10,407.7,10S215.4,96.1,215.4,202.3C215.4,258.1,239.4,308.3,277.5,343.4z"
                            />
                        </Svg>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        if (previousRoute) {
                            props.navigation.navigate(previousRoute);
                        } else {
                            const nextRoute =
                                props.navigation.state.routeName === ScreenTypes.table
                                    ? ScreenTypes.configMenu
                                    : props.navigation.state.routeName ===
                                          ScreenTypes.blueCardsInfo ||
                                      props.navigation.state.routeName ===
                                          ScreenTypes.goldHandsInfo ||
                                      props.navigation.state.routeName ===
                                          ScreenTypes.goldHandsLevelsInfo
                                    ? ScreenTypes.configMenu
                                    : ScreenTypes.table;

                            props.navigation.navigate(nextRoute);
                        }
                    }}
                    style={{ alignItems: 'center', width: '15%' }}
                >
                    {props.navigation.state.routeName === ScreenTypes.table ? (
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
                            />
                        </Svg>
                    ) : (
                        <Svg height={24} viewBox="0 0 352 512" width={24}>
                            <Path
                                fill="white"
                                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                            />
                        </Svg>
                    )}
                </TouchableOpacity>
            </View>
            {props.children}
        </View>
    );
};
