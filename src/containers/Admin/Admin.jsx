import React, { Component } from 'react'
// import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { Layout } from 'antd';
import { Switch,Route,Redirect } from 'react-router-dom'
import Header from './Header/Header'
import LeftNav from './LeftNav/LeftNav'
import CheckLogin from '@/containers/HOC/CheckLogin'
import './css/admin.less'
import Home from '../Home/Home';
const { Footer, Sider, Content } = Layout;

//装饰器函数
//使用的是装饰器语法
@connect(
  //映射状态
  state => ({isLogin:state.userInfo.isLogin}),
  {}//隐射操作对象的方法，不用时默认是空对象
  )
@CheckLogin
class Admin extends Component {

  render() {
    //render里面不能编程式跳转 使用Redirect自动跳转到指定的路由组件
    // if(!this.props.isLogin) return <Redirect to="/login"/>
    return (
        <Layout className="admin-containter">
          <Sider className="left">
            <LeftNav/>
          </Sider>
          <Layout>
            <Header/>
            <Content>
              {/* <Switch>
                <Route path="/admin/home" component={Home}/>
                <Redirect to="/admin/home"/>
              </Switch> */}
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
    )
  }
}

//暴露返回的容器组件
export default Admin
// export default connect(
//   //映射状态
//   state => ({ 
//               isLogin:state.userInfo.isLogin}),
//   //隐射操作对象的方法，不用时默认是空对象
//   {})(Admin)
