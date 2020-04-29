import {createStore} from 'redux'//引入redux中的create方法（里面是分别暴露）
import {changeState} from './count-reducers'//引入reducer方法

export default createStore(changeState)