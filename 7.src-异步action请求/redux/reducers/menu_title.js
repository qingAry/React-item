import {SAVE_MENU_TITLE} from '@/redux/action-types'
const initState = ''
export default function(pre = initState,action) {
  const {type,data} = action
  switch (type) {
    case SAVE_MENU_TITLE:
    return data
    default:
    return pre
  }
}