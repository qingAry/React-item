import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import store from './redux/store'
import {Provider} from 'react-redux'
import App from './App'

//由BrowserRouter包裹 路由页面才能显示
ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
  <App/>
  </BrowserRouter>
  </Provider>,document.getElementById('root'))