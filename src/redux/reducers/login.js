import {SAVE_USER_INFO} from '../action-types'
let initState = {user:{},token:''}
export default function(pre = initState,action){
  const {type,data} = action
  switch (type) {
    case SAVE_USER_INFO://保存用户信息
    //reducer是一个纯函数，不能修改传入参数的值
    return {...data}
    default://初始状态
    return pre
  }
}