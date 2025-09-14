import React, { useMemo, useState } from 'react';
import { Dimensions, StyleProp, Text, TextStyle, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Button } from '../components/button';
import { hitColor, tableColor } from '../constants';
import { Player } from '../types';
import { getAbsoluteMax, getPrimeFactors } from '../utils';

type AggregatedData = {
  clusterSize: number | undefined;
  values: number[];
};

type ChartProperties = {
  formattedValues: number[];
  segments: number;
  width: number;
};

interface EarningsChartProps {
  earningsHistorical: Player['earningsHistorical'];
}

/** The chart library reserves some space for the axes and labels, which turns out
 * to be too much for the earnings chart */
const chartExcessivePadding = 8;
const chartMaxValues = 20;
const chartMinValues = 3;
const screenHorizontalMargin = 8;

const getSubsetForZoomSequence = (data: number[], zoomSequence: number[]): number[] => {
  if (zoomSequence.length === 0) {
    return data;
  }

  const zoomIndex = zoomSequence[0];
  const clusterSize = Math.ceil(data.length / chartMaxValues);
  const start = zoomIndex * clusterSize;
  const end = Math.min(start + clusterSize, data.length);

  return getSubsetForZoomSequence(data.slice(start, end), zoomSequence.slice(1));
};

const getAggregatedData = (
  earningsHistorical: number[],
  zoomSequence: number[],
): AggregatedData => {
  /* If less than a data point per cluster, no need to do anything */
  if (earningsHistorical.length < chartMaxValues) {
    return { clusterSize: undefined, values: earningsHistorical };
  }

  /* Limit the data to the corresponding zoom level */
  const zoomedData = getSubsetForZoomSequence(earningsHistorical, zoomSequence);

  /* Assign each data point to a cluster */
  const averageClusterSize = Math.floor(zoomedData.length / chartMaxValues);
  const remaining = zoomedData.length % chartMaxValues;
  const clusterIndexes = [...new Array(chartMaxValues)].reduce((reduced, _, clusterIndex) => {
    const clusterSize = averageClusterSize + (clusterIndex < remaining ? 1 : 0);
    return reduced.concat(...[...new Array(clusterSize)].map(() => clusterIndex));
  }, []);

  /* Split the data points into clusters */
  const clusters = zoomedData.reduce<number[][]>((reduced, dataPoint, index) => {
    const clusterIndex = clusterIndexes[index];
    reduced[clusterIndex] = (reduced[clusterIndex] || []).concat(dataPoint);
    return reduced;
  }, []);

  /* Pick a representative for each cluster */
  const aggregatedClusters = clusters.reduce((reduced, cluster, clusterIndex) => {
    const aggregatedCluster =
      clusterIndex === clusters.length - 1
        ? cluster.slice(-1)[0]
        : cluster.reduce((x, y) => x + y, 0) / cluster.length;
    return reduced.concat(aggregatedCluster);
  }, []);

  return {
    clusterSize: averageClusterSize,
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
    segments: 2 * Math.min(primeFactors[0], 4),
    width: availableWidth + boundaryDotsWidth + chartExcessivePadding,
  };
};

// const randomData = Array.from({ length: 20000 }, () => 1).reduce<number[]>((reduced, _, index) => {
//   const previous = reduced[index - 1] || 0;
//   const next = previous + (Math.random() > 0.5 ? 1 : -1);
//   reduced.push(next);
//   return reduced;
// }, []);

export const EarningsChart: React.FC<EarningsChartProps> = (props) => {
  const [zoomSequence, setZoomSequence] = useState<number[]>([]);

  const { chartSegments, chartWidth, clusterSize, formattedValues } = useMemo(() => {
    const data = props.earningsHistorical; // randomData;
    const { clusterSize, values } = getAggregatedData(data, zoomSequence);
    const { formattedValues, segments, width } = getChartProperties(data, values);

    return {
      chartSegments: segments,
      chartWidth: width,
      clusterSize,
      formattedValues,
    };
  }, [props.earningsHistorical, zoomSequence]);

  const canZoom = clusterSize !== undefined && clusterSize >= chartMinValues;

  const textProperties: StyleProp<TextStyle> = {
    color: 'white',
    fontSize: 20,
    fontStyle: 'italic',
    paddingHorizontal: 16,
    paddingTop: 8,
    textAlign: 'center',
  };

  return (
    <View
      style={{
        flexGrow: 1,
        justifyContent: 'center',
        marginHorizontal: screenHorizontalMargin,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 8,
        }}
      >
        <Text style={textProperties}>Zoom: {zoomSequence.length}</Text>
        <Button
          height={48}
          backgroundColor={hitColor}
          isEnabled={zoomSequence.length > 0}
          onPress={() => {
            setZoomSequence(zoomSequence.slice(0, -1));
          }}
          text="-"
          width={48}
        />
      </View>

      <LineChart
        chartConfig={{
          backgroundGradientFrom: tableColor,
          backgroundGradientTo: tableColor,
          color: () => `rgb(255, 255, 255)`,
          decimalPlaces: 0,
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
        style={{ marginLeft: -chartExcessivePadding }}
        width={chartWidth}
        withVerticalLines={false}
        onDataPointClick={(point) => {
          if (canZoom) {
            setZoomSequence([...zoomSequence, point.index]);
          }
        }}
      />
      <Text style={textProperties}>
        Each point in the chart represents the pot average for every{' '}
        {clusterSize && clusterSize > 1 ? `~${clusterSize}` : 1} round(s).
      </Text>
      <Text style={{ ...textProperties, opacity: canZoom ? 1 : 0 }}>
        Click on them to zoom into that range.
      </Text>
    </View>
  );
};
