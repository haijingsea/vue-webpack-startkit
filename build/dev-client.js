/* eslint-disable */
require('eventsource-polyfill')
const config = require('../config')
const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    console.log('reload')
    window.location.reload()
  }
})

