import React from 'react'
import ReactDOM from 'react-dom'
import store from './redux/store'
import {Provider} from 'react-redux'
import App from './App'

ReactDOM.render(
  // 引入顶级组件 为容器组件提供一个store
  <Provider store={store}>
  <App/>
  </Provider>,
  document.getElementById('root'))

  // redux发生改变的时候 促进界面的变化
  store.subscribe(() => {
    ReactDOM.render(
      // 引入顶级组件 为容器组件提供一个store
      <Provider store={store}>
      <App/>
      </Provider>,
      document.getElementById('root'))
  })