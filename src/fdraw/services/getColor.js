/*
 * Quantization
 */
const getSegment = (h, bp) => {
  const len = bp.length
  if (h === 1) return [bp[len - 2], bp[len - 1]]
  let i = 0
  while (h < bp[i].h || h >= bp[i + 1].h) i++
  const j = (i === len) ? 0 : i + 1
  return [bp[i], bp[j]]
}

/*
 * Linear interpolation
 */
const li = (x, x1, x2, y1, y2) => {
  const r = y1 + (x - x1) * (y2 - y1) / (x2 - x1)
  return Math.round(r)
}

/*
 * Color gradient with linear interpolation
 */
const lg = (h, bp) => {
  const [p1, p2] = getSegment(h, bp)
  return {
    r: li(h, p1.h, p2.h, p1.r, p2.r),
    g: li(h, p1.h, p2.h, p1.g, p2.g),
    b: li(h, p1.h, p2.h, p1.b, p2.b),
    a: 255
  }
}

const bw = [
  { h: 0.0, r: 0, g: 0, b: 0 },
  { h: 0.125, r: 255, g: 255, b: 255 },
  { h: 0.25, r: 0, g: 0, b: 0 },
  { h: 0.375, r: 255, g: 255, b: 255 },
  { h: 0.5, r: 0, g: 0, b: 0 },
  { h: 0.625, r: 255, g: 255, b: 255 },
  { h: 0.75, r: 0, g: 0, b: 0 },
  { h: 0.875, r: 255, g: 255, b: 255 },
  { h: 1.0, r: 0, g: 0, b: 0 }
]

const wb = [
  { h: 0.0, r: 255, g: 255, b: 255 },
  { h: 0.125, r: 0, g: 0, b: 0 },
  { h: 0.25, r: 255, g: 255, b: 255 },
  { h: 0.375, r: 0, g: 0, b: 0 },
  { h: 0.5, r: 255, g: 255, b: 255 },
  { h: 0.625, r: 0, g: 0, b: 0 },
  { h: 0.75, r: 255, g: 255, b: 255 },
  { h: 0.875, r: 0, g: 0, b: 0 },
  { h: 1.0, r: 255, g: 255, b: 255 }
]

const rb = [
  { h: 0.0, r: 255, g: 255, b: 255 },
  { h: 0.1, r: 255, g: 0, b: 255 },
  { h: 0.2, r: 0, g: 0, b: 255 },
  { h: 0.3, r: 0, g: 255, b: 255 },
  { h: 0.4, r: 0, g: 255, b: 0 },
  { h: 0.6, r: 255, g: 255, b: 0 },
  { h: 0.8, r: 255, g: 0, b: 0 },
  { h: 1.0, r: 0, g: 0, b: 0 }
]

const wk = [
  { h: 0, r: 0, g: 7, b: 100 },
  { h: 0.16, r: 32, g: 107, b: 203 },
  { h: 0.42, r: 237, g: 255, b: 255 },
  { h: 0.64, r: 255, g: 170, b: 0 },
  { h: 0.86, r: 0, g: 2, b: 0 },
  { h: 1, r: 0, g: 7, b: 100 }
]

export default {
  bw, wb, rb, wk, lg
}
