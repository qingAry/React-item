// 商品分类列表的action
import { SAVE_CATEGORY_LIST } from '@/redux/action-types'
import { reqCategoryList } from '@/api'
export const category_list = (categoryDate) => ({type:SAVE_CATEGORY_LIST,data:categoryDate})
export const category_list_async = () => {
  return async (dispatch) => {
    const result = await reqCategoryList()
    dispatch(category_list(result.data))
  }
}