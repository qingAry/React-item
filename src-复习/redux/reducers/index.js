import {combineReducers} from 'redux'
import countReducer from './count'
import phoneReducer from './Phone'

//暴露state状态对象
export default combineReducers({count:countReducer,phone:phoneReducer})