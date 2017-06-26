const expose = require('choo-expose')
const log = require('choo-log')

const app = require('./app')

if (process.env.NODE_ENV !== 'production') {
  app.use(log())
  app.use(expose())
}

app.mount('#app-root')
