import React from 'react';
import { ScrollView, Text } from 'react-native';

export const TrainingCompleted: React.FC = () => {
    return (
        <React.Fragment>
            <ScrollView
                style={{
                    margin: 16
                }}
                contentContainerStyle={{
                    alignItems: 'center',
                    flexGrow: 1,
                    justifyContent: 'center'
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 24,
                        fontWeight: 'bold',
                        paddingTop: 16,
                        textAlign: 'center'
                    }}
                >
                    Training completed
                </Text>

                <Text style={{ color: 'white', fontSize: 64, marginVertical: 32 }}>🎉🍾</Text>

                <Text style={{ color: 'white', fontSize: 24, marginBottom: 32 }}>
                    Congratulations! You have trained every possible hand. You can now test your
                    skills in a real casino 💸💸
                </Text>

                <Text style={{ color: 'white', fontSize: 20 }}>
                    Master the Basic Strategy: reset the training stats from the configuration menu
                    and keep practicing until you make no errors at all
                </Text>
            </ScrollView>
        </React.Fragment>
    );
};
