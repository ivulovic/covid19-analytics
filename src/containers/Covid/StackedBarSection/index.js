import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { renderTimestampDate } from "../../../utils/date.utils";
import { formatNumber } from '../../../utils/number.utils';


export default function StackedBarSection({ data }) {
  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    xAxis: {
      type: 'datetime',
      gridLineWidth: 0,
      lineWidth: 0,
      labels: {
        formatter: function () {
          return renderTimestampDate(this.value, { showDay: false })
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      },
      gridLineWidth: 0,
      lineWidth: 0,
      labels: {
        formatter: function () {
          return formatNumber(this.value)
        }
      },
      stackLabels: {
        enabled: false,
      }
    },
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        // The first returned item is the header, subsequent items are the
        // points
        const self = this;
        return ['<b>' + renderTimestampDate(this.x, { showDay: false }) + '</b><br/>'].concat(
          this.points ?
            this.points.map(function (point, i) {
              const legendSymbol = "<svg width='16' height='16'>" + point.series.legendSymbol.element.outerHTML + "</svg>";
              let result = legendSymbol + ' ' + point.series.name + ': ' + formatNumber(point.y) + '';
              if (i !== self.points.length - 1) {
                result += '<br/>';
              }
              return result;
            }) : []
        );
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        stacking: 'normal',
      },
      series: {
        borderColor: 'transparent',
      }
    },
    series: [
      // {
      //   name: 'Опорављени',
      //   data: data.recovered,
      //   color: 'var(--success)'
      // },
      {
        name: 'Потврђени',
        data: data.confirmed,
        color: 'var(--indigo)'
      },
      {
        name: 'Преминули',
        data: data.deaths,
        color: 'var(--danger)'
      },
      {
        name: 'Тестирани',
        data: data.tested,
        color: '#00b8d4'
      },
      {
        name: 'Хоспитализовани',
        data: data.hospitalized,
        color: '#ffc107'
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