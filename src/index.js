import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './app'
import store from './store'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'

import * as serviceWorker from './serviceWorker'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
