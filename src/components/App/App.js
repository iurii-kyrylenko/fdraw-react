import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import FDraw from '../../fdraw/components/FDraw'
import FTools from '../FTools/FTools'

class App extends Component {
  constructor () {
    super()
    this.state = {
      width: 320,
      height: 300
    }
    this.changeHandler = this.changeHandler.bind(this)
  }

  changeHandler (e) {
    this.setState(e)
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
            <FTools width={ this.state.width }
                    height={ this.state.height }
                    change={ this.changeHandler }
            />
          </div>
          <FDraw width={ this.state.width }
                 height={ this.state.height }
          />
        </div>
      </div>
    )
  }
}

export default App
