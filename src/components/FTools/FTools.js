import React from 'react'
import './FTools.css'

const handleChange = change => e => {
  const key = e.target.name
  const value = e.target.value
  change({ key, value })
}

const handleSubmit = submit => e => {
  e.preventDefault()
  submit()
}

const controlClass = prop => 'control' + (prop.error ? ' error' : '')

const isFormInvalid = (width, height, resolution) =>
  (width.error || height.error || resolution.error)

const FTools = ({ width, height, resolution, progress, position, diff, change, submit }) => {
  return (
    <div className="ftools">
      <form className="container" onSubmit={ handleSubmit(submit) }>
        <div className={ controlClass(width) }>
          <label htmlFor="width">Width</label>       
          <input id="width" type="text" name="width"
                 value={ width.value } onChange={ handleChange(change) } />
        </div>
        <div className={ controlClass(height) }>
          <label htmlFor="height">Height</label>       
          <input id="height" type="text" name="height"
                 value={ height.value } onChange={ handleChange(change) } />
        </div>
        <div className={ controlClass(resolution) }>
          <label htmlFor="resolution">Resolution</label>       
          <input id="resolution" type="text" name="resolution"
                 value={ resolution.value } onChange={ handleChange(change) } />
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
          <div className="info status">
            <div>{ progress ? 'Progress' : 'Ready' }</div>
          </div>
        </div>
        <div className="control">
          <label>Controls</label>
          <div className="info">
            <div>move: click/touch &amp; drag</div>
            <div>zoom: + - / pinch</div>
          </div>
        </div>
        <div className="control">
          <label>Position</label>
          <div className="info">
            <div>x: { position.x }</div>
            <div>y: { position.y }</div>
            <div>zoom: { position.zoom }</div>
          </div>
        </div>
        { isFormInvalid(width, height, resolution) || !diff || (
          <div className="control">
            <button type="submit">Submit</button>
          </div>
        )}
      </form>
    </div>
  )
}
export default FTools
