import React, { useEffect, useMemo } from 'react';
import { Animated, View } from 'react-native';
import { configBarHeight } from '../constants';
import { allTrainingPairsNumber } from '../logic/training-pairs';
import { AppNavigation, Player, TrainedHandsStats } from '../types';
import { ConfigButton } from './nav-bar-items/config-button';
import { EarningsIndicator } from './nav-bar-items/earnings-indicator';
import { PrecisionIndicator } from './nav-bar-items/precision-indicator';
import { ProgressIndicator } from './nav-bar-items/progress-indicator';

export interface NavBarProps {
    navigation: AppNavigation;
    player: Player;
    routeName?: string;
    trainedHandsStats: TrainedHandsStats;
}

const shakeAmplitude = 6;
const shakeDuration = 40;
const useNativeDriver = true;

const animateIndicator = (position: Animated.Value) => {
    Animated.sequence([
        Animated.timing(position, {
            toValue: shakeAmplitude,
            duration: shakeDuration,
            useNativeDriver
        }),
        Animated.timing(position, {
            toValue: -shakeAmplitude,
            duration: shakeDuration,
            useNativeDriver
        }),
        Animated.timing(position, {
            toValue: shakeAmplitude,
            duration: shakeDuration,
            useNativeDriver
        }),
        Animated.timing(position, {
            toValue: -shakeAmplitude,
            duration: shakeDuration,
            useNativeDriver
        }),
        Animated.timing(position, {
            toValue: shakeAmplitude,
            duration: shakeDuration,
            useNativeDriver
        }),
        Animated.timing(position, {
            toValue: -shakeAmplitude,
            duration: shakeDuration,
            useNativeDriver
        }),
        Animated.timing(position, {
            toValue: shakeAmplitude,
            duration: shakeDuration,
            useNativeDriver
        }),
        Animated.timing(position, {
            toValue: 0,
            duration: shakeDuration,
            useNativeDriver
        })
    ]).start();
};

export const NavBar: React.FC<NavBarProps> = (props) => {
    const precision =
        (props.trainedHandsStats.trained &&
            Math.floor((props.trainedHandsStats.passed * 1000) / props.trainedHandsStats.trained) /
                10) ||
        0;
    const progress =
        Math.floor((props.trainedHandsStats.trained * 1000) / allTrainingPairsNumber) / 10;

    const earningsPosition = useMemo(() => new Animated.Value(0), []);
    const precisionPosition = useMemo(() => new Animated.Value(0), []);
    const progressPosition = useMemo(() => new Animated.Value(0), []);

    useEffect(() => {
        animateIndicator(earningsPosition);
    }, [props.player.cash]);

    useEffect(() => {
        animateIndicator(precisionPosition);
    }, [precision]);

    useEffect(() => {
        animateIndicator(progressPosition);
    }, [progress]);

    return (
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
            <Animated.View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    transform: [{ translateX: earningsPosition }],
                    width: '25%'
                }}
            >
                <EarningsIndicator earnings={props.player.cash} />
            </Animated.View>

            <Animated.View
                style={{
                    alignItems: 'center',
                    transform: [{ translateX: precisionPosition }],
                    width: '30%'
                }}
            >
                <PrecisionIndicator navigation={props.navigation} precision={precision} />
            </Animated.View>

            <Animated.View
                style={{
                    alignItems: 'center',
                    transform: [{ translateX: progressPosition }],
                    width: '30%'
                }}
            >
                <ProgressIndicator navigation={props.navigation} progress={progress} />
            </Animated.View>

            <ConfigButton navigation={props.navigation} routeName={props.routeName} />
        </View>
    );
};
