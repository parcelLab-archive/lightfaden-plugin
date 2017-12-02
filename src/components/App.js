var yo = require('yo-yo')
var store = require('../store')
var BubbleList = require('./BubbleList')

module.exports = function App (state) {

  var toggleSelf = function () {
    if (state.open) return store({ type: 'self.close' })
    else return store({ type: 'self.open' })
  }

  return yo`
    <div>
      ${ state.open ? yo`<div id="lightfaden--backdrop"></div>` : '' }

      ${ new BubbleList(state) }

      <div onclick=${toggleSelf} id="lightfaden--launcher" class="shadow-1">
        🤖
      </div>
    </div>
  `
}
