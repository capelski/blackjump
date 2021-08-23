import React, { useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Button } from '../components/button';
import { colors, tableColor } from '../constants';
import { BaseDecisions, Player } from '../types';
import { getAbsoluteMax, getPrimeFactors } from '../utils';

type ChartDimensions = {
    boundaries: number;
    scale: number;
    width: number;
};

type ChartPage = {
    index: number;
    data: number[];
};

interface EarningsChartProps {
    earningsHistorical: Player['earningsHistorical'];
}

const chartDeadSpace = 16;
const pageSize = 20;
const screenHorizontalMargin = 8;

const getChartDimensions = (data: number[]): ChartDimensions => {
    const absoluteMax = getAbsoluteMax(data);
    const primeFactors = data.length > 0 ? getPrimeFactors(absoluteMax) : [2];
    const scale = 2 * Math.min(primeFactors[0], 6);
    const windowWidth = Dimensions.get('window').width;

    return {
        boundaries: absoluteMax,
        scale,
        width: windowWidth - screenHorizontalMargin * 2
    };
};

const getCurrentPage = (data: number[], nextIndex: number | undefined): ChartPage => {
    nextIndex = nextIndex === undefined ? (data.length > 0 ? data.length - 1 : 0) : nextIndex;
    const nextData = data.slice(
        Math.max(0, nextIndex - pageSize),
        Math.min(Math.max(0, nextIndex + 1), data.length)
    );

    return {
        data: nextData,
        index: nextIndex
    };
};

const getFormattedData = (data: number[], dimensions: ChartDimensions) => {
    const boundaryDots =
        data.length > 0
            ? [data[data.length - 1], dimensions.boundaries, -dimensions.boundaries]
            : [];

    const dotWidth = data.length > 0 ? dimensions.width / data.length : dimensions.width;
    const boundaryDotsWidth = dotWidth * boundaryDots.length;

    return {
        chartWidth: dimensions.width + boundaryDotsWidth + chartDeadSpace,
        source: data.length > 0 ? data.concat(boundaryDots) : [0]
    };
};

export const EarningsChart: React.FC<EarningsChartProps> = (props) => {
    const dimensions = useMemo(() => getChartDimensions(props.earningsHistorical), [
        props.earningsHistorical
    ]);
    const [page, setPage] = useState(() => getCurrentPage(props.earningsHistorical, undefined));
    const formattedData = useMemo(() => getFormattedData(page.data, dimensions), [
        dimensions,
        page
    ]);

    return (
        <View
            style={{
                flexGrow: 1,
                justifyContent: 'center',
                marginHorizontal: screenHorizontalMargin,
                overflow: 'hidden'
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
                            data: formattedData.source
                        }
                    ],
                    labels: []
                }}
                height={300}
                segments={dimensions.scale}
                style={{ marginLeft: -chartDeadSpace }}
                width={formattedData.chartWidth}
                withVerticalLines={false}
            />
            <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                <Button
                    height={56}
                    backgroundColor={colors[BaseDecisions.hit]}
                    isEnabled={page.index >= pageSize}
                    onPress={() => {
                        if (page.index >= pageSize) {
                            setPage(
                                getCurrentPage(props.earningsHistorical, page.index - pageSize)
                            );
                        }
                    }}
                    text="Previous"
                    width="50%"
                />
                <Button
                    height={56}
                    backgroundColor={colors[BaseDecisions.stand]}
                    isEnabled={page.index < props.earningsHistorical.length - 1}
                    onPress={() => {
                        if (page.index < props.earningsHistorical.length - 1) {
                            setPage(
                                getCurrentPage(props.earningsHistorical, page.index + pageSize)
                            );
                        }
                    }}
                    text="Next"
                    width="50%"
                />
            </View>
        </View>
    );
};
