var createStore = require('store-emitter')

var store = createStore( (action, state) => {
  if (action.type === 'FETCH_VIEW') {
    fetch(`https://api.lightfaden.io/lightfaden?userId=${state.userId}&route=${encodeURIComponent(window.location.pathname)}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => store({ type: 'SET_VIEW', payload: data }))
      .catch(err => console.log(err))
    return state
  }
  if (action.type === 'SET_USERID') {
    return Object.assign(state, { user: action.payload })
  }
  if (action.type === 'OPEN') {
    return Object.assign(state, { open: true })
  }
  if (action.type === 'CLOSE') {
    return Object.assign(state, { open: false })
  }
  if (action.type === 'SET_VIEW') {
    return Object.assign(state, { view: action.payload })
  }
  if (action.type === 'START_TOUR') {
    var tour = new window.EnjoyHint({})
    tour.set(action.payload)
    tour.run()
    return Object.assign(state, { tour: tour })
  }
}, {

  userId: null,
  open: false,
  view: [ { robot: true, text: '...' } ]

})

module.exports = store