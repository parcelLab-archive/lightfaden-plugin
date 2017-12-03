var createStore = require('store-emitter')
var open = require('oauth-open')

var store = createStore( (action, state) => {
  if (action.type === 'FETCH_INIT') {
    fetch(`https://api.lightfaden.io/activity?userId=${state.userId}&activity=initialized_app`, {
      method: 'GET',
    })    
      .then(res => store({ type: 'FETCH_VIEW' }))
      .catch(err => console.log(err))
  }
  if (action.type === 'FETCH_VIEW') {
    fetch(`https://api.lightfaden.io/lightfaden?userId=${state.userId}&route=${encodeURIComponent(window.location.pathname)}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => store({ type: 'SET_VIEW', payload: data }))
      .catch(err => console.log(err))
    return state
  }
  if (action.type === 'FETCH_AUTH_DB') {
    open('https://simulator-api.db.com/gw/oidc/authorize?response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A3000&client_id=f5a56768-3f73-494c-bc73-78a2b1f12c49&state=abc',  (err, code) => {
      if (err) console.log(err)
      else store({ type: 'SET_AUTH_DB', payload: code })
    })
  }
  if (action.type === 'SET_AUTH_DB') {
    setTimeout(() => {
      store({ type: 'FETCH_ADDRESS_DB' })
    }, 1)

    return Object.assign(state, { auth: action.payload })
  }
  if (action.type === 'FETCH_ADDRESS_DB') {
    fetch('https://simulator-api.db.com/gw/dbapi/v1/partners', {
      method: 'GET',
      mode: 'no-cors',
      headers:
        {
          'Access-Control-Allow-Origin': '*',
          'postman-token': 'd070bfa1-94d8-0d8f-673c-e60dfed2f0b5',
          'cache-control': 'no-cache',
          authorization: 'Bearer ' + state.auth.access_token,
        }
    })
      .then(res => res.json())
      .then(data => store({ type: 'SET_ADDRESS_DB', payload: data }))
      .catch(err => console.log(err))
  }
  if (action.type === 'SET_ADDRESS_DB') {
    return Object.assign(state, { address: action.payload })
  }
  if (action.type === 'SET_USERID') {
    return Object.assign(state, { userId: action.payload })
  }
  if (action.type === 'OPEN') {
    return Object.assign(state, { open: true })
  }
  if (action.type === 'CLOSE') {
    return Object.assign(state, { open: false })
  }
  if (action.type === 'SET_VIEW') {
    if (!action.payload) action.payload = []
    if (state.address) {
      action.payload.push({ text: 'Show me my billing information.', action: 'SHOW_BILLING_INFO' })
    } else {
      action.payload.push({ text: 'Authenticate with Deutsch Bank account.', action: 'FETCH_AUTH_DB'  })
    }
    return Object.assign(state, { view: action.payload })
  }
  if (action.type === 'START_TOUR') {
    var tour = new window.EnjoyHint({})
    tour.set(action.payload)
    tour.run()
    return Object.assign(state, { open: false, tour: tour })
  }
  if (action.type === 'START_INSPERCTOR') {
    $('body').mouseover(e => {
      var element = document.elementFromPoint(e.clientX, e.clientY)
      var target = $(e.target)
      target.addClass('mo-hover')
      element.onmouseout = function () {
        target.removeClass('mo-hover')
      }
    })
    $('.mo-hover').click(e => {
      e.preventDefault()
      var target = $(e.target)
      target.removeClass('mo-hover')
      $('body').off('mouseover')
      //  remove listeners
      // dispatch transmit to backend
      console.log('clicked on ', target)
      $('.mo-hover').off('click')
    })
  }
  return state // if no state got modified
}, {

  userId: null,
  open: false,
  view: [ 
    { robot: true, text: '...' }, 
    { text: 'Authenticate with Deutsche Bank.', action: 'FETCH_AUTH_DB' },
  ]

})

module.exports = store