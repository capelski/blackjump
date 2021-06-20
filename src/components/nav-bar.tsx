import React, { useEffect, useMemo } from 'react';
import { Animated, View } from 'react-native';
import { tableColor } from '../constants';
import { getProgressPercentage } from '../logic/training-status';
import { AppNavigation, OnBoardingSections, Player, TrainingStatus } from '../types';
import { ConfigButton } from './nav-bar-items/config-button';
import { EarningsIndicator } from './nav-bar-items/earnings-indicator';
import { PrecisionIndicator } from './nav-bar-items/precision-indicator';
import { ProgressIndicator } from './nav-bar-items/progress-indicator';
import { OnBoardingSection } from './onboarding-section';

export interface NavBarProps {
    navigation: AppNavigation;
    onBoardingStep: number;
    player: Player;
    routeName?: string;
    trainingStatus: TrainingStatus;
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
        props.trainingStatus.attemptedTrainingPairs > 0
            ? props.trainingStatus.passedTrainingPairs / props.trainingStatus.attemptedTrainingPairs
            : 0;

    const earningsPosition = useMemo(() => new Animated.Value(0), []);
    const precisionPosition = useMemo(() => new Animated.Value(0), []);
    const progressPosition = useMemo(() => new Animated.Value(0), []);

    const progressPercentage = getProgressPercentage(props.trainingStatus.attemptedTrainingPairs);

    useEffect(() => {
        animateIndicator(earningsPosition);
    }, [props.player.cash]);

    useEffect(() => {
        animateIndicator(precisionPosition);
    }, [precision]);

    useEffect(() => {
        animateIndicator(progressPosition);
    }, [progressPercentage]);

    return (
        <View
            style={{
                flexDirection: 'row',
                height: 48,
                width: '100%'
            }}
        >
            <OnBoardingSection
                isHighlighted={OnBoardingSections.earningsIndicator}
                onBoardingStep={props.onBoardingStep}
                style={(isHighlighted) => ({
                    backgroundColor: isHighlighted ? tableColor : 'black',
                    height: '100%',
                    justifyContent: 'center',
                    width: '25%'
                })}
            >
                <Animated.View
                    style={{
                        flexGrow: 1,
                        transform: [{ translateX: earningsPosition }]
                    }}
                >
                    <EarningsIndicator
                        earnings={props.player.cash}
                        isEnabled={props.onBoardingStep === -1}
                        navigation={props.navigation}
                    />
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
                        flexGrow: 1,
                        transform: [{ translateX: progressPosition }]
                    }}
                >
                    <ProgressIndicator
                        isEnabled={props.onBoardingStep === -1}
                        navigation={props.navigation}
                        progress={progressPercentage}
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
                    isEnabled={props.onBoardingStep === -1}
                    isProgressBlocked={props.trainingStatus.isProgressBlocked}
                    navigation={props.navigation}
                    progress={progressPercentage}
                    routeName={props.routeName}
                />
            </OnBoardingSection>
        </View>
    );
};
