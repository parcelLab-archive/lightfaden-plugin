var createStore = require('store-emitter')
var open = require('oauth-open')

var store = createStore( (action, state) => {
  if (action.type === 'set') {
    return Object.assign(state, action.payload)
  }
  if (action.type === 'self.open') {
    return Object.assign(state, { open: true })
  }
  if (action.type === 'self.close') {
    return Object.assign(state, { open: false })
  }
  if (action.type === 'updateView') {
    return Object.assign(state, { currentView: action.payload })
  }
  if (action.type === 'startTour') {
    var tour = new window.EnjoyHint({})
    tour.set(action.payload)
    tour.run()
    return Object.assign(state, { tour: tour })
  }
}, {
  userId: null,
  hash: null,
  open: false,
  currentView: [
    {
      robot: true,
      text: 'Hello friend. How can I help you today?',
    },

    {
      text: 'Please show me the features of this app.',
      action: () => {
        store({ type: 'self.close' })
        store({ type: 'startTour', payload: [
          { selector: '.step-one', description: 'this is step one', showNext: true, },
          { selector: '.step-two', description: 'this is step two', showNext: true, },
          { selector: '.step-three', description: 'this is step three', },
        ] })
      }
    },

    {
      text: 'I want to finish my registration.',
      action: () => {
        store({ type: 'updateView', payload: [{ robot: true, text: '...'}] })
      }
    },

    {
      text: 'I need to see my bill!',
      // disabled: true,
      action: () => {
        open('https://simulator-api.db.com/gw/oidc/authorize?response_type=token&redirect_uri=http%3A%2F%2Flocalhost:3000%2F&client_id=f5a56768-3f73-494c-bc73-78a2b1f12c49&state=abc', (err, code) => {
          if (err) console.log(err)
          else console.log('SUCCESS ', code)
        })

      }
    },
  ]
})

module.exports = store