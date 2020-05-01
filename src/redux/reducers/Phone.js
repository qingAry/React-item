import {ADD_PHONE} from '../action-types'
export default function
(pre = [
    {id:'001',name:'iPhone11',price:5999},
    {id:'002',name:'HUAWEI P40 Pro',price:6488}
  ],
  action){
  const {type,data} = action
  if(type === ADD_PHONE) return [data,...pre]
  return pre
}
