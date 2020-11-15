import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { formatNumber } from '../../../utils/number.utils';


export default function StackedBarSection({ data, labels }) {
  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: labels,
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      },
      stackLabels: {
        enabled: false,
      }
    },
    tooltip: {
      shared: true,
      useHTML: true,
      pointFormatter: function () {
        const point = this;
        const series = point.series;
        const legendSymbol = "<svg width='16' height='16'>" + series.legendSymbol.element.outerHTML + "</svg>";

        return legendSymbol + `${this.series.name}: ${formatNumber(this.y)} <br/>`;
      }
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        stacking: 'normal',
      }
    },
    series: [
      {
        name: 'Опорављени',
        data: data.recovered,
        color: 'var(--success)'
      },
      {
        name: 'Потврђени',
        data: data.confirmed,
        color: 'var(--warning)'
      },
      {
        name: 'Преминули',
        data: data.deaths,
        color: 'var(--danger)'
      },
    ]
  };

  return <div>
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  </div>
}