/* 
高阶组件：此组件是对跳转进行验证的
如果没有登录，不能进入admin组件
如果登录了，不能进入login组件
 */
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
//ReceiveComponent:组件最好大写
export default function(ReceiveComponent) {
  
  //从redux中读取状态
  @connect(
    state => ({isLogin:state.userInfo.isLogin}),//映射状态
    {}//映射操作状态的方法
  )
  //创建目标组件TargetComponent
  class TargetComponent extends Component{
    render(){
      const {isLogin} = this.props
      //获取地址栏中的地址
      const {pathname} = this.props.location
      // 在什么条件下，才往admin跳转，只有在登录的条件下才往admin跳转
      if( isLogin && pathname === '/login') return <Redirect to='/admin'/>
      if(!isLogin && pathname!== '/login' ) return <Redirect to='/login'/>
      //返回目标组件
      return <ReceiveComponent {...this.props}/>
    }
  }
  //返回class定义的组件不要用尖括号，因为里面的返回值就是一个组件
  return TargetComponent
}