import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from './images/logo.png'
import './css/login.less'

const {Item} = Form

export default class Login extends Component {
  // 登录成功的回调
  onFinish = values => {
    console.log('Received values of form: ', values);
  }
  render() {
    return (
      <div className="LoginContainer">
        <header>
          <img src={logo}  alt="网站logo"/>
          <h1>商品管理系统</h1>
        </header>
        <section>
          <p>用户登录</p>
          <Form
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Item>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
            </Item>
            <Item>
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
        </section>
      </div>
    )
  }
}
