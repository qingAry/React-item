import React, { Component } from 'react'
import { Card, Button,Select,Table } from 'antd'
import { PlusCircleOutlined,SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

export default class Product extends Component {
  render() {
    // 表格内容
    // 数据源
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        desc: 32,
        price:1800,
        status:true,
        actions: '',
      },
      {
        key: '2',
        name: '胡彦斌',
        desc: 32,
        price:1800,
        status:false,
        actions: '',
      }
    ];
    // 数据列表配置项
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align:'center',
        render:(status) => (
            <div>
              <Button type={status ? 'danger':'primary'}>
              {status ? '下架':'上架'}
            </Button><br/>
            <span>{status ? '在售':'已停售'}</span>
            </div>
          )
      },
      {
        title: '操作',
        dataIndex: 'action',
        align:'center',
        key: 'status',
        render:() => <div><Button type='link'>修改</Button><br/><Button type='link'>详情</Button></div>
      },
    ];
    return (
      // 卡片
      <Card 
        title={<div>
          {/* 搜索 */}
          <Select defaultValue="name">
            <Option value="name">按名称搜索</Option>
            <Option value="desc">按描述搜索</Option>
          </Select>
          <input placeholder="请输入关键词" style={{margin:'10px'}}/>
          <Button type="primary"><SearchOutlined/>搜索</Button>
          </div>} 
        extra={<Button type='primary'> 
        <PlusCircleOutlined/>
        添加商品</Button>}
      >
        {/* 表格 */}
        <Table bordered dataSource={dataSource} columns={columns} />
      </Card>
    )
  }
}
