import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { tableColor } from '../constants';
import { Player } from '../types';

interface EarningsChartProps {
    earningsHistorical: Player['earningsHistorical'];
}

const screenHorizontalMargin = 16;

const getPrimeFactors = (number: number) => {
    const factors: number[] = [];
    let divisor = 2;

    while (number >= 2) {
        if (number % divisor == 0) {
            factors.push(divisor);
            number = number / divisor;
        } else {
            divisor++;
        }
    }
    return factors.reverse();
};

export const EarningsChart: React.FC<EarningsChartProps> = (props) => {
    const absoluteMax = Math.ceil(
        props.earningsHistorical.reduce(
            (reduced, next) => Math.max(reduced, Math.abs(next)),
            Number.MIN_VALUE
        )
    );
    const primeFactors = props.earningsHistorical.length > 0 ? getPrimeFactors(absoluteMax) : [2];
    const scale = 2 * Math.min(primeFactors[0], 6);

    const windowWidth = Dimensions.get('window').width;
    const data =
        props.earningsHistorical.length > 0
            ? props.earningsHistorical.concat([
                  props.earningsHistorical[props.earningsHistorical.length - 1],
                  absoluteMax,
                  -absoluteMax
              ])
            : [0];

    const dotSpacing = Math.max(windowWidth / data.length, 30);
    const chartWidth = data.length * dotSpacing - screenHorizontalMargin * 2;
    const hiddenChartWidth = dotSpacing * 4;

    return (
        <View
            style={{
                flexGrow: 1,
                justifyContent: 'center',
                marginHorizontal: screenHorizontalMargin,
                overflow: 'hidden'
            }}
        >
            <ScrollView horizontal={true} style={{ flexGrow: 0 }}>
                <View
                    style={{
                        overflow: 'hidden',
                        width: chartWidth
                    }}
                >
                    <LineChart
                        chartConfig={{
                            backgroundGradientFrom: tableColor,
                            backgroundGradientTo: tableColor,
                            color: () => `rgb(255, 255, 255)`,
                            decimalPlaces: 1,
                            linejoinType: 'bevel',
                            propsForLabels: {
                                fontSize: 16
                            }
                        }}
                        data={{
                            datasets: [
                                {
                                    data
                                }
                            ],
                            labels: []
                        }}
                        height={300}
                        segments={scale}
                        style={{ marginLeft: -24, paddingHorizontal: 8 }}
                        width={chartWidth + hiddenChartWidth}
                        withVerticalLines={false}
                    />
                </View>
            </ScrollView>
        </View>
    );
};
