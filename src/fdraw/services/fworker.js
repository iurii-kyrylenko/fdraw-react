import iterations from './iterations'
import getColor from './getColor'

const mapPoint = (srcX, srcY, trgParams) => ({
  x: trgParams.x + srcX / trgParams.zoom,
  y: trgParams.y - srcY / trgParams.zoom
})

self.onmessage = (e) => {
  const params = e.data.params
  const imageData = e.data.image

  const width = params.width
  const height = params.height
  const halfWidth = Math.floor(width / 2)
  const halfHeight = Math.floor(height / 2)
  const maxIter = params.resolution
  const fcolor = (h) => getColor.lg(h, params.palette)

  const N = 50
  let stat = new Array(N).fill(0)

  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      const ii = 4 * (j * width + i)
      const cPoint = mapPoint(i - halfWidth, j - halfHeight, params)
      const nIter = iterations.mandelbrot(cPoint, maxIter)
      const h = nIter / maxIter
      const c = fcolor(h)
      const n = Math.floor((N - 1) * h)
      stat[n]++
      imageData.data[ii + 0] = c.r
      imageData.data[ii + 1] = c.g
      imageData.data[ii + 2] = c.b
      imageData.data[ii + 3] = c.a
    }
  }

  let max = stat.reduce((m, x) => (x > m) ? x : m, 0)
  stat = stat.map(x => x / max)

  postMessage({ image: imageData, stat })
}
