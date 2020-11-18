import React from 'react'
import SparkLine from './Sparkline'



class SparkLineTable extends React.Component {
  constructor(props) {
    super(props);
    this.toSparkLine = this.toSparkLine.bind(this);
    this.sparkLine = this.sparkLine.bind(this);
  }

  toSparkLine(children, params) {
    let header;

    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) return child

      if (child.type === 'th') header = child.props.children

      if (child.props['data-sparkline']) {
        return this.sparkLine(child, header)
      }

      if (child.props.children) {
        child = React.cloneElement(child, {
          children: this.toSparkLine(child.props.children)
        })
      }

      return child
    })
  }

  sparkLine(element, header) {
    const dataAttr = element.props['data-sparkline'].split('; ')
    const data = dataAttr[0].split(', ').map(Number)
    const headerData = header.split(", ");
    console.log('a, ', this.props)
    const options = {
      series: [{
        data,
        pointStart: 1,
        ...this.props.seriesOptions,
      }],
      tooltip: {
        formatter: this.props.tooltipFormatter
      },
      chart: {
        type: dataAttr[1] || 'area'
      }
    }

    return <SparkLine options={options} />
  }

  render() {
    const style = {
      margin: '0',
      width: '100%',
      borderCollapse: 'collapse'
    }

    return (
      <table style={style}>
        {this.toSparkLine(this.props.children)}
      </table>
    )
  }
}

export default SparkLineTable