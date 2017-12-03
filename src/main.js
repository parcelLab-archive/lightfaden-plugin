var yo = require('yo-yo')
var App = require('./components/App')
var store = require('./store')

function LightFaden(userId) {
  this.store = store
  this.store({ type: 'SET_USERID', payload: userId })
}

LightFaden.prototype.init = function () {
  this.element = new App(this.store.getState())

  this.store.on('*', (action, state)=> {
    this.element = yo.update(this.element, new App(state))
  })

  this.store({ type: 'FETCH_INIT' })

  document.body.appendChild(this.element)
}

window.LightFaden = LightFaden
