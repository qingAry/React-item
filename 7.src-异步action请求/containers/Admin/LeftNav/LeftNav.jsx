import React, { Component } from 'react'
import { Menu } from 'antd';
import { Link,withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveMenuTitle } from '@/redux/actions/menu_title'
import menus from '@/config/left-nav'
import logo from '@/assets/images/logo.png'
import './css/leftNav.less'//引入样式

const { SubMenu,Item } = Menu;
@connect(
  () => ({}),//映射状态
  {saveMenuTitle} //隐射状态的方法
)
// 引入withRouter将组件加工，让this.props身上能有路由组件的属性
@withRouter
class LeftNav extends Component {
  
  //保存状态的方法
  saveMenuTitle = (menuTitile) => {
    // 直接传入title 刷新之后页面显示为空
   this.props.saveMenuTitle(menuTitile)
  }

  //查找刷新之后路径下的title，显示在header中
  findMenuTitle = () => {
    const {pathname} = this.props.location
    const menuKeyArr = pathname.split('/')
    let key = menuKeyArr.slice(-1)[0] //截取路径获取key
    if(key === 'admin') key = 'home' //退出重新登录，首页标题要刷新才能够有显示
    let menuTitle = ''
    menus.forEach((menu) => {
      // 判断有没有children
      if( !menu.children){
        if(menu.key === key){
          menuTitle = menu.title
          // console.log(menuTitle)
         }
      }else{
        menu['children'].forEach(children => {
           if(children.key === key) menuTitle = children.title
         } )
      }
    })
    this.props.saveMenuTitle(menuTitle)
  }
  componentDidMount = () => {
    this.findMenuTitle()
  }
  //展示侧边导航中菜单的展示
  setShowNav = (menus) => {
    // console.log('object')
    return (
      menus.map(menu => {
        // 判断menu有没有子菜单
        if( !menu.children ){
          return (
            <Item key={menu.key} onClick={() => {
              this.saveMenuTitle(menu.title)
              }}
            >
              <Link to={menu.path}>
                <menu.icon/>{menu.title}
              </Link>
            </Item>
          )
        }else{
          return (
            <SubMenu key={menu.key} icon={<menu.icon/>} title={menu.title}>
              {/* 循环调用，直到没有子菜单*/}
              { this.setShowNav(menu.children) }
            </SubMenu>
          )
        }
      })
    )
    
    /* 
    <Item key="1" icon={<PieChartOutlined />}>
                Option 1
    </Item>
    <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
      <Item key="5">Option 5</Item>
      <Item key="6">Option 6</Item>
      <Item key="7">Option 7</Item>
      <Item key="8">Option 8</Item>
    </SubMenu>
    */
  }
  
  render() {
    // console.log(this.props.location.pathname)
    const {pathname} = this.props.location
    //刷新之后保存默认选中的menu
    const menuKeyArr = pathname.split('/') //获取当前路径下的key数组
    return (
      <div className='left-nav'>
        <div className='nav-top'>
          <h1>
            <img src={logo} alt="logo图片"/>
            商品管理系统
          </h1>
        </div>
        <div className='nav-bottom'>
          {/* 直接给给一个没有处理数组 antd自动排查item中存在相关key的menu */}
            <Menu
              // defaultSelectedKeys={menuKeyArr}//默认选中,只能选中一次
              selectedKeys={menuKeyArr} //匹配最终浏览器的路径 /admin/home
              defaultOpenKeys={menuKeyArr}//是否默认展开,选中就展开,里面的key是数组
              mode="inline"//展示形式
              theme="dark"//主体颜色
            >
              {/* 展示侧边导航菜单 */}
              {this.setShowNav(menus)}
            </Menu>
        </div>
      </div>
    )
  }
}

export default LeftNav