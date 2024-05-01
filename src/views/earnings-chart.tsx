import React, { useMemo } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { tableColor } from '../constants';
import { Player } from '../types';
import { getAbsoluteMax, getPrimeFactors } from '../utils';

type AggregatedData = (
  | {
      clusterSize?: undefined;
      isClustered: false;
    }
  | {
      clusterSize: number;
      isClustered: true;
    }
) & {
  values: number[];
};

type ChartProperties = {
  formattedValues: number[];
  segments: number;
  width: number;
};

type MaxMinValues = {
  max: number;
  min: number;
};

interface EarningsChartProps {
  earningsHistorical: Player['earningsHistorical'];
}

const chartDeadSpace = 16;
const chartMaxValues = 20;
const screenHorizontalMargin = 8;

const getAggregatedData = (earningsHistorical: number[]): AggregatedData => {
  /* If less than a data point per cluster, no need to do anything */
  if (earningsHistorical.length < chartMaxValues) {
    return { isClustered: false, values: earningsHistorical };
  }

  /* Assign each data point to a cluster */
  const averageClusterSize = Math.floor(earningsHistorical.length / chartMaxValues);
  const remaining = earningsHistorical.length % chartMaxValues;
  const clusterIndexes = [...new Array(chartMaxValues)].reduce((reduced, _, clusterIndex) => {
    const clusterSize = averageClusterSize + (clusterIndex < remaining ? 1 : 0);
    return reduced.concat(...[...new Array(clusterSize)].map(() => clusterIndex));
  }, []);

  /* Split the data points into clusters */
  const clusters = earningsHistorical.reduce<number[][]>((reduced, dataPoint, index) => {
    const clusterIndex = clusterIndexes[index];
    reduced[clusterIndex] = (reduced[clusterIndex] || []).concat(dataPoint);
    return reduced;
  }, []);

  /* Max and min values will be cluster representatives */
  const maxMinValues = earningsHistorical.reduce<MaxMinValues>(
    (reduced, dataPoint) => {
      return {
        max: dataPoint > reduced.max ? dataPoint : reduced.max,
        min: dataPoint < reduced.min ? dataPoint : reduced.min,
      };
    },
    {
      max: 0,
      min: 0,
    },
  );

  /* Pick a representative for each cluster */
  const aggregatedClusters = clusters.reduce((reduced, cluster, clusterIndex) => {
    const aggregatedCluster =
      clusterIndex === clusters.length - 1
        ? cluster.slice(-1)[0]
        : cluster.find((x) => x === maxMinValues.max) ||
          cluster.find((x) => x === maxMinValues.min) ||
          cluster.reduce((x, y) => x + y, 0) / cluster.length;
    return reduced.concat(aggregatedCluster);
  }, []);

  return {
    clusterSize: averageClusterSize,
    isClustered: true,
    values: aggregatedClusters,
  };
};

const getChartProperties = (allValues: number[], aggregatedValues: number[]): ChartProperties => {
  const availableWidth = Dimensions.get('window').width - screenHorizontalMargin * 2;
  const dotWidth =
    aggregatedValues.length > 0 ? availableWidth / aggregatedValues.length : availableWidth;

  const boundaries = getAbsoluteMax(allValues);
  const boundaryDots =
    aggregatedValues.length > 0
      ? [aggregatedValues[aggregatedValues.length - 1], boundaries, -boundaries]
      : [];
  const boundaryDotsWidth = dotWidth * boundaryDots.length;

  const primeFactors = allValues.length > 0 ? getPrimeFactors(boundaries) : [2];

  return {
    formattedValues: aggregatedValues.length > 0 ? aggregatedValues.concat(boundaryDots) : [0],
    segments: 2 * Math.min(primeFactors[0], 6),
    width: availableWidth + boundaryDotsWidth + chartDeadSpace,
  };
};

export const EarningsChart: React.FC<EarningsChartProps> = (props) => {
  const { chartSegments, chartWidth, clusterSize, formattedValues, isClustered } = useMemo(() => {
    const { clusterSize, isClustered, values } = getAggregatedData(props.earningsHistorical);
    const { formattedValues, segments, width } = getChartProperties(
      props.earningsHistorical,
      values,
    );

    return {
      chartSegments: segments,
      chartWidth: width,
      clusterSize,
      formattedValues,
      isClustered,
    };
  }, [props.earningsHistorical]);

  return (
    <View
      style={{
        flexGrow: 1,
        justifyContent: 'center',
        marginHorizontal: screenHorizontalMargin,
        overflow: 'hidden',
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
            fontSize: 16,
          },
        }}
        data={{
          datasets: [
            {
              data: formattedValues,
            },
          ],
          labels: [],
        }}
        height={300}
        segments={chartSegments}
        style={{ marginLeft: -chartDeadSpace }}
        width={chartWidth}
        withVerticalLines={false}
      />
      {isClustered && (
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontStyle: 'italic',
            paddingHorizontal: 8,
            paddingTop: 8,
            textAlign: 'center',
          }}
        >
          Each point in the chart represents the pot average for every ~{clusterSize} rounds
        </Text>
      )}
    </View>
  );
};
