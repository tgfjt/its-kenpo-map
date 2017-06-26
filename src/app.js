const choo = require('choo')

const app = choo()

app.use(require('./models/ichiran'))

app.route('/', require('./pages/mainView'))

module.exports = app