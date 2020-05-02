
import {connect} from 'react-redux'
// ui组件
import React, { Component } from 'react'
import {addPhone} from '../redux/actions/phone'
import { v4 as uuidv4 } from 'uuid';
/* ui组件--start */
class Phone extends Component {
  addPhone =() => {
    const {name,price} = this.refs
    if(!name.value || !price.value){
      alert('输入的内容不能为空')
      return
    }
    // 正则判断
    const regex = new RegExp('^[0-9]*$')
    const priceNum = price.value
    if(priceNum.search(regex) === -1){
      window.alert("请输入价格")
      return
    }
    
    this.props.addPhone({id:uuidv4(),name:name.value,price:price.value})
    name.value=''
    price.value=''
  }
  render() {
    // console.log(this.props,'phone')
    const {phone,count} = this.props
    return (
      <div>
        <h3>购买手机总数：{phone.length},获取的总和为：{count}</h3><br/>
        <input ref="name" type="text" placeholder="输入手机名称"/><br/>
        <input ref="price" type="text" placeholder="输入手机价格"/><br/>
        <button onClick={this.addPhone}>点击购买</button><br/>
        <ul>
          {phone.map(item => <li key={item.id}>手机名：{item.name} 价格：{item.price}</li> )}
          {/* <li>手机名：*** 价格：****</li>
          <li>手机名：*** 价格：****</li> */}
        </ul>
      </div>
    )
  }
}
/* ui组件---end */
// 容器组件
export default connect(state =>({phone:state.phone,count:state.count}),{addPhone})(Phone)