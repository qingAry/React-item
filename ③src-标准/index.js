import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store'
import App from './App';

//初始也必须要传入
ReactDOM.render(<App/>,document.getElementById('root'));
//redux中状态发生改变的时候 才会触发页面更新
store.subscribe(() => {
  ReactDOM.render(<App />,document.getElementById('root'));
})

