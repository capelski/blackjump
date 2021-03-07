import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { onBoardingSteps } from '../logic/onboarding';
import { OnBoardingSections } from '../types';

export interface OnBoardingSectionProps {
    isHighlighted?: OnBoardingSections | boolean;
    onBoardingStep: number;
    style?: StyleProp<ViewStyle> | ((isHighlighted: boolean) => StyleProp<ViewStyle>);
}

export const OnBoardingSection: React.FC<OnBoardingSectionProps> = (props) => {
    const isOnboardingActive = props.onBoardingStep > -1;
    const isHighlighted =
        isOnboardingActive &&
        (typeof props.isHighlighted === 'boolean'
            ? props.isHighlighted
            : props.isHighlighted !== undefined &&
              onBoardingSteps[props.onBoardingStep] &&
              onBoardingSteps[props.onBoardingStep].activeSection === props.isHighlighted);
    const style =
        props.style && typeof props.style === 'function' ? props.style(isHighlighted) : props.style;

    return (
        <View
            style={{
                width: '100%',
                ...(style as {})
            }}
        >
            {props.children}
            {isOnboardingActive && !isHighlighted && (
                <View
                    style={{
                        backgroundColor: 'black',
                        opacity: 0.5,
                        top: 0,
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        left: 0
                    }}
                />
            )}
        </View>
    );
};
