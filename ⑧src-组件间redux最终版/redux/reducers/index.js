// 存放所有reducer
import {changeState} from '../reducers/count'//引入reducer方法
import {personReducer} from '../reducers/person'
import {combineReducers} from 'redux'
//暴露状态state
export default combineReducers({count:changeState,persons:personReducer})