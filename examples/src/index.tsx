import { envOverlay } from 'env-overlay'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

envOverlay((process && process.env && process.env.NODE_ENV) || '')

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
registerServiceWorker()
