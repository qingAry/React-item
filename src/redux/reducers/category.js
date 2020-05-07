import { SAVE_CATEGORY_LIST,ADD_CATEGORY } from '@/redux/action-types'//保存
const initState = []
export default function (pre = initState,action){
  const { type,data } = action
  switch (type) {
    case SAVE_CATEGORY_LIST:
    return [...data]
    case ADD_CATEGORY:
    return [data,...pre]
    default:
    return pre
  }
}