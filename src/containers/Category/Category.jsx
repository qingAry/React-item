import React, { Component } from 'react'
import { Card, Button,Table,Modal,Form, Input,message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { category_list_async } from '@/redux/actions/category'
import {reqAddCategory,reqUpdataCategory} from '@/api'
const { Item } = Form

@connect(
  state => ({categoryList:state.categoryList}),//映射状态
  {category_list_async} //隐射操作状态的方法
)
// 定义组件
class Category extends Component {
  
  state = { 
    visible: false,
    categoryName:'',
    name:'',
    isUpdate:false
   }
  componentDidMount(){
    this.props.category_list_async()
  }
  // 是否显示模态框
  showModal = (categoryObj) => {
    console.log(categoryObj)
    if(this.state.isUpdate){
      this.setState({
        visible:true,
        name:categoryObj.name
      })
    }
    this.setState({
      visible: true,
    })
  }
  //确定
  handleOk = async() => {
    // console.log('ref',this.refs.formInstance)
    // console.log(this.refs.formInstance.getFieldsValue())
    const { categoryName } = this.refs.formInstance.getFieldValue()
    //添加分类请求
    const result = await reqAddCategory({categoryName})
    // console.log(result)
    const {status,msg} = result
    if(status === 0){
      this.props.category_list_async()
      this.setState({
        visible: false,
      })
    }else{
      message.error(msg,1)
    }
    
  }
  //取消
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  // 表单提交
  onFinish = async (values) => {
    console.log(values)
    this.setState({
      visible: false,
    });
  }

  render() {
    // 数据来源
    const dataSource = this.props.categoryList;
    //列设置
    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key:'1'//唯一的标识
      },
      {
        title: '操作',
        // dataIndex: 'change',
        align:'center',
        width:'25%',
        render:(categoryObj) => 
          <Button
            type="link"
            onClick={() =>{
              this.setState({isUpdate:true})
              this.showModal(categoryObj)
            }}
          >修改分类
          </Button> //高级渲染，页面重复相同的内容
      }
    ];
    return (
        <div>
          <Card 
          extra={<Button type='primary' onClick={() => {
                  this.setState({isUpdate:false})
                  this.showModal()
                }}>
                  <PlusCircleOutlined/>添加
                </Button>}
          >
            <Table bordered 
              dataSource={dataSource} 
              columns={columns}
              rowKey="_id"
              pagination={
                {
                  pageSize:5//每页显示商品数量
                }
              }
            />
          </Card>
          {/* 模态框 */}
          <Modal
            title={this.state.isUpdate?'修改分类':'新增分类'}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确定"
            cancelText="取消"
          >
            <Form
              ref="formInstance"
              onFinish={this.onFinish}
            >
              <Item
                name="categoryName"
                rules={[{ required: true, message: '添加分类不能为空' }]}
              >
                <Input placeholder="请输入分类名"/>
              </Item>
            </Form>
          </Modal>
        </div>
    )
  }
}

export default Category