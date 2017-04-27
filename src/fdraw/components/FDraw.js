import React from 'react'
import './FDraw.css'

// eslint-disable-next-line import/no-webpack-loader-syntax
import FWorker from 'worker-loader!../services/fworker'

class FDraw extends React.Component {
  render () {
    return (
      <canvas className="fcanvas"
              tabIndex="-1"
              width={ this.props.width }
              height={ this.props.height }>
      </canvas>
    )
  }

  componentDidMount () {
    this.fworker = new FWorker()
    this.fworker.onmessage = (e) => {
      console.log('from worker:', e.data)
    }
    this.fworker.postMessage({ test: 'message' })
  }

  componentWillUnmount () {
    this.fworker.terminate()
  }
}

export default FDraw
