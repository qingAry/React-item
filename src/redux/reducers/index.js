import {combineReducers} from 'redux'
import countReducer from './count'
import phoneReducer from './phone'

//暴露state
export default combineReducers({count:countReducer,phone:phoneReducer})