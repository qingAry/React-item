import {combineReducers} from 'redux'
import loginReducer from './login'
import menuTitleReducer from './menu_title' //保存菜单标题

//保存状态，此状态是保存用户数据
export default combineReducers(
    {
      userInfo:loginReducer,
      menuTitle:menuTitleReducer
    }
  )