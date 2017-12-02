var yo = require('yo-yo')
var App = require('./components/App')
var store = require('./store')

function LightFaden(userId, hash) {
  this.store = store
  this.store({ type: 'set', payload: {
    userId: userId,
    hash: hash,
  } })
}

LightFaden.prototype.init = function () {
  this.element = new App(this.store.getState())

  this.store.on('*', (action, state)=> {
    this.element = yo.update(this.element, new App(state))
  })

  document.body.appendChild(this.element)
}

window.LightFaden = LightFaden
