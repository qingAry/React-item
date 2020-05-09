import React, { Component } from 'react'
// import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { Layout } from 'antd';
import { Switch,Route,Redirect } from 'react-router-dom'
import Header from './Header/Header'
import LeftNav from './LeftNav/LeftNav'
import CheckLogin from '@/containers/HOC/CheckLogin'
import './css/admin.less'
// 引入菜单的组件
import Home from '../Home/Home';
import Category from '../Category/Category';
import Bar from '../Bar/Bar'
import User from '../User/User'
import Role from '../Role/Role';
import Line from '../Line/Line';
import Pie from '../Pie/Pie';
import Product from '../Product/Product';
import Detail from '../Product/Detail/Detail'
import UpdateAdd from '../Product/UpdateAdd/UpdateAdd'
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
            <Content className="admin-content">
              {/* 注册路由 */}
              <Switch>
                <Route path="/admin/home" component={Home}/>
                <Route path="/admin/prod_about/category" component={Category}/>
                <Route path="/admin/prod_about/product" exact component={Product}/>
                <Route path="/admin/user" component={User}/>
                <Route path="/admin/role" component={Role}/>
                <Route path="/admin/charts/bar" component={Bar}/>
                <Route path="/admin/charts/line" component={Line}/>
                <Route path="/admin/charts/pie" component={Pie}/>
                <Route path="/admin/prod_about/product/detail/:id" component={Detail}/>
                <Route path="/admin/prod_about/product/add" component={UpdateAdd}/>
                <Route path="/admin/prod_about/product/updata/:id" component={UpdateAdd}/>
                <Redirect to="/admin/home"/>
              </Switch>
            </Content>
            <Footer className="footer">
              推荐使用谷歌浏览器，使用效果更佳
            </Footer>
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
