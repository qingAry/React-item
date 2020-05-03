import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './App'

//由BrowserRouter包裹 路由页面才能显示
ReactDOM.render(<BrowserRouter><App/></BrowserRouter>,document.getElementById('root'))