import React, { Component } from 'react'
import { Card,Button,Form, Input,Select } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { category_list_async } from '@/redux/actions/category'
import PictureWall from './PictureWall/PictureWall'

const { Item } = Form
const { Option } = Select
// 修饰器语法
@connect(
  state => ({categoryList:state.categoryList}),
  {category_list_async}
)
// 注册UpdateAdd组件
 class UpdateAdd extends Component {
  //dom元素挂载完成，判断商品列表的长度是否为0，若是0,重新action异步发送请求
   componentDidMount(){
    const {categoryList,category_list_async} = this.props
    if(categoryList.length === 0){
      category_list_async()
    }
   }
  render() {
    // console.log(this.props.categoryList)
    return (
      // card卡片
      <Card title={
        <div>
        <Button 
          type='link' 
          onClick={() => {this.props.history.goBack()}}
        >
          <ArrowLeftOutlined/>
        </Button>
        <span>添加商品</span>
        </div>
        }
      >
        {/* initialValues初始化form中输入内容的默认值 */}
        <Form initialValues={{categoryId:'choose'}}>
          <Item 
            name="name"
            label="商品名称：" //Item中不能有原生中的语法，如果设置文本，需要使用label
            wrapperCol={{span:6}} //这只input占的分数，一共有24份
            // 输入框的实时校验规则，与name要搭配使用
            rules={[{ required: true, message: '输入的内容不能为空' }]}
          >
            <Input placeholder="请输入商品名称"/>
          </Item>
          <Item 
            name="desc"
            label="商品描述："
            wrapperCol={{span:6}}
            rules={[{ required: true, message: '输入的内容不能为空' }]}
          >
            <Input placeholder="请输入商品名称"/>
          </Item>
          <Item 
            name="price"
            label="商品价格："
            wrapperCol={{span:6}}
            rules={[{ required: true, message: '输入的内容不能为空' }]}
          >
            <Input 
              type="number" //对input类型设置，数字能加/减的符号出现
              placeholder="请输入商品名称"
              addonAfter="元" //后面内容
              prefix="￥"//前面内容
            />
          </Item>
          <Item 
            name="categoryId"
            label="商品分类："
            wrapperCol={{span:6}}
            rules={[{ required: true, message: '输入的内容不能为空' }]}
          >
            <Select>
              <Option value="choose">请选择分类</Option>
              {this.props.categoryList.map(listObj =><Option key={listObj._id} value={listObj._id}>{listObj.name}</Option>)}
            </Select>
          </Item>
          <Item 
            name="imgs"
            label="商品图片："
            wrapperCol={{span:6}}
          >
            {/* upload上传照片墙组件 */}
            <PictureWall/>
          </Item>
          <Item 
            name="detail"
            label="商品详情："
            wrapperCol={{span:6}}
          >
            <input type="text"/>
          </Item>
        </Form>
      </Card>
    )
  }
}
export default UpdateAdd