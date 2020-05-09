import React, { Component } from 'react'
import { Card, Button,Table,Modal,Form, Input,message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { category_list_async } from '@/redux/actions/category'
import { reqAddCategory,reqUpdataCategory } from '@/api'
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
    //isUpdate:false
   }
  componentDidMount(){
    this.props.category_list_async()
  }
  // 是否显示模态框
  showModal = (categoryObj) => {
    // 取到Form组件
    const { formInstance } = this.refs
    // 判断修改分类
    if(this.isUpdate){
      console.log(categoryObj)
      const {name,_id} = categoryObj
      // console.log(name,_id)
      if( name && _id ){
        // 直接给实例添加属性
        this.name = name 
        this._id = _id
      }  
    }
    // 重置表单：非第一次，第一次是由initialValues控制
    if(formInstance) formInstance.setFieldsValue({cname:this.name})
    //Modle显示
    this.setState({
      visible: true
    })
  }
  //确定
  handleOk = async() => {
    // console.log('ref',this.refs.formInstance)
    // console.log(this.refs.formInstance.getFieldsValue())
    const { formInstance } = this.refs
    // 获取当前输入框中的value值
    const {cname} = formInstance.getFieldsValue()
    console.log(cname)
    // console.log('formInstance.getFieldsValue()',formInstance.getFieldsValue())
    let result = ''
    if(cname || cname.trim()){
      if(!this.isUpdate){
        console.log(this.refs.formInstance.getFieldValue())
        const { cname } = this.refs.formInstance.getFieldValue()
        //添加分类请求
        result = await reqAddCategory({categoryName:cname})
      }else{
        console.log(cname)
        result = await reqUpdataCategory(this._id,cname)
      }
      
      const {status,msg} = result
      if(status === 0){
        // 如果请求成功
        message.success(this.isUpdate ? '更新成功':'修改成功')
        this.props.category_list_async()
        this.setState({
          visible: false,
        })
        // 重置表单？？？？？？
        formInstance.resetFields()
      }else{
        message.error(msg,1)
      }
    }else{
      message.error('输入的内容不能为空',1)
    }
    
    
  }
  //取消
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  // 表单提交
  onFinish = async () => {
    // console.log(values)
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
              this.isUpdate = true
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
                  /* 重置name,重置id */
                  this.name = ''
                  this._id = ''
                  this.isUpdate = false
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
            title={this.isUpdate ?'修改分类':'新增分类'}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确定"
            cancelText="取消"
          >
            <Form
              ref="formInstance"
              onFinish={this.onFinish}
              initialValues = {{cname:this.name}}
            >
              <Item
                name="cname"
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