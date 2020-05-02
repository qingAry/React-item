import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import ajax from '../../api/ajax'
import {reqLogin} from '@/api'
import logo from './images/logo.png'
import './css/login.less'

const {Item} = Form

export default class Login extends Component {
  // 登录成功的回调
  onFinish = async values => {
    // console.log('values');
    // 3000找不到 去找4000
    //`username=${values.username}&password=${values.password}`
    // ajax.post("/login",values).then(
    //   response => {console.log('response','成功了',response)},
    //   error =>{console.log('失败了',error)}
    // )
      
      let result = await reqLogin(values)
      console.log('result.data',result.data)
    
  }
  //自定义验证
  pswCheck =(_, value="") =>{
    // console.log(value)
    const pswString = []//为了能够同时判断多个条件
    if(!value.trim()||!value) return Promise.reject('密码不能为空')
    if( value.length<4 || value.length>12 ) pswString.push('密码长度为4~12位')
    if(!(/^\w+$/).test(value)) pswString.push('密码必须是英文、数组或下划线组成')
    if(pswString.length>0) return Promise.reject(pswString)
    else return Promise.resolve()//必须要返回，不然控制台会报错
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
            <Item 
              name="username" 
              rules={[
                {required: true,message: '用户名不能为空'},
                {min:4,message: '用户名至少4位'},
                {max:12,message:'用户名必须小于等于12位'},
                {pattern:/^\w+$/,message:'必须是英文、数字或下划线组成'}
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
            </Item>
            <Item
              name="password"
              rules={[{
                validator:this.pswCheck
              }]}
            >
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
