import { SAVE_CATEGORY_LIST } from '@/redux/action-types'
const initState = []
export default function (pre = initState,action){
  const { type,data } = action
  switch (type) {
    case SAVE_CATEGORY_LIST:
    return [...data]
    default:
    return pre
  }
}