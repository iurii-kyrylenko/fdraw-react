import React from 'react'
import './FChart.css'
import getColor from '../services/getColor'

class FChart extends React.Component {

  get barStep () {
    return this.props.width / this.props.stat.length
  }

  get barWidth () {
    return this.barStep * (1 - this.props.span)
  }

  showPalette () {
    const canvas = this.refs.canvas
    const context = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    const imageData = context.createImageData(width, height)
    const fcolor = (h) => getColor.lg(h, this.props.palette)
    for (let j = 0; j < height; j++) {
      for (let i = 0; i < width; i++) {
        const ii = 4 * (j * width + i)
        const c = fcolor(i / width)
        imageData.data[ii + 0] = c.r
        imageData.data[ii + 1] = c.g
        imageData.data[ii + 2] = c.b
        imageData.data[ii + 3] = c.a
      }
    }
    context.putImageData(imageData, 0, 0)
  }

  componentDidMount () {
    this.showPalette()
  }

  componentDidUpdate () {
    this.showPalette()
  }

  render () {
    return (
      <div>
        <svg className="chart" width={ this.props.width } height={ this.props.height }>
        {
          this.props.stat.map((bar, index) => (
            <g key={ index } transform={ `translate(${index*this.barStep}, ${this.props.height*(1-bar)})` }>
              <rect width={ this.barWidth } height={ bar*this.props.height }>
                <title>{ index/this.props.stat.length + ' : ' + bar.toPrecision(2) }</title>
              </rect>
            </g>
          ))
        }
        </svg>
        <canvas ref="canvas" className="palette" width={ this.props.width } height="32"></canvas>
      </div>
    )
  }
}

export default FChart

