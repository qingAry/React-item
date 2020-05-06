import React, { Component } from 'react'
import { Card, Button,Table,Modal,Form, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const { Item } = Form

export default class Category extends Component {
  
  state = { visible: false }
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
  onFinish = values => {
    console.log('Success:', values);
  }

  render() {
    // 数据来源
    const dataSource = [
      {
        key: '1', //唯一标识
        name: '胡彦斌', 
        age: 32,
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
      },
    ];
    //列设置
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        align:'center',
        width:'25%'
      }
    ];
    return (
        <div>
          <Card 
          extra={<Button type='primary' onClick={this.showModal}>
                  <PlusCircleOutlined/>添加
                </Button>}
          >
            <Table bordered dataSource={dataSource} columns={columns} />
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
            >
              <Item
                name="categoryName"
                rules={[{ required: true, message: '添加分类不能为空' }]}
              >
                <Input />
              </Item>
            </Form>
          </Modal>
        </div>
    )
  }
}
