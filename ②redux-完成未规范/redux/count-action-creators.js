// 创建actions-creators里面包含两个函数 
//返回一个包含type，data的对象 分别暴露
import {INCREMENT,DECREMENT} from './action-types'
export const increment =(value) => ({type:INCREMENT,data:value})
export const decrement =(value) => ({type:DECREMENT,data:value})