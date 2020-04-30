import {createStore,applyMiddleware} from 'redux'//引入redux中的create方法（里面是分别暴露）
// import {changeState} from './reducers/count'//引入reducer方法
// import {personReducer} from './reducers/person'
import allReducers from './reducers/index'
import thunk from 'redux-thunk'

export default createStore(allReducers,applyMiddleware(thunk))