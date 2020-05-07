import React, { Component } from 'react'
import { Card, Button,Table,Modal,Form, Input,message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { category_list_async,add_category } from '@/redux/actions/category'
import { reqAddCategory } from '@/api'
const { Item } = Form

@connect(
  state => ({categoryList:state.categoryList}),//映射状态
  {category_list_async,add_category} //隐射操作状态的方法
)
// 定义组件
class Category extends Component {
  
  state = { 
    visible: false,
    categoryName:''
   }
  componentDidMount(){
    this.props.category_list_async()
  }
  // 是否显示模态框
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  //确定
  handleOk = () => {
    this.setState({
      visible: false,
    })
  }
  //取消
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  // 表单提交
  onFinish = async (values) => {
    // 添加商品分类请求
    const result = await reqAddCategory(values)
    // 请求成功
    if(result.status === 0){
      // const {name} = result.data
      // console.log('reqAddCategory',result.data.name)
      this.props.add_category({name:result.data.name,_id:uuidv4()})
    }else{
      // 请求失败
      message.error(result.msg,1)
    }
    this.setState({
      visible: false,
    });
  }
  //输入框发生改变
  changeName = (event) => {
    const {value} = event.target
    // console.log('changeName',value)
    this.setState({
      categoryName:value
    })
  }

  render() {
    // 数据来源
    const dataSource = this.props.categoryList;
    //列设置
    const columns = [
      {
        title: '分类名',
        dataIndex: 'name'
      },
      {
        title: '操作',
        dataIndex: 'change',
        align:'center',
        width:'25%',
        render:() => <Button type="link">修改分类</Button> //高级渲染，页面重复相同的内容
      }
    ];
    return (
        <div>
          <Card 
          extra={<Button type='primary' onClick={this.showModal}>
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
            title="新增分类"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确定"
            cancelText="取消"
          >
            <Form
              name="category"
              onFinish={this.onFinish}
              rules = {
                [
                  { required:true,message:'输入内容不能为空'}
                ]
              }
            >
              <Item
                name="categoryName"
                rules={[{ required: true, message: '添加分类不能为空' }]}
              >
                <Input onChange={this.changeName}/>
              </Item>
            </Form>
          </Modal>
        </div>
    )
  }
}

export default Category