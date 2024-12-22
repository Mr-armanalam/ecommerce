import React from 'react';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import {
  LinePlot,
  MarkPlot,
  lineElementClasses,
  markElementClasses,
} from '@mui/x-charts/LineChart';

// Example data for daily and weekly orders
const dailyOrders = [50, 70, 100, 80, 60, 90, 110];
const xLabels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

export default function LineChart() {
  return (
    <div>
      <h2>Daily Orders</h2>
      <ChartContainer
        width={500}
        height={300}
        series={[{ type: 'line', data: dailyOrders }]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
        sx={{
          [`& .${lineElementClasses.root}`]: {
            stroke: '#8884d8',
            strokeWidth: 2,
          },
          [`& .${markElementClasses.root}`]: {
            stroke: '#8884d8',
            scale: '0.6',
            fill: '#fff',
            strokeWidth: 2,
          },
        }}
        disableAxisListener
      >
        <LinePlot />
        <MarkPlot />
      </ChartContainer>
    </div>
  );
}
