import React, { Component } from 'react'
import { Card, Button,List, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { category_list_async } from '@/redux/actions/category'
import { reqProductInfo } from '@/api'//请求商品详情信息
import { IMGE_BASE_URL } from '@/config/type'
import './css/detail.less'
const { Item } = List

@connect(
  state => ({categoryList:state.categoryList}),//映射状态
  { category_list_async } //映射操作状态的方法
)
 class Detail extends Component {
  state = {
    reqProductInfo:{imgs:[]}
  }
  //请求商品详情
   getProductInfo = async(id) => {
      const result = await reqProductInfo(id)
      // console.log(result)
      const {status,data,msg} = result
      if(status === 0){
        // 请求成功
        this.setState({reqProductInfo:data})
      }else{
        // 请求失败
        message.error(msg,1)
      }
   }
  // 商品挂载完成
  componentDidMount(){
    const {id} = this.props.match.params
    const {categoryList,category_list_async} = this.props
    // console.log(this.props)
    this.getProductInfo(id)
    // 判断商品数据信息
    if(categoryList.length === 0){
      // 如果数据为空，重新发送请求
      category_list_async()
    }
  }
  // 查找商品分类
  checkCategory = (id) => {
    let currentCategoryObj = this.props.categoryList.find(listObj => listObj._id === id )
    if(currentCategoryObj) return currentCategoryObj.name
  }
  render() {
    const { name,desc,price,categoryId,imgs,detail} = this.state.reqProductInfo
    return (
      <Card title={
            <div>
              <Button type="link" onClick={() => this.props.history.goBack()}><ArrowLeftOutlined /></Button>
              <span>商品详情</span>
            </div>}>
              {/* 列表,用于展示商品详情 */}
            <List>
              <Item className='product-wraper'>
                <span className='product-description'>商品名称:</span>
                <span>{name}</span>
              </Item>
              <Item className='product-wraper'>
                <span className='product-description'>商品描述:</span>
                <span>{desc}</span>
              </Item>
              <Item className='product-wraper'>
                <span className='product-description'>商品价格:</span>
                <span>{'￥'+price}</span>
              </Item>
              <Item className='product-wraper'>
                <span className='product-description'>所属分类:</span>
                <span>{this.checkCategory(categoryId)}</span>
              </Item>
              <Item className='product-wraper'>
                <span className='product-description'>商品图片:</span>
                {imgs.map(imgName => <img  key={imgName} src={`${IMGE_BASE_URL}/${imgName}`} alt="商品图片"/>)}
              </Item>
              <Item className='product-wraper'>
                <span className='product-description'>商品详情:</span>
                {/* 过滤掉script语法以及恶意的弹窗,转化浏览器能识别html语言 */}
                <span dangerouslySetInnerHTML={{__html:detail}}/>
              </Item>
            </List>
      </Card>
    )
  }
}
export default Detail