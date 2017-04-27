import React from 'react'
import './FTools.css'

const FTools = ({ width, height, change }) => {
  const handleChange = (e) => {
    const key = e.target.name
    const value = e.target.value
    change({ [key]: value })
  }
  return (
    <div className="ftools">
      <div className="container">
        <div className="control">
          <label htmlFor="width">Width</label>       
          <input id="width" type="text" name="width" value={ width } onChange={ handleChange } />
        </div>
        <div className="control">
          <label htmlFor="height">Height</label>       
          <input id="height" type="text" name="height" value={ height } onChange={ handleChange } />
        </div>
        <div className="control">
          <label htmlFor="resolution">Resolution</label>       
          <input id="resolution" type="text" />
        </div>
        <div className="control">
          <label htmlFor="palette">Palette</label>       
          <select id="palette">
            <option>b&amp;w</option>
            <option>rainbow</option>
          </select>
        </div>
        <div className="control">
          <label>Status</label>
          <div className="info">
            <div>Ready</div>
          </div>
        </div>
        <div className="control">
          <label>Position</label>
          <div className="info">
            <div>x: 123</div>
            <div>y: 456</div>
            <div>zoom: 789</div>
          </div>
        </div>
        <div className="control">
          <label>Controls</label>
          <div className="info">
            <div>move: click/touch &amp; drag</div>
            <div>zoom: + - / pinch</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FTools
