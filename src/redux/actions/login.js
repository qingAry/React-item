//引入type常量
import {SAVE_USER_INFO} from '@/redux/action-types'
//暴露action常量并暴露 --- login组件
export const saveUserInfo = userObj => ({type:SAVE_USER_INFO,data:userObj})