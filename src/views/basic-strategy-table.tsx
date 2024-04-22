import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { DoublingPicker } from '../components/casino-rules/doubling-picker';
import { RuleSwitcher } from '../components/casino-rules/rule-switcher';
import { SplitsNumberPicker } from '../components/casino-rules/splits-number-picker';
import { colors } from '../constants';
import { allDealerSymbols } from '../logic/dealer-symbols';
import { getTrainingHands } from '../logic/training-hand';
import {
  BaseDecisions,
  CasinoRules,
  CasinoRulesKeys,
  Dictionary,
  DynamicDecisions,
  HandCode,
} from '../types';
import { getObjectKeys } from '../utils';

const actionsAbbreviationMap: Dictionary<string, BaseDecisions | DynamicDecisions> = {
  [BaseDecisions.hit]: 'H',
  [BaseDecisions.stand]: 'S',
  [DynamicDecisions.double_hit]: 'Dh',
  [DynamicDecisions.double_stand]: 'Ds',
  [DynamicDecisions.split_hit]: 'Ph',
  [DynamicDecisions.split_stand]: 'Ps',
  [DynamicDecisions.split_surrender_hit]: 'Pr',
  [DynamicDecisions.surrender_hit]: 'Rh',
  [DynamicDecisions.surrender_split_hit]: 'Rp',
  [DynamicDecisions.surrender_stand]: 'Rs',
};

const handCodesAbbreviationMap: Partial<Dictionary<string, HandCode>> = {
  [HandCode.Split2s]: '2s',
  [HandCode.Split3s]: '3s',
  [HandCode.Split4s]: '4s',
  [HandCode.Split5s]: '5s',
  [HandCode.Split6s]: '6s',
  [HandCode.Split7s]: '7s',
  [HandCode.Split8s]: '8s',
  [HandCode.Split9s]: '9s',
  [HandCode.Split10s]: 'Xs',
  [HandCode.SplitAs]: 'As',
  [HandCode.Soft13]: 'A2',
  [HandCode.Soft14]: 'A3',
  [HandCode.Soft15]: 'A4',
  [HandCode.Soft16]: 'A5',
  [HandCode.Soft17]: 'A6',
  [HandCode.Soft18]: 'A7',
  [HandCode.Soft19]: 'A8',
  [HandCode.Soft20]: 'A9',
};

const cellWidth = Math.floor((100 * 100) / (allDealerSymbols.length + 1)) / 100;

interface TextCellProps {
  children?: React.ReactNode;
  backgroundColor?: string;
}

const TextCell: React.FC<TextCellProps> = (props) => (
  <Text
    style={{
      backgroundColor: props.backgroundColor,
      color: 'white',
      fontSize: 16,
      marginVertical: 1,
      paddingVertical: 2,
      textAlign: 'center',
      width: `${cellWidth}%`,
    }}
  >
    {props.children}
  </Text>
);

interface BasicStrategyTableProps {
  casinoRules: CasinoRules;
}

export const BasicStrategyTable: React.FC<BasicStrategyTableProps> = (props) => {
  const [casinoRules, setCasinoRules] = useState(props.casinoRules);
  const trainingHands = getTrainingHands(casinoRules);

  return (
    <ScrollView style={{ width: '100%' }}>
      <Text
        onPress={() => {
          Linking.openURL('https://wizardofodds.com/games/blackjack/strategy/calculator/');
        }}
        style={{
          color: 'white',
          fontSize: 20,
          fontStyle: 'italic',
          marginVertical: 16,
          paddingHorizontal: 16,
        }}
      >
        This basic strategy table is based on the data available at the Wizard of Odds basic
        strategy calculator
      </Text>

      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <RuleSwitcher
          casinoRules={casinoRules}
          onValueChange={setCasinoRules}
          ruleName={CasinoRulesKeys.blackjackPeek}
        />

        <RuleSwitcher
          casinoRules={casinoRules}
          onValueChange={setCasinoRules}
          ruleName={CasinoRulesKeys.dealerHitsSoft17}
        />

        <DoublingPicker casinoRules={casinoRules} onValueChange={setCasinoRules} />

        <RuleSwitcher
          casinoRules={casinoRules}
          onValueChange={setCasinoRules}
          ruleName={CasinoRulesKeys.doublingAfterSplit}
        />

        <SplitsNumberPicker casinoRules={casinoRules} onValueChange={setCasinoRules} />

        <RuleSwitcher
          casinoRules={casinoRules}
          onValueChange={setCasinoRules}
          ruleName={CasinoRulesKeys.surrender}
        />
      </View>

      <View style={{ flexDirection: 'row', width: '100%' }}>
        {[''].concat(Object.values(allDealerSymbols)).map((dealerSymbol) => (
          <TextCell key={dealerSymbol}>{dealerSymbol}</TextCell>
        ))}
      </View>

      {Object.values(HandCode).map((handCode) => {
        const trainingHand = trainingHands[handCode];
        return (
          <View key={handCode} style={{ flexDirection: 'row', width: '100%' }}>
            <TextCell>{handCodesAbbreviationMap[handCode] || handCode}</TextCell>
            {getObjectKeys(trainingHand.decisionSet).map((cardSymbol) => (
              <TextCell
                key={cardSymbol}
                backgroundColor={colors[trainingHand.decisionSet[cardSymbol]]}
              >
                {actionsAbbreviationMap[trainingHand.decisionSet[cardSymbol]]}
              </TextCell>
            ))}
          </View>
        );
      })}

      <View style={{ paddingHorizontal: 16, marginVertical: 16 }}>
        {getObjectKeys(actionsAbbreviationMap).map((action) => (
          <Text
            key={action}
            style={{
              backgroundColor: colors[action],
              color: 'white',
              fontSize: 20,
              paddingHorizontal: 8,
              paddingVertical: 4,
              marginBottom: 4,
            }}
          >
            {actionsAbbreviationMap[action]} = {action}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};
