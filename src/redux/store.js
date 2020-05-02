import {createStore,applyMiddleware} from 'redux'
import  {composeWithDevTools} from 'redux-devtools-extension'
// import countReducer from './reducers/count'
import allReducer from './reducers/index'
import thunk from 'redux-thunk'

export default createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))