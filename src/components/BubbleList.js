var yo = require('yo-yo')
var store = require('../store')

function RobotBubble(item) {
  return yo`
    <div class="row">

      <div class="eight columns">
        <span class="from-them">
          ${item.text}
        </span>
        <div class="avatar">🤖</div>
      </div>
      
    </div>

  `
}

function OwnBubble(item) {
  var runAction = () => {
    if (item.action) {
      store({ type: item.action, payload: item.payload || null })
    }
  }

  return yo`
      <div class="row">
      
        <div class="eight columns offset-by-four ${item.disabled ? 'disabled' : ''}">
          <span class="from-me shadow-1 clickable" onclick=${runAction}>
            ${item.text}
          </span>
        </div>
      
      </div>
  `
}

module.exports = function BubbleList (state) {

  var bubbles = state.view.map(ci => {
    if (ci.robot) return new RobotBubble(ci)
    else return new OwnBubble(ci)
  })

  return yo`
    <div id="lightfaden--bubble-list-wrapper" class="${ state.open ? '' : 'hidden' }">
      ${ bubbles }
    </div>
  `
}
