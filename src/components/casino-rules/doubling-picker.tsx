import React from 'react';
import { Picker, View, Text } from 'react-native';
import { tableColor } from '../../constants';
import { CasinoRules, CasinoRulesKeys, Doubling } from '../../types';

interface DoublingPickerProps {
    casinoRules: CasinoRules;
    onValueChange?: (nextCasinoRules: CasinoRules) => void;
    setCasinoRules: (casinoRules: CasinoRules) => void;
}

export const DoublingPicker: React.FC<DoublingPickerProps> = (props) => {
    return (
        <View
            style={{
                alignItems: 'center',
                flexDirection: 'row',
                paddingTop: 16,
                width: '100%'
            }}
        >
            <Text
                style={{
                    color: 'white',
                    fontSize: 20
                }}
            >
                {CasinoRulesKeys.doubling}
            </Text>

            <View style={{ backgroundColor: 'white', flex: 1, marginLeft: 8 }}>
                <Picker
                    selectedValue={props.casinoRules[CasinoRulesKeys.doubling]}
                    style={{
                        backgroundColor: 'transparent',
                        color: tableColor,
                        height: 35,
                        width: '100%'
                    }}
                    onValueChange={(newValue: string) => {
                        const nextDoubling = parseInt(newValue);
                        const nextCasinoRules = {
                            ...props.casinoRules,
                            [CasinoRulesKeys.doublingAfterSplit]:
                                props.casinoRules[CasinoRulesKeys.doublingAfterSplit] &&
                                nextDoubling > 0,
                            [CasinoRulesKeys.doubling]: nextDoubling
                        };
                        props.setCasinoRules(nextCasinoRules);
                        props.onValueChange && props.onValueChange(nextCasinoRules);
                    }}
                >
                    <Picker.Item label="Any pair" value={Doubling.anyPair} />
                    <Picker.Item label="9, 10, 11, S19, S20" value={Doubling.nineToElevenSoft} />
                    <Picker.Item label="9, 10, 11" value={Doubling.nineToEleven} />
                    <Picker.Item label="10, 11" value={Doubling.tenToEleven} />
                    <Picker.Item label="None" value={Doubling.none} />
                </Picker>
            </View>
        </View>
    );
};
