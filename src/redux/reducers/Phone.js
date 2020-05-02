import {ADD_PHONE} from '../action-type'
const initState = 
    [
      {id:'001',name:'OPPO Reno3',price:2999},
      {id:'002',name:'小米10',price:3999}
    ]
export default function(pre = initState,action){
  const {type,data} = action
  if(type ===ADD_PHONE ) return [data,...pre]
  return pre
}