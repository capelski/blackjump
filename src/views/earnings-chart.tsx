import React from 'react';
import { Dimensions, ScrollView, StyleProp, Text, TextStyle, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { dangerColor, nonRandomColor, splitColor, tableColor } from '../constants';
import { Player } from '../types';

interface EarningsChartProps {
    earningsHistorical: Player['earningsHistorical'];
}

const textProperties: StyleProp<TextStyle> = {
    color: 'white',
    fontSize: 20,
    marginBottom: 8,
    padding: 8,
    width: '100%'
};

export const EarningsChart: React.FC<EarningsChartProps> = (props) => {
    const chartWidth = Math.max(
        props.earningsHistorical.length * 30,
        Dimensions.get('window').width - 8 * 2
    );

    return (
        <View
            style={{
                justifyContent: 'center',
                flexGrow: 1
            }}
        >
            <ScrollView horizontal={true} style={{ flexGrow: 0 }}>
                <LineChart
                    chartConfig={{
                        backgroundGradientFrom: tableColor,
                        backgroundGradientTo: tableColor,
                        color: () => `rgb(255, 255, 255)`,
                        decimalPlaces: 1,
                        propsForLabels: {
                            fontSize: 16
                        }
                    }}
                    data={{
                        datasets: [
                            {
                                data:
                                    props.earningsHistorical.length > 0
                                        ? props.earningsHistorical.map((x) => x.resultingCash)
                                        : [0]
                            }
                        ],
                        labels: []
                    }}
                    getDotProps={(_, dataPointIndex) => {
                        const cashOperation = props.earningsHistorical[dataPointIndex];
                        return {
                            fill: cashOperation.isBasicStrategyHit ? splitColor : dangerColor,
                            r: 5,
                            stroke: cashOperation.isNonRandomHand ? nonRandomColor : undefined,
                            strokeWidth: cashOperation.isNonRandomHand ? 3 : undefined
                        };
                    }}
                    height={300}
                    style={{ marginLeft: -24, paddingHorizontal: 8 }}
                    width={chartWidth}
                    withVerticalLines={false}
                />
            </ScrollView>
            <View style={{ paddingHorizontal: 16 }}>
                <Text style={{ ...textProperties, backgroundColor: nonRandomColor }}>
                    Non random hand
                </Text>
                <Text style={{ ...textProperties, backgroundColor: splitColor }}>
                    Basic strategy hit
                </Text>
                <Text style={{ ...textProperties, backgroundColor: dangerColor }}>
                    Basic strategy miss
                </Text>
            </View>
        </View>
    );
};
