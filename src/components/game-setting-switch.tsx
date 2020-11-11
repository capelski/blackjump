import React from 'react';
import { Switch, Text, View } from 'react-native';
import { GameSettingsKeys } from '../types';

interface GameSettingSwitchProps {
    gameSetting: GameSettingsKeys;
    onValueChange: (newValue: boolean) => void;
    value: boolean;
}

export const GameSettingSwitch: React.FC<GameSettingSwitchProps> = (props) => (
    <View style={{ flexDirection: 'row', paddingTop: 16, width: '100%' }}>
        <Switch
            disabled={false}
            onValueChange={props.onValueChange}
            style={{ marginRight: 8 }}
            trackColor={{ true: '#428bca', false: 'white' }}
            value={props.value}
        />
        <Text
            style={{
                color: 'white',
                fontSize: 20
            }}
        >
            {props.gameSetting}
        </Text>
    </View>
);
