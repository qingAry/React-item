import React, { Component } from 'react'
import { Menu } from 'antd';
import menus from '@/config/left-nav'
import logo from '@/assets/images/logo.png'
import './css/leftNav.less'//引入样式

const { SubMenu,Item } = Menu;

export default class LeftNav extends Component {
  
  //展示侧边导航中菜单的展示
  setShowNav = (menus) => {
    // console.log('object')
    return (
      menus.map(menu => {
        // 判断menu有没有子菜单
        if( !menu.children ){
          return (
            <Item key={menu.key} icon={<menu.icon/>}>
                  {menu.title}
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
    return (
      <div className='left-nav'>
        <div className='nav-top'>
          <h1>
            <img src={logo} alt="logo图片"/>
            商品管理系统
          </h1>
        </div>
        <div className='nav-bottom'>
            <Menu
              defaultSelectedKeys={['1']}//默认选中
              //defaultOpenKeys={['sub1']}//是否默认展开
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
