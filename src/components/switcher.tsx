import React from 'react';
import { Switch, Text, View } from 'react-native';
import { hitColor } from '../constants';

type SwitcherProps = {
    disabled?: boolean;
    label: string;
    onValueChange: (value: boolean) => void;
    value: boolean;
};

export const Switcher: React.FC<SwitcherProps> = (props) => {
    return (
        <View
            style={{
                alignItems: 'center',
                flexDirection: 'row',
                opacity: props.disabled ? 0.3 : undefined,
                paddingTop: 12,
                width: '100%'
            }}
        >
            <Switch
                disabled={props.disabled}
                onValueChange={props.onValueChange}
                style={{ marginRight: 8 }}
                trackColor={{ true: hitColor, false: 'white' }}
                value={props.value}
            />
            <Text
                style={{
                    color: 'white',
                    fontSize: 20
                }}
            >
                {props.label}
            </Text>
            {props.children}
        </View>
    );
};
