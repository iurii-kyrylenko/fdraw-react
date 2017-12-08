import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import FDraw from '../src/fdraw/components/FDraw'
import FChart from '../src/fdraw/components/FChart'
import getColor from '../src/fdraw/services/getColor'

storiesOf('FDraw/With fixed parameters', module)
  .add('# 1', () => (
    <FDraw
      width="200"
      height="200"
      resolution="120"
      defaultValue={{ x: 0.4025, y: 0.1948, zoom: 266020 }} palette={getColor.wk}
      progress={action('progress')}
      changePosition={action('changePosition')}
      stat={action('stat')} />
  ))
  .add('# 2', () => (
    <FDraw
      width="320"
      height="200"
      resolution="300"
      defaultValue={{ x: -1.250639199029028, y: 0.020116856497035412, zoom: 897819.3171215057 }} palette={getColor.rb}
      progress={action('progress')}
      changePosition={action('changePosition')}
      stat={action('stat')} />
  ))
  .add('# 3', () => (
    <FDraw
      width="800"
      height="200"
      resolution="300"
      defaultValue={{ x: -0.6096540731111584, y: 0.46466911980134135, zoom: 23010127 }} palette={getColor.wp}
      progress={action('progress')}
      changePosition={action('changePosition')}
      stat={action('stat')} />
  ))

const stat = new Array(78).fill(null).map((_, i) => Math.random())
  storiesOf('FChart', module)
  .add('# 1', () => (
    <FChart
      width="400"
      height="200"
      span="0.1"
      stat={stat}
      palette={getColor.wk}
    />
  ))
