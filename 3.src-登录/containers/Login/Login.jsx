import React, { Component } from 'react'//引入react核心库
import { Form, Input, Button, message } from 'antd';//引入antd组件
import { UserOutlined, LockOutlined } from '@ant-design/icons';//引入antd中的组件
import {connect} from 'react-redux' //引入connect 和ui组件建立联系
import {saveUserInfo} from '@/redux/actions/login'//引入action函数
import {reqLogin} from '@/api/index'//引入请求登录函数
import logo from './images/logo.png'//引入图片
import './css/login.less'//引入样式
import { Redirect } from 'react-router-dom';

const {Item} = Form //从Form中解构Item组件

class Login extends Component {

  onFinish = async (values) => {
    // 发送请求
    let result = await reqLogin(values)
    //console.log('result.data',result.data)
    const {status,data,msg} = result
    if(status === 0){//登录成功
      console.log('result',data)
      message.success('登录成功',1)//停留时间：1s
      //保存用户信息
      this.props.saveUserInfo(data)
      //登录成功，跳转到admin路由组件
      this.props.history.push('/admin')
    }else{
      message.error(msg,1)
    }
    
  }
  /*
用户名/密码的的合法性要求
  1). 必须输入
  2). 必须大于4位
  3). 必须小于12位
  4). 必须是英文、数组或下划线组成
 */
  checkout = (_, value) =>{
    //自定义校验
    // console.log(value)
    let errMsg = []
    if(!value || !value.trim()) return Promise.reject("输入密码不能为空")
    if(value.length<4 || value.length>12) errMsg.push("密码4~12位")
    if(!(/^\w+$/).test(value)) errMsg.push("字母数字下划线组成")
    if(errMsg.length !== 0) return Promise.reject(errMsg)
    else{ return Promise.resolve() }
  }

  render() {
    console.log('this.props',this.props)
    if(this.props.isLogin) return <Redirect to="/admin"/>
    return (
      <div id="wrap">
        <header>
           <img src={logo} alt="商品管理系统logo"/>
           <h1>商品管理系统</h1>
        </header>
        <div className="container">
          <p>用户登录</p>
          <Form onFinish={this.onFinish}>
            {/* 声明式校验 */}
            <Item name="username" rules={[{
              required:true,
              message:'输入的内容不能为空'
            },{
              min:4,
              max:12,
              message:'请输入4~12位的用户名'
            },{
              pattern:/^\w+$/,
              message:'用户名是由数字、字母、下划线组成'
            }]}>
              <Input prefix={<UserOutlined/>} placeholder="请输入用户名" />
            </Item>
            <Item name="password" rules={[{
              validator:this.checkout
            }]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
              />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    )
  }
}

//暴露容器组件
export default connect(
  (state) =>({isLogin:state.userInfo.isLogin}),
{saveUserInfo})(Login)