import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import FDraw from '../../fdraw/components/FDraw'
import FTools from '../FTools/FTools'

class App extends Component {
  constructor () {
    super()
    this.state = {
      tools: {
        width: { value: 320, err: false },
        height: { value: 200, err: false },
        resolution: { value: 300, err: false },
      },
      draw: {
        width: 320,
        height: 200,
        resolution: 300
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  get diff () {
    const s = this.state
    // !!! values in tools are string
    console.log(s)
    return (
      s.tools.width.value != s.draw.width ||
      s.tools.height.value != s.draw.height ||
      s.tools.resolution.value != s.draw.resolution
    )
  }

  handleChange (e) {
    const error = isNaN(e.value) || e.value < 1 || e.value > 100000
    this.setState(s => {
      s.tools = { ...s.tools, [e.key]: { value: e.value, error } }
    })
  }

  handleSubmit () {
    this.setState(s => {
      s.draw = {
        width: s.tools.width.value,
        height: s.tools.height.value,
        resolution: s.tools.resolution.value
      }
    })
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
                    diff={ this.diff }
                    change={ this.handleChange }
                    submit={ this.handleSubmit } />
          </div>
          <FDraw width={ this.state.draw.width }
                 height={ this.state.draw.height }
                 resolution={ this.state.draw.resolution } />
        </div>
      </div>
    )
  }
}

export default App
