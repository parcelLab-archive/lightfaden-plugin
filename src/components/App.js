var yo = require('yo-yo')
var store = require('../store')
var BubbleList = require('./BubbleList')

module.exports = function App (state) {

  var toggleSelf = function () {
    if (state.open) return store({ type: 'CLOSE' })
    else return store({ type: 'OPEN' })
  }

  var bubbleList = new BubbleList(state)

  return yo`
    <div>
      ${ state.open ? yo`<div id="lightfaden--backdrop"></div>` : '' }

      ${ bubbleList }

      <div onclick=${toggleSelf} id="lightfaden--launcher" class="shadow-1">
        🤖
      </div>
    </div>
  `
}
