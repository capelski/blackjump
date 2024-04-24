import React, { useMemo } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { tableColor } from '../constants';
import { Player } from '../types';
import { getAbsoluteMax, getPrimeFactors } from '../utils';

type ChartDimensions = {
  boundaries: number;
  scale: number;
  width: number;
};

type MaxMinValues = {
  max: number;
  min: number;
};

type ClustersData = {
  clusters: number[];
  clusterSize: number;
};

interface EarningsChartProps {
  earningsHistorical: Player['earningsHistorical'];
}

const chartDeadSpace = 16;
const chartMaxValues = 20;
const screenHorizontalMargin = 8;

const getChartDimensions = (data: number[]): ChartDimensions => {
  const absoluteMax = getAbsoluteMax(data);
  const primeFactors = data.length > 0 ? getPrimeFactors(absoluteMax) : [2];
  const scale = 2 * Math.min(primeFactors[0], 6);
  const windowWidth = Dimensions.get('window').width;

  return {
    boundaries: absoluteMax,
    scale,
    width: windowWidth - screenHorizontalMargin * 2,
  };
};

const getClusters = (data: number[]): ClustersData => {
  /* If less than a data point per cluster, no need to do anything */
  if (data.length < chartMaxValues) {
    return { clusters: data, clusterSize: 1 };
  }

  /* Assign each data point to a cluster */
  const averageClusterSize = Math.floor(data.length / chartMaxValues);
  const remaining = data.length % chartMaxValues;
  const clusterIndexes = [...new Array(chartMaxValues)].reduce((reduced, _, clusterIndex) => {
    const clusterSize = averageClusterSize + (clusterIndex < remaining ? 1 : 0);
    return reduced.concat(...[...new Array(clusterSize)].map(() => clusterIndex));
  }, []);

  /* Split the data points into clusters */
  const clusters = data.reduce<number[][]>((reduced, dataPoint, index) => {
    const clusterIndex = clusterIndexes[index];
    reduced[clusterIndex] = (reduced[clusterIndex] || []).concat(dataPoint);
    return reduced;
  }, []);

  /* Max and min values will be cluster representatives */
  const maxMinValues = data.reduce<MaxMinValues>(
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
    clusters: aggregatedClusters,
    clusterSize: averageClusterSize,
  };
};

const getFormattedData = (data: number[], dimensions: ChartDimensions) => {
  const boundaryDots =
    data.length > 0 ? [data[data.length - 1], dimensions.boundaries, -dimensions.boundaries] : [];

  const dotWidth = data.length > 0 ? dimensions.width / data.length : dimensions.width;
  const boundaryDotsWidth = dotWidth * boundaryDots.length;

  return {
    chartWidth: dimensions.width + boundaryDotsWidth + chartDeadSpace,
    source: data.length > 0 ? data.concat(boundaryDots) : [0],
  };
};

export const EarningsChart: React.FC<EarningsChartProps> = (props) => {
  const { chartScale, chartWidth, clusterSize, data } = useMemo(() => {
    const { clusters, clusterSize } = getClusters(props.earningsHistorical);
    const dimensions = getChartDimensions(props.earningsHistorical);
    const { chartWidth, source } = getFormattedData(clusters, dimensions);

    return {
      chartScale: dimensions.scale,
      chartWidth,
      clusterSize,
      data: source,
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
              data,
            },
          ],
          labels: [],
        }}
        height={300}
        segments={chartScale}
        style={{ marginLeft: -chartDeadSpace }}
        width={chartWidth}
        withVerticalLines={false}
      />
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
    </View>
  );
};
