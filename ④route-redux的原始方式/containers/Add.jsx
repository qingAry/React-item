// 这是容器组件 是Add的ui组件的父组件 专注与redux打交道
import {connect} from 'react-redux' //引入connect 与ui组件建立联系
import Add from '../components/Add/Add' //引入Add ui组件
import {increment,decrement} from '../redux/actions/count'

//返回的是一个数据对象
function mapStateToProps(state) {
  return {count:state}
}
//返回
function mapDispatchToProps(dispatch) {
  return {
    increment: (value) => {dispatch(increment(value))},
    decrement: (value) => {dispatch(decrement(value))}
  }
}

//connect返回的是一个函数，此返回的函数的返回值是一个组件
//connect(state初始状态,actions中的内容)(ui组件)
//暴露之后ui子组件会通过this.props获取状态和方法
//同时入口文件通过provider，提供一个store,给容器组件使用
export default connect(mapStateToProps,mapDispatchToProps)(Add)