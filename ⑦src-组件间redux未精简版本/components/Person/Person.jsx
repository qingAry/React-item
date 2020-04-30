import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default class Person extends Component {
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
