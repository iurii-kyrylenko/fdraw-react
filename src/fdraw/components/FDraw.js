import React from 'react'
import './FDraw.css'

const FDraw = (props) => {
  return (
    <canvas className="fcanvas"
            tabIndex="-1"
            width={ props.width }
            height={ props.height }>
    </canvas>
  )
}

export default FDraw
