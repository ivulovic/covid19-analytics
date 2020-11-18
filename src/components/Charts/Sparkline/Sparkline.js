import React from 'react'
import Highcharts from 'highcharts'


const defaultOptions = {
  chart: {
    backgroundColor: null,
    borderWidth: 0,
    type: 'area',
    margin: [0, 0, 0, 0],
    height: 75,
    style: {
      overflow: 'visible'
    },
    // small optimalization, saves 1-2 ms each sparkline
    skipClone: true
  },
  title: {
    text: ''
  },
  credits: {
    enabled: false
  },
  xAxis: {
    labels: {
      enabled: false
    },
    title: {
      text: null
    },
    lineColor: 'white',
    startOnTick: false,
    endOnTick: false,
    tickPositions: [],

    gridLineWidth: 0,
    lineWidth: 0,
  },
  yAxis: {
    endOnTick: false,
    startOnTick: false,
    labels: {
      enabled: false
    },
    title: {
      text: null
    },
    tickPositions: [0],

    gridLineWidth: 0,
    lineWidth: 0,
  },
  legend: {
    enabled: false
  },
  tooltip: {
    backgroundColor: 'white',
    borderWidth: 1,
    hideDelay: 0,
    shared: true,
    padding: 8,
    borderColor: 'silver',
    borderRadius: 3,
    outside: true,
    // positioner: function (w, h, point) {
    //   return { x: point.plotX - w / 2, y: point.plotY - h };
    // }
  },
  plotOptions: {
    series: {
      animation: false,
      lineWidth: 2,
      shadow: false,
      states: {
        hover: {
          lineWidth: 2
        }
      },
      marker: {
        radius: 1,
        states: {
          hover: {
            radius: 2
          }
        }
      },
      fillOpacity: 0.15,
      color: '#10b759',
      negativeColor: '#dc3545',
    },
    column: {
      negativeColor: '#910000',
      borderColor: 'silver'
    }
  },

  series: [{
    data: [1, 2, 3]
  }]
};


class SparkLine extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const options = Highcharts.merge(defaultOptions, this.props.options)
    this.chart = Highcharts.chart(this.container, options)
  }

  componentWillUnmount() {
    this.chart.destroy()
  }

  render() {
    return (
      <td
        ref={container => this.container = container}
      >
      </td>
    )
  }
}

export default SparkLine