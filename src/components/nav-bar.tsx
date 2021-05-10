import React, { useEffect, useMemo } from 'react';
import { Animated, View } from 'react-native';
import { configBarHeight, tableColor } from '../constants';
import { AppNavigation, OnBoardingSections, Player, TrainedHandsStats } from '../types';
import { ConfigButton } from './nav-bar-items/config-button';
import { EarningsIndicator } from './nav-bar-items/earnings-indicator';
import { PrecisionIndicator } from './nav-bar-items/precision-indicator';
import { ProgressIndicator } from './nav-bar-items/progress-indicator';
import { OnBoardingSection } from './onboarding-section';

export interface NavBarProps {
    areGoldHandsBlockingProgress: boolean;
    navigation: AppNavigation;
    onBoardingStep: number;
    player: Player;
    progress: number;
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
        props.trainedHandsStats.trained > 0
            ? props.trainedHandsStats.passed / props.trainedHandsStats.trained
            : 0;

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
    }, [props.progress]);

    return (
        <View
            style={{
                flexDirection: 'row',
                height: configBarHeight,
                width: '100%'
            }}
        >
            <OnBoardingSection
                onBoardingStep={props.onBoardingStep}
                style={{
                    backgroundColor: 'black',
                    height: '100%',
                    justifyContent: 'center',
                    width: '25%'
                }}
            >
                <Animated.View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        transform: [{ translateX: earningsPosition }]
                    }}
                >
                    <EarningsIndicator earnings={props.player.cash} />
                </Animated.View>
            </OnBoardingSection>

            <OnBoardingSection
                isHighlighted={OnBoardingSections.precisionIndicator}
                onBoardingStep={props.onBoardingStep}
                style={(isHighlighted) => ({
                    backgroundColor: isHighlighted ? tableColor : 'black',
                    height: '100%',
                    justifyContent: 'center',
                    width: '30%'
                })}
            >
                <Animated.View
                    style={{
                        alignItems: 'center',
                        flexGrow: 1,
                        transform: [{ translateX: precisionPosition }]
                    }}
                >
                    <PrecisionIndicator
                        isEnabled={props.onBoardingStep === -1}
                        navigation={props.navigation}
                        precision={precision}
                    />
                </Animated.View>
            </OnBoardingSection>

            <OnBoardingSection
                isHighlighted={OnBoardingSections.progressIndicator}
                onBoardingStep={props.onBoardingStep}
                style={(isHighlighted) => ({
                    backgroundColor: isHighlighted ? tableColor : 'black',
                    height: '100%',
                    justifyContent: 'center',
                    width: '30%'
                })}
            >
                <Animated.View
                    style={{
                        alignItems: 'center',
                        flexGrow: 1,
                        transform: [{ translateX: progressPosition }]
                    }}
                >
                    <ProgressIndicator
                        isEnabled={props.onBoardingStep === -1}
                        navigation={props.navigation}
                        progress={props.progress}
                    />
                </Animated.View>
            </OnBoardingSection>

            <OnBoardingSection
                isHighlighted={OnBoardingSections.configMenuButton}
                onBoardingStep={props.onBoardingStep}
                style={(isHighlighted) => ({
                    alignItems: 'center',
                    backgroundColor: isHighlighted ? tableColor : 'black',
                    height: '100%',
                    justifyContent: 'center',
                    width: '15%'
                })}
            >
                <ConfigButton
                    areGoldHandsBlockingProgress={props.areGoldHandsBlockingProgress}
                    isEnabled={props.onBoardingStep === -1}
                    navigation={props.navigation}
                    progress={props.progress}
                    routeName={props.routeName}
                />
            </OnBoardingSection>
        </View>
    );
};
