var yo = require('yo-yo')

function App() {
  return yo`
    <div>
      hallo
    </div>
  `
}

document.body.appendChild(new App())
