var yo = require('yo-yo')

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
  return yo`
      <div class="row">
      
        <div class="eight columns offset-by-four ${item.disabled ? 'disabled' : ''}">
          <span class="from-me shadow-1 clickable" onclick=${item.action}>
            ${item.text}
          </span>
        </div>
      
      </div>
  `
}

module.exports = function BubbleList (state) {

  return yo`
    <div id="lightfaden--bubble-list-wrapper" class="${ state.open ? '' : 'hidden' }">
      ${ state.currentView ? state.currentView.map(ci => {
    if (ci.robot) return new RobotBubble(ci)
    else return new OwnBubble(ci)
  }) : '' }
    </div>
  `
}
