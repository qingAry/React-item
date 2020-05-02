import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api/index'
import logo from './images/logo.png'
import './css/login.less'

const {Item} = Form

export default class Login extends Component {

  onFinish = async (values) => {
    // console.log('Received values of form: ', values);
    // 发送请求
    //携带的参数位urlencoded
    let result = await reqLogin(values)
    console.log('result.data',result.data)
  }
  /*
用户名/密码的的合法性要求
  1). 必须输入
  2). 必须大于4位
  3). 必须小于12位
  4). 必须是英文、数组或下划线组成
 */
  checkout = (_, value) =>{
    console.log(value)
    let errMsg = []
    if(!value || !value.trim()) return Promise.reject("输入密码不能为空")
    if(value.length<4 || value.length>12) errMsg.push("密码4~12位")
    if(!(/^\w+$/).test(value)) errMsg.push("字母数字下划线组成")
    if(errMsg.length !== 0) return Promise.reject(errMsg)
    else{ return Promise.resolve() }
  }

  render() {
    return (
      <div id="wrap">
        <header>
           <img src={logo} alt="商品管理系统logo"/>
           <h1>商品管理系统</h1>
        </header>
        <div className="container">
          <p>用户登录</p>
          <Form onFinish={this.onFinish}>
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
