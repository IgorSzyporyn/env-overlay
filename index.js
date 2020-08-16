if (process.env.NODE_ENV === 'production') {
  module.exports = require('./env-overlay.cjs.production.js')
} else {
  module.exports = require('./env-overlay.cjs.development.js')
}
