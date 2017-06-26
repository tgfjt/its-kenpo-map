const fs = require('fs')
const path = require('path')
const trumpet = require('trumpet')

const app = require('./app')

app.use((state, emitter) => {
  const tr = trumpet()

  tr.pipe(process.stdout)

  const ws = tr.select('#app-root').createWriteStream()
  ws.end(app.toString('/', state))

  fs.createReadStream(path.resolve(__dirname, './layouts/index.html')).pipe(tr)
})