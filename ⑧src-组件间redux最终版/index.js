import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux/store'
import App from './App';

//初始也必须要传入
ReactDOM.render(
  // 为容器组件提供一个store
  <Provider store={store}>
  <App/>,
  </Provider>,
  document.getElementById('root'));
//数据发生改变的时候 驱动页面的显示
store.subscribe(() => {
  ReactDOM.render(
    <Provider store={store}>
    <App/>,
    </Provider>,
    document.getElementById('root'));
})


