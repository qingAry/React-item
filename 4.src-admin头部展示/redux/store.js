//引入redux中的createStore创建仓库 applyMiddleware中间件
import { createStore,applyMiddleware } from 'redux'
//引入thunk用于action中的异步处理
import thunk from 'redux-thunk'
//引入composeWithDevTools用于redux的调试
import {composeWithDevTools} from 'redux-devtools-extension'
//引入所有的reducer
import allReducer from './reducers'

//创建store并暴露
export default createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))