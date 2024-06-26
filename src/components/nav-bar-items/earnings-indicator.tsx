import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { dangerColor, splitColor } from '../../constants';
import { AppNavigation, RouteNames } from '../../types';

export interface EarningsIndicatorProps {
  earnings: number;
  isEnabled: boolean;
  navigation: AppNavigation;
}

export const EarningsIndicator: React.FC<EarningsIndicatorProps> = (props) => {
  const earningsColor =
    props.earnings > 0 ? splitColor : props.earnings < 0 ? dangerColor : 'white';

  return (
    <Pressable
      onPress={
        props.isEnabled
          ? () => {
              props.navigation.navigate(RouteNames.earningsChart);
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
        <Text style={{ color: earningsColor, fontSize: 20 }}>
          {`${props.earnings > 0 ? '+' : ''}${props.earnings}`}
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
    </Pressable>
  );
};
