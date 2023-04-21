import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import '@coreui/coreui/dist/css/coreui.min.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import store from './redux/store'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)
