import React, { Component } from 'react'
import {Route,Redirect,Switch} from 'react-router-dom'
import Login from './containers/Login/Login'
import Admin from './containers/Admin/Admin'

export default class App extends Component {
  render() {
    return (
        // 匹配到目标 就不再往下述查找
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/admin" component={Admin}/>
          <Redirect to="/login"/>
        </Switch>
    )
  }
}


console.dir({})