import React from 'react'
import './FDraw.css'
// eslint-disable-next-line import/no-webpack-loader-syntax
import FWorker from 'worker-loader!../services/fworker'
import Interactions from '../services/interactions'

const defaultValue = { x: -0.5, y: 0, zoom: 100 }

class FDraw extends React.Component {
  constructor (props) {
    super(props)
    this.state = { ...defaultValue, ...this.props.defaultValue }
  }

  _draw () {
    if(this.props.progress) {
      this.props.progress(true)     
    }

    this.interactions.unbind()

    const context = this.refs.canvas.getContext('2d')
    const image = context.createImageData(this.props.width, this.props.height)
    const { width, height, resolution, palette } = this.props
    const params = { width, height, resolution, palette, ...this.state }
    this.fworker.postMessage({ image, params })
  }

  render () {
    return (
      <canvas ref="canvas" className="fcanvas"
              tabIndex="-1"
              width={ this.props.width }
              height={ this.props.height }>
      </canvas>
    )
  }

  componentDidMount () {
    this.fworker = new FWorker()

    this.fworker.onmessage = (e) => {
      const context = this.refs.canvas.getContext('2d')
      context.putImageData(e.data.image, 0, 0)

      if(this.props.stat) {
        this.props.stat(e.data.stat)
      }

      this.interactions.bind()

      if(this.props.progress) {
        this.props.progress(false)     
      }
    }

    this.interactions = Interactions.create(this.refs.canvas, {
      move: (dx, dy) => {
        this.setState(({ x, y, zoom: z }) => ({ x: x - dx / z, y: y + dy / z }))
      },
      zoomIn: () => {
        this.setState(({ zoom }) => ({ zoom: zoom * 1.5 }))
      },
      zoomOut: () => {
        this.setState(({ zoom }) => ({ zoom: zoom / 1.5 }))
      }
    })

    if (this.props.changePosition) {
      this.props.changePosition(this.state)
    }
 
    this._draw()
  }

  componentDidUpdate (props, state) {
    // !!! think of something better than stringify !!!
    const propsUpdated = JSON.stringify(this.props) !== JSON.stringify(props)
    const stateUpdated = JSON.stringify(this.state) !== JSON.stringify(state)

    if (propsUpdated || stateUpdated) {
      this._draw()
    }

    if (stateUpdated && this.props.changePosition) {
      this.props.changePosition(this.state)
    }
  }

  componentWillUnmount () {
    this.fworker.terminate()
  }
}

export default FDraw
