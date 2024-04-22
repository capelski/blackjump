import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Text, View } from 'react-native';
import { tableColor } from '../../constants';
import { CasinoRules, CasinoRulesKeys, SplitsNumber } from '../../types';

interface SplitsNumberPickerProps {
  casinoRules: CasinoRules;
  onValueChange: (nextCasinoRules: CasinoRules) => void;
}

export const SplitsNumberPicker: React.FC<SplitsNumberPickerProps> = (props) => {
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
        {CasinoRulesKeys.splitsNumber}
      </Text>

      <View style={{ backgroundColor: 'white', flex: 1, marginLeft: 8 }}>
        <Picker
          selectedValue={String(props.casinoRules[CasinoRulesKeys.splitsNumber])}
          style={{
            backgroundColor: 'transparent',
            color: tableColor,
            height: 35,
            width: '100%',
          }}
          onValueChange={(newValue: string) => {
            const nextSplitsNumber = parseInt(newValue);
            const nextCasinoRules = {
              ...props.casinoRules,
              [CasinoRulesKeys.doublingAfterSplit]:
                props.casinoRules[CasinoRulesKeys.doublingAfterSplit] && nextSplitsNumber > 0,
              [CasinoRulesKeys.hitSplitAces]:
                props.casinoRules[CasinoRulesKeys.hitSplitAces] && nextSplitsNumber > 0,
              [CasinoRulesKeys.splitsNumber]: nextSplitsNumber,
            };
            props.onValueChange(nextCasinoRules);
          }}
        >
          <Picker.Item label="None" value={String(SplitsNumber.none)} />
          <Picker.Item label="1" value={String(SplitsNumber.one)} />
          <Picker.Item label="2" value={String(SplitsNumber.two)} />
          <Picker.Item label="3" value={String(SplitsNumber.three)} />
        </Picker>
      </View>
    </View>
  );
};
