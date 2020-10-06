import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Hand, Phases } from '../types';
import { HandComponent } from './hand-component';

interface TableProps {
    dealerHand?: Hand;
    phase: Phases;
    playerHandIndex: number;
    playerHands?: Hand[];
}

export const Table: React.FC<TableProps> = (props) => (
    /* TODO Improve "table" and cards layout */
    <ScrollView
        style={{
            width: '100%',
            paddingHorizontal: 16,
            marginVertical: 16
        }}
        contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <View style={{ width: '100%' }}>
            <Text style={{ fontSize: 25, color: 'white' }}>Dealer</Text>
            {props.dealerHand && (
                <HandComponent
                    hand={props.dealerHand}
                    isCurrentHand={props.phase === Phases.dealer}
                />
            )}
        </View>
        <View
            style={{
                width: '100%',
                marginTop: 16,
                flexWrap: 'wrap'
            }}
        >
            <Text style={{ fontSize: 25, color: 'white' }}>You</Text>
            {props.playerHands?.map((hand, index) => (
                <HandComponent
                    key={index}
                    hand={hand}
                    isCurrentHand={props.phase === Phases.player && index === props.playerHandIndex}
                />
            ))}
        </View>
    </ScrollView>
);
