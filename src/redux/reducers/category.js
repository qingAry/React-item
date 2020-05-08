import { SAVE_CATEGORY_LIST } from '@/redux/action-types'//保存
const initState = []
export default function (pre = initState,action){
  const { type,data } = action
  switch (type) {
    case SAVE_CATEGORY_LIST:
    return [...data].reverse()
    default:
    return pre
  }
}