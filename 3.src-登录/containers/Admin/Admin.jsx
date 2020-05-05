import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from '@/redux/actions/login'

class Admin extends Component {
  signOut = () => {
    //退出登录 清空localStorage与用户的登录信息
    this.props.signOut()
  }
  render() {
    //render里面不能编程式跳转 使用Redirect自动跳转到指定的路由组件
    if(!this.props.isLogin) return <Redirect to="/login"/>
    return (
      <div>
        欢迎{this.props.username}登录    
        <button onClick={this.signOut}>退出登录</button>
      </div>
    )
  }
}

export default connect(
  //映射状态
  state => ({ username:state.userInfo.user.username,
              isLogin:state.userInfo.isLogin}),
  //隐射操作对象的方法，不用时默认是空对象
  {signOut})(Admin)
