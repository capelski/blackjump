import React from 'react';
import { Text, View } from 'react-native';
import { onBoardingSteps } from '../logic/onboarding';
import { Button } from './button';

interface OnboardingBarProps {
    exitOnboarding: () => void;
    nextStepHandler: () => void;
    onBoardingStep: number;
    previousStepHandler: () => void;
}

export const OnboardingBar: React.FC<OnboardingBarProps> = (props) => {
    const currentStep = onBoardingSteps[props.onBoardingStep];

    return (
        <View style={{ alignItems: 'center', backgroundColor: 'white', flexDirection: 'row' }}>
            <View style={{ width: '10%' }}>
                {props.onBoardingStep > 0 && !currentStep.hidePreviousButton && (
                    <Button
                        height={56}
                        isEnabled={true}
                        onPress={props.previousStepHandler}
                        text="⬅️"
                        textColor="black"
                        textSize={24}
                        width="100%"
                    />
                )}
            </View>

            <View style={{ width: '70%' }}>
                <Text style={{ color: 'black', fontSize: 20, padding: 16 }}>
                    {currentStep.text}
                </Text>
            </View>

            <View style={{ width: '10%' }}>
                {props.onBoardingStep < onBoardingSteps.length - 1 &&
                    !currentStep.hideNextButton && (
                        <Button
                            height={56}
                            isEnabled={true}
                            onPress={props.nextStepHandler}
                            text="➡️"
                            textColor="black"
                            textSize={24}
                            width="100%"
                        />
                    )}
            </View>

            <View style={{ width: '10%' }}>
                <Button
                    height={56}
                    isEnabled={true}
                    onPress={props.exitOnboarding}
                    text="❌"
                    textColor="black"
                    textSize={20}
                    width="100%"
                />
            </View>
        </View>
    );
};
