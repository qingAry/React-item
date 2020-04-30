/* 这是容器组件：用来和redux(store)进行联系 */
//引入ui组件
// import Person from '../components/Person/Person'
// 引入connect方法 与ui组件建立联系
import {connect} from 'react-redux'
//引入改变状态的方法
import {addPerson} from '../redux/actions/person'

// ui组件的引入的核心文件
import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';

//ui组件
class Person extends Component {
  // 点击添加
  addPerson = () =>{
    // 获取输入的值
    const {name,age} = this.refs
    if(!name.value || !age.value){
      alert('输入的内容不能为空')
      return
    }
    let personObj = {id:uuidv4(),name:name.value,age:age.value}
    this.props.addPerson(personObj)
    name.value = ''
    age.value = ''
  }
  render() {
    // console.log('this.props',this.props)
    const {persons,count} = this.props
    return (
      <div>
        <p>总人数为：{persons.length}</p>
        <p>获取的总和为：{count}</p>
        <input ref="name" type="text" placeholder="请输入名字"/>&nbsp;
        <input ref="age" type="text" placeholder="年龄"/>&nbsp;
        <button onClick={this.addPerson}>点击添加</button>
        <ul>
          {persons.map((person) => <li key={person.id}>名字：{person.name} 年龄：{person.age}</li>)}
        </ul>
      </div>
    )
  }
}
//暴露容器组件
export default connect(
  (state) => ({persons:state.persons,count:state.count}),
  {addPerson})(Person)