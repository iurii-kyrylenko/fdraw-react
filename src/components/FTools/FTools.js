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

const FTools = ({ palettes, width, height, resolution, palette, progress, position, diff, change, submit }) => {
  return (
    <div className="ftools">
      <form className="container self-clear" onSubmit={ handleSubmit(submit) }>
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
          <select id="palette" name="palette" value={ palette } onChange={ handleChange(change) }>
            { palettes.map(p => (<option key={ p.id } value={ p.id }>{ p.name }</option>)) }
          </select>
        </div>
       <div className="control">
          <label>Status</label>
          <div className="info status">
            <div>{ progress ? 'Progress' : 'Ready' }</div>
          </div>
        </div>
        <div className="control">
          <label>Position</label>
          <div className="info position">
            <div>x: { position.x },</div>
            <div>y: { position.y },</div>
            <div>zoom: { position.zoom }</div>
          </div>
        </div>
        <div className="control controls">
          <label>Control position</label>
          <div className="info">
            <div>move: click/touch &amp; drag</div>
            <div>zoom: + - / pinch</div>
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
