import React from 'react';
import SparkLineTable from './SparklineTable';
import './index.css';

// Source: https://codesandbox.io/s/8no9wgg2?file=/index.html:0-213

const SparklineChart = ({ data, labels, tooltipFormatter, seriesOptions }) =>
  <SparkLineTable tooltipFormatter={tooltipFormatter} seriesOptions={seriesOptions}>
    <tbody id="tbody-sparkline">
      <tr>
        <th style={{ display: 'none' }}>{labels ? labels.join(", ") : ''}</th>
        <td data-sparkline={data} />
        {/* <td data-sparkline="3, 26, -41, -30 ; column" /> */}
      </tr>
    </tbody>
  </SparkLineTable>;

export default SparklineChart;