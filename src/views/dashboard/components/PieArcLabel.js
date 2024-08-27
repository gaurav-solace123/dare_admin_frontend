import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const data = [
  { value: 55, label: 'Middle School' },
  { value: 45, label: 'Elementary School' },
//   { value: 15, label: 'C' },
//   { value: 20, label: 'D' },
];

const size = {
  width: 500,
  height: 200,
};

export default function PieArcLabel() {
  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => ` ${item.value} %`,
          arcLabelMinAngle: 45,
          data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
      {...size}
    />
  );
}
