import {INCREMENT,DECREMENT} from '../action-type'
export default function(pre = 0,action){
  const {type,data} = action
  if(type === INCREMENT) return pre + data
  if(type === DECREMENT) return pre - data
  return pre
}