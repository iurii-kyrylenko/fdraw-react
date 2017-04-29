import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import FDraw from '../../fdraw/components/FDraw'
import FTools from '../FTools/FTools'
import getColor from '../../fdraw/services/getColor'

class App extends Component {
  constructor () {
    super()
    this.state = {
      tools: {
        width: { value: '320', err: false },
        height: { value: '200', err: false },
        resolution: { value: '300', err: false },
      },
      draw: {
        width: 320,
        height: 200,
        resolution: 300
      },
      progress: false,
      position: {
        x: 123, y: 456, zoom: 789
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleProgress = this.handleProgress.bind(this)
    this.handleChangePosition = this.handleChangePosition.bind(this)
  }

  get diff () {
    const s = this.state
    return (
      s.tools.width.value !== s.draw.width.toString() ||
      s.tools.height.value !== s.draw.height.toString() ||
      s.tools.resolution.value !== s.draw.resolution.toString()
    )
  }

  handleChange (e) {
    const error = !e.value.match(/^[1-9][0-9]*$/) || (e.value > 10000)
    this.setState(s => {
      s.tools = { ...s.tools, [e.key]: { value: e.value, error } }
    })
  }

  handleSubmit () {
    this.setState(s => {
      s.draw = {
        width: parseInt(s.tools.width.value, 10),
        height: parseInt(s.tools.height.value, 10),
        resolution: parseInt(s.tools.resolution.value, 10)
      }
    })
  }

  handleProgress (e) {
    this.setState({ progress: e })
  }

  handleChangePosition (e) {
    this.setState({ position: e })
  }

  render() {
    return (
      <div>
        <div className="App-header">
          <h2>
            <img src={ logo } className="App-logo" alt="logo" />
            Fractal Explorer
          </h2>
        </div>
        <div className="App-body">
          <div className="vspan-after">
            <FTools width={ this.state.tools.width }
                    height={ this.state.tools.height }
                    resolution={ this.state.tools.resolution }
                    progress={ this.state.progress }
                    position={ this.state.position }
                    diff={ this.diff }
                    change={ this.handleChange }
                    submit={ this.handleSubmit } />
          </div>
          <FDraw width={ this.state.draw.width }
                 height={ this.state.draw.height }
                 resolution={ this.state.draw.resolution }
                 palette={ getColor.wk }
                 defaultValue={{ zoom: 80 }}
                 progress={ this.handleProgress }
                 changePosition={ this.handleChangePosition } />
          <FDraw width={ 200 }
                 height={ 200 }
                 resolution={ 100 }
                 palette={ getColor.wk } />
        </div>
      </div>
    )
  }
}

export default App
