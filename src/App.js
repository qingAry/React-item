import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Login from './components/Login/Login'
import Admin from './components/Admin/Admin'

export default class App extends Component {
  render() {
    return (
      <div>
        <h3>这是三级标题</h3>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/admin" component={Admin}/>
          <Redirect to='/login'/>
        </Switch>
      </div>
    )
  }
}
