import { ADD_PERSON } from "../action-types";

//暴露一个有关person组件的reducer
export function personReducer(
  pre = [
    {id:'001',name:'haha',age:18},
    {id:'002',name:'huahua',age:23}
  ],action) {
    const {type,data} = action
    switch (type) {
      case ADD_PERSON:
      return [data,...pre]
      default:
      return pre
    }
}
