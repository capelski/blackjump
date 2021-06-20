import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { tableColor } from '../constants';

interface EarningsChartProps {
    earningsHistorical: number[];
}

export const EarningsChart: React.FC<EarningsChartProps> = (props) => {
    const chartWidth = Math.max(
        props.earningsHistorical.length * 30,
        Dimensions.get('window').width - 8 * 2
    );

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} horizontal={true}>
            <LineChart
                chartConfig={{
                    backgroundGradientFrom: tableColor,
                    backgroundGradientTo: tableColor,
                    color: () => `rgb(255, 255, 255)`,
                    decimalPlaces: 0,
                    labelColor: () => `rgb(255, 255, 255)`,
                    propsForDots: {
                        r: 5
                    },
                    propsForLabels: {
                        fontSize: 16
                    }
                }}
                data={{
                    datasets: [
                        {
                            data:
                                props.earningsHistorical.length > 0 ? props.earningsHistorical : [0]
                        }
                    ],
                    labels: []
                }}
                height={300}
                style={{ marginLeft: -24, paddingHorizontal: 8 }}
                width={chartWidth}
                withVerticalLines={false}
            />
        </ScrollView>
    );
};
