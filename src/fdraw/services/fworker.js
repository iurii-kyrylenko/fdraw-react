self.onmessage = (e) => {
  console.log('from main:', e.data)
  postMessage({ test: e.data.test + ' !!!!!!'})
}