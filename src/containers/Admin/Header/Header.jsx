import React, { Component } from 'react'
import { Modal, Button } from 'antd';
//引入connect,父容器与ui容器之间的桥梁
import {connect} from 'react-redux'
//引入signOut,退出登录的action
import {signOut} from '@/redux/actions/login'
//引入screenfull，是否全屏展示
import screenfull from 'screenfull'
//格式化时间
import dayjs from 'dayjs'
// 引入图标
import {FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
// 引入天气请求函数
import {reqWeather} from '@/api'
//引入样式
import './css/header.less'
//modal弹出确认框
const { confirm } = Modal;
class Header extends Component {
  // 数据状态
  state = {
    isFull:false,
    // 循环有变化，组件内部使用，就放在state状态中
    time:dayjs().format('YYYY年 MM月DD日 HH:mm:ss'),
    //天气数据
    weatherObj:{}
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
    }
  }
  //天气请求
  getWeather = async() => {
    //请求
    let result = await reqWeather()
    // console.log(result)
    const {dayPictureUrl,weather,temperature} = result
    // 设置状态
    this.setState({
      weatherObj:{dayPictureUrl,weather,temperature}
    })
  }
  // 检测屏幕的改变
  componentDidMount(){
    //组件挂载完成之后，就开始监视
    // console.log('componentDidMount()')
    //这是绑定的事件监听 只要触发就会发生改变
    //一般函数只会执行一次 像发送请求
    screenfull.onchange(() => {
      // console.log('...............')
      let { isFull } = this.state
      this.setState({
        isFull: !isFull
      })
    })
    //更新日期时间
    this.timer = setInterval(() => {
      this.setState({
        time:dayjs().format('YYYY年 MM月DD日 HH:mm:ss')
      })
    }, 1000);
    //请求天气数据
    // this.getWeather()
  }
  // 组件即将卸载,清除定时器，防止退出登录报错
  componentWillUnmount(){
    clearInterval(this.timer)
  }

  render() {
    const {username,menuTitle} = this.props //父容器获取用户名
    const {isFull,time,weatherObj} = this.state
    // console.log(this.state.weatherObj)
    //获取天气信息dayPictureUrl
    const {weather,temperature} = weatherObj
    return (
      <div className="header">
        <div className="header-top">
          <Button size="small" onClick={this.setScreenFull}>
            {/* 放大缩小图标 展示的判断*/}
            {isFull ? <FullscreenExitOutlined />:<FullscreenOutlined /> }
            {/* <FullscreenExitOutlined /> */}
          </Button>
          <span className="userName">欢迎，{username}</span>
          <Button type="link" onClick={this.signOut}>退出登录</Button>
        </div>
        <div className="header-bottom">
          <div className="bottom-left">
            <h3>{menuTitle}</h3>
          </div>
          <div className="bottom-right">
            <span>{time}</span>
            {/* <img src={dayPictureUrl} alt="图片"/> */}
            {/* https://pics.images.ac.cn/image/5eb23b912d043.html */}
            {/* 利用图床得到远程的图片 */}
            <img src="https://pics.images.ac.cn/image/5eb23b912d043.html" alt="图片"/>
            <span>{weather}</span>
            <span>{temperature}</span>
          </div>
        </div>
      </div>
    )
  }

}
export default connect(
  state => ({
   username:state.userInfo.user.username,
   menuTitle:state.menuTitle
  }),
  {signOut}
)(Header)
