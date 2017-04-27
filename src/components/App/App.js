import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import FDraw from '../../fdraw/components/FDraw'
import FTools from '../FTools/FTools'

class App extends Component {
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
          <div className="vspan-after"><FTools /></div>
          <FDraw width="400" height="250"></FDraw>
        </div>
      </div>
    )
  }
}

export default App
