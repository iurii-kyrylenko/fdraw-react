import React, { Component } from 'react'
import logo from './logo.svg'
import github from './github-logo.svg'
import twitter from './twitter-logo.svg'
import './App.css'
import FDraw from '../../fdraw/components/FDraw'
import FChart from '../../fdraw/components/FChart'
import FTools from '../FTools/FTools'
import getColor from '../../fdraw/services/getColor'

const palettes = [
  { id: 'bw', name: 'b & w' },
  { id: 'wb', name: 'w & b' },
  { id: 'rb', name: 'rainbow' },
  { id: 'wk', name: 'wiki' }
]

class App extends Component {
  constructor () {
    super()
    this.state = {
      tools: {
        width: { value: '320', err: false },
        height: { value: '200', err: false },
        resolution: { value: '100', err: false },
        palette: 'wk'
      },
      draw: {
        width: 1,
        height: 1,
        resolution: 1,
        palette: getColor.bw
      },
      progress: false,
      position: { x: 0, y: 0, zoom: 1 },
      stat: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleProgress = this.handleProgress.bind(this)
    this.handleChangePosition = this.handleChangePosition.bind(this)
    this.handleStat = this.handleStat.bind(this)
  }

  get diff () {
    const s = this.state
    return (
      s.tools.width.value !== s.draw.width.toString() ||
      s.tools.height.value !== s.draw.height.toString() ||
      s.tools.resolution.value !== s.draw.resolution.toString() ||
      JSON.stringify(getColor[s.tools.palette]) !== JSON.stringify(s.draw.palette)
    )
  }

  handleChange (e) {
    if(e.key === 'palette') {
      this.setState(s => {
        s.tools = { ...s.tools, [e.key]: e.value }
      })
      return
    }
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
        resolution: parseInt(s.tools.resolution.value, 10),
        palette: getColor[s.tools.palette]
      }
    })
  }

  handleProgress (e) {
    this.setState({ progress: e })
  }

  handleChangePosition (e) {
    this.setState({ position: e })
  }

  handleStat (e) {
    this.setState({ stat: e })
  }

  componentWillMount () {
    this.handleSubmit()
  }

  render() {
    return (
      <div>
        <div className="app-header">
          <h2>
            <img src={ logo } className="app-logo" alt="logo" />
            <span>Fractal Explorer</span>
              <a href="https://twitter.com/iurii_kyrylenko" target="_blank" title="Twitter"><img src={ twitter } alt="twitter" /></a>
              <a href="https://github.com/iurii-kyrylenko" target="_blank" title="GitHub"><img src={ github } alt="github" /></a>
          </h2>
        </div>
        <div className="app-body">
          <div className='app-title'>Tools</div>
          <FTools width={ this.state.tools.width }
                  height={ this.state.tools.height }
                  resolution={ this.state.tools.resolution }
                  palettes={ palettes }
                  palette={ this.state.tools.palette }
                  progress={ this.state.progress }
                  position={ this.state.position }
                  diff={ this.diff }
                  change={ this.handleChange }
                  submit={ this.handleSubmit } />
          <div className='app-title'>Controlled parameters:</div>
          <FDraw width={ this.state.draw.width }
                 height={ this.state.draw.height }
                 resolution={ this.state.draw.resolution }
                 palette={ this.state.draw.palette }
                 defaultValue={{ zoom: 80 }}
                 progress={ this.handleProgress }
                 changePosition={ this.handleChangePosition }
                 stat={ this.handleStat } />
          <div className='app-title'>Spectrum (escape factor distribution):</div>
          <FChart stat={ this.state.stat }
                  width="320"
                  height="120"
                  span="0.2"
                  palette={ this.state.draw.palette } />
          <div className='app-title'>Fixed parameters (you can still change position):</div>
          <FDraw width="200"
                 height="200"
                 resolution="100"
                 defaultValue={{ x: 0.4025, y: 0.1948, zoom: 266020 }} palette={ getColor.wk } />
          &nbsp;
          <FDraw width="320"
                 height="200"
                 resolution="300"
                 defaultValue={{ x: -1.250639199029028, y: 0.020116856497035412, zoom: 897819.3171215057 }} palette={ getColor.rb } />
          &nbsp;
          <FDraw width="200"
                 height="200"
                 resolution="200"
                 defaultValue={{ x: -0.6096075864465048, y: 0.4647171747292785, zoom: 1346728.9756822586 }} palette={ getColor.bw } />
        </div>
      </div>
    )
  }
}

export default App
