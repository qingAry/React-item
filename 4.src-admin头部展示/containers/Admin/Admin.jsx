import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { Layout } from 'antd';
import Header from './Header/Header'
import './css/admin.less'
const { Footer, Sider, Content } = Layout;

class Admin extends Component {

  render() {
    //render里面不能编程式跳转 使用Redirect自动跳转到指定的路由组件
    if(!this.props.isLogin) return <Redirect to="/login"/>
    return (
        <Layout className="admin-containter">
          <Sider className="left">Sider</Sider>
          <Layout>
            <Header/>
            <Content>Content</Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
    )
  }
}

export default connect(
  //映射状态
  state => ({ 
              isLogin:state.userInfo.isLogin}),
  //隐射操作对象的方法，不用时默认是空对象
  {})(Admin)
