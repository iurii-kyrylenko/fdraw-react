import React from 'react'
import './FChart.css'

const FChart = ({ width, height, span, stat, palette }) => {
  const barStep = width / stat.length
  const barWidth = barStep * (1 - span)
  return (
    <div>
      <svg className="chart" width={ width } height={ height }> {
        stat.map((bar, index) => (
          <g key={ index } transform={ `translate(${index*barStep}, ${height*(1-bar)})` }>
            <rect width={ barWidth } height={ bar*height }>
              <title>{ index/stat.length + ' : ' + bar.toPrecision(2) }</title>
            </rect>
          </g>
        )) }
      </svg>

      <svg className="palette" width={ width } height="32">
        <defs>
          <linearGradient id="lgrad" x1="0" y1="0.5" x2="1" y2="0.5"> {
            palette.map((c, i) => (
              <stop key={ i } offset={ c.h } style={{ stopColor: `rgb(${c.r},${c.g},${c.b})`, stopOpacity: 1 }} />
            )) }
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#lgrad)"/>
      </svg>
    </div>
  )
}

export default FChart

