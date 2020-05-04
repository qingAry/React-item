import {combineReducers} from 'redux'
import loginReducer from './login'

//保存状态，此状态是保存用户数据
export default combineReducers({userInfo:loginReducer})