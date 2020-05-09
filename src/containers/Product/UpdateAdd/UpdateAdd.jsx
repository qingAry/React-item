import React, { Component } from 'react'

export default class UpdateAdd extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.match.params.id?'修改商品的组件':'添加商品的组件'}
        <button
          onClick={() => {this.props.history.goBack()}}
        >返回</button>
      </div>
    )
  }
}
