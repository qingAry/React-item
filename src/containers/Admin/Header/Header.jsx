import React, { Component } from 'react'
import { Modal, Button } from 'antd';
//引入connect,父容器与ui容器之间的桥梁
import {connect} from 'react-redux'
//引入signOut,退出登录的action
import {signOut} from '@/redux/actions/login'
//引入screenfull，是否全屏展示
import screenfull from 'screenfull'
// 引入图标
import {FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
//引入样式
import './css/header.less'
//modal弹出确认框
const { confirm } = Modal;
class Header extends Component {
  // 数据状态
  state = {
    isFull:false
  }
  // 登出
  signOut = () => {
    // 退出登录，清除localStorage以及用户信息
    // this.props.signOut()
    confirm({
      title: '你确认要退出登录吗？',
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      cancelText:'取消',
      okText:'确定',
      onOk:() => {
        // 对象方法中箭头函数，指向组件实例
        // 退出登录，清除localStorage以及用户信息
        this.props.signOut()
      }
    });

  }
  // 是否全屏
  setScreenFull = () => {
    if (screenfull.isEnabled) {
      // screenfull.request();
      screenfull.toggle()
      let { isFull } = this.state
      this.setState({
        isFull: !isFull
      })
    }
  }

  render() {
    return (
      <div className="header">
        <div className="header-top">
          <Button size="small" onClick={this.setScreenFull}>
            {/* 放大缩小图标 展示的判断*/}
            {this.state.isFull ? <FullscreenExitOutlined />:<FullscreenOutlined /> }
            {/* <FullscreenExitOutlined /> */}
          </Button>
          <span className="userName">欢迎，{this.props.username}</span>
          <Button type="link" onClick={this.signOut}>退出登录</Button>
        </div>
        <div className="header-bottom">
          <div className="bottom-left">
            <h3>首页</h3>
          </div>
          <div className="bottom-right">
            <p>2020年05月04日</p>
          </div>
        </div>
      </div>
    )
  }

}
export default connect(
  state => ({
   username:state.userInfo.user.username
  }),
  {signOut}
)(Header)
