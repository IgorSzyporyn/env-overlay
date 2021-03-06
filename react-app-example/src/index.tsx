import React from 'react'
import ReactDOM from 'react-dom'
import { envOverlay } from 'env-overlay'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

envOverlay(process.env.NODE_ENV, {
  corner: 'left',
  onLoaded: () => {
    console.log('Im loaded now')
  },
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
