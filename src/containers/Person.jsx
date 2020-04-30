/* 这是容器组件：用来和redux(store)进行联系 */
//引入ui组件
import Person from '../components/Person/Person'
// 引入connect方法 与ui组件建立联系
import {connect} from 'react-redux'
//引入改变状态的方法
import {addPerson} from '../redux/actions/person'

//暴露容器组件
export default connect(
  (state) => ({persons:state.persons,count:state.count}),
  {addPerson})(Person)