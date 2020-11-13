import React from 'react';
import SparkLineTable from './SparklineTable';
import './index.css';

// Source: https://codesandbox.io/s/8no9wgg2?file=/index.html:0-213

const SparklineChart = () =>
  <SparkLineTable>
    <tbody id="tbody-sparkline">
      <tr>
        <td data-sparkline="71, 78, 39, 66, 22, 33, 44, 66, 76, 77, 99, 100, -100, -50, -20, -10, -6, -3, 0, 10, 50, 60, 120" />
        {/* <td data-sparkline="3, 26, -41, -30 ; column" /> */}
      </tr>
    </tbody>
  </SparkLineTable>;

export default SparklineChart;