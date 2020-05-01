// import Phone from '../components/Phone/Phone'
import {connect} from 'react-redux'
import {addPhone} from '../redux/actions/Phone'
/* ui组件开始 */
import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'

class Phone extends Component {
  addPhone = () => {
    const {name,price} = this.refs
    if(!name.value || !price.value) {
      alert("输入内容不能为空")
      return
    }
    this.props.addPhone({id:uuidv4(),name:name.value,price:price.value})
    name.value = ''
    price.value = ''
  }
  render() {
    // console.log(this.props.phone)
    const {phone,count} = this.props
    return (
      <div>
        <h3>购买手机总数：{phone.length},获取的总和为：{count}</h3>
        <input ref="name" type="text" placeholder="请输入手机名称"/> <br/><br/>
        <input ref="price" type="text" placeholder="请输入价格"/><br/><br/>
        <button onClick={this.addPhone}>点击购买</button>
        <ul>
          {phone.map(item => <li key={item.id}>手机名：{item.name} 价格：{item.price}</li>)}
        </ul>
      </div>
    )
  }
}
/* ui组件结束 */
export default connect((state) => ({phone:state.phone,count:state.count}),{addPhone})(Phone)