// 这是容器组件 是Add的ui组件的父组件 专注与redux打交道
import {connect} from 'react-redux' //引入connect 与ui组件建立联系
import Count from '../components/Count/Count' //引入Add ui组件
import {increment,decrement,incrementAsync} from '../redux/actions/count'

//返回的是一个数据对象
// function mapStateToProps(state) {
//   return {count:state}
// }
//返回
// function mapDispatchToProps(dispatch) {
//   return {
//     increment: (value) => {dispatch(increment(value))},
//     decrement: (value) => {dispatch(decrement(value))}
//   }
// }

//connect返回的是一个函数，此返回的函数的返回值是一个组件
//connect(actions中的内容)(ui组件)
//暴露之后ui子组件会通过this.props对象
// export default connect(mapStateToProps,mapDispatchToProps)(Add)
// 简写形式
export default connect(
    state => ({count:state.count,personTotal:state.persons.length}), //返回值为对象时候，要用小括号包裹
    // {increment:increment,decrement:decrement}
    // {increment,decrement}
    // (dispatch) =>{
    //   return ({
    //     increment:(value) => {dispatch(increment(value))},
    //     decrement:(value) => {dispatch(decrement(value))},
    //     incrementAsync:(value) => {
    //       setTimeout(() => {
    //         dispatch(increment(value))
    //       }, 200);
    //     }
    //   })
    // }
    {increment,decrement,incrementAsync}
  )(Count)