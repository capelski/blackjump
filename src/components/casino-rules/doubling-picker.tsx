import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Text, View } from 'react-native';
import { tableColor } from '../../constants';
import { CasinoRules, CasinoRulesKeys, Doubling } from '../../types';

interface DoublingPickerProps {
  casinoRules: CasinoRules;
  onValueChange: (nextCasinoRules: CasinoRules) => void;
}

export const DoublingPicker: React.FC<DoublingPickerProps> = (props) => {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 16,
        width: '100%',
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 20,
        }}
      >
        {CasinoRulesKeys.doubling}
      </Text>

      <View style={{ backgroundColor: 'white', flex: 1, marginLeft: 8 }}>
        <Picker
          selectedValue={String(props.casinoRules[CasinoRulesKeys.doubling])}
          style={{
            backgroundColor: 'transparent',
            color: tableColor,
            height: 35,
            width: '100%',
          }}
          onValueChange={(newValue: string) => {
            const nextDoubling = parseInt(newValue);
            const nextCasinoRules = {
              ...props.casinoRules,
              [CasinoRulesKeys.doublingAfterSplit]:
                props.casinoRules[CasinoRulesKeys.doublingAfterSplit] && nextDoubling > 0,
              [CasinoRulesKeys.doubling]: nextDoubling,
            };
            props.onValueChange(nextCasinoRules);
          }}
        >
          <Picker.Item label="Any pair" value={String(Doubling.anyPair)} />
          <Picker.Item label="9, 10, 11, S19, S20" value={String(Doubling.nineToElevenSoft)} />
          <Picker.Item label="9, 10, 11" value={String(Doubling.nineToEleven)} />
          <Picker.Item label="10, 11" value={String(Doubling.tenToEleven)} />
          <Picker.Item label="None" value={String(Doubling.none)} />
        </Picker>
      </View>
    </View>
  );
};
