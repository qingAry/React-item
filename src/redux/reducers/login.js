//引入type常量 --- login组件
import {SAVE_USER_INFO,SIGNOUT} from '../action-types'
//localStorage.getItem('USERINFO')得到的是json字符串，需要进行解析
let _userInfo
try {
  _userInfo = JSON.parse(localStorage.getItem('USERINFO'))
} catch (error) {
  //JSON.parse(undefined) 会报错
  // JSON.parse(null) === null
  _userInfo = null
}

const _token = localStorage.getItem('TOKEN')
//初始化数据 如果localStorage有用户数据，就用用户的 没有设置为空
let initState = {
    user: _userInfo || {},
    token: _token || '',
    isLogin: _userInfo &&_token ? true : false //是否登录
  }
export default function(pre = initState,action){
  const {type,data} = action
  switch (type) {
    case SAVE_USER_INFO://保存用户信息
    //reducer是一个纯函数，不能修改传入参数的值
    return { ...data , isLogin:true }//返回新数据 其中登录之后isLogin为true
    case SIGNOUT:
    return {user:{},token:'',isLogin:false}
    default://初始状态
    return pre
  }
}