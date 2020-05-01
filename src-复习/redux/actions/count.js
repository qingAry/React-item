// 存储action
import {INCREMENT,DECREMENT} from '../action-types'
//返回 action对象{type,data}
export const increment = (value) => ({type:INCREMENT,data:value})
export const decrement = (value) => ({type:DECREMENT,data:value})