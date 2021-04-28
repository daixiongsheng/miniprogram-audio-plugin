const { name } = require('./package.json')
if (process.env.NODE_ENV === 'production') {
  module.exports = require(`./dist/${name}.global.prod.js`)
} else {
  module.exports = require(`./dist/${name}.cjs.dev.js`)
}
