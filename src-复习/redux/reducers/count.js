import {INCREMENT,DECREMENT} from '../action-types'
// 暴露一个处理Count组件数据状态的reducer
let initState = 0
export default function(pre = initState,action){
  const {type,data} = action
  if(type === INCREMENT) return pre + data
  else if(type === DECREMENT) return pre - data
  else return pre
}