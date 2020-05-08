import React, { Component } from 'react'
import { Card, Button,Select,Table, message,Input } from 'antd'
import { PlusCircleOutlined,SearchOutlined } from '@ant-design/icons';
import { reqProduct,reqSearch } from '@/api'
import { PAGESIZE } from '@/config/type'

const { Option } = Select;

export default class Product extends Component {
  
  state = {
    productList:[], //商品列表
    total:0,//总的数据
    pageNum:0,
    searchName:'name',
    searchType:'productName'
    
  }
  // 搜索请求
  // search = async() => {
  //   const {pageNum} = this.state
  //   const result = await reqSearch(this.searchType,this.searchName,pageNum,PAGESIZE)
  //   console.log(result)
  // }
  // 商品列表请求
  getProduct= async(currentPage = 1) => {
    let result
    // 判断当前是否是搜索状态
    if(this.isSearch){
      const {searchType,searchName} = this.state
      // console.log(searchType,searchName)
      result = await reqSearch(searchType,searchName,currentPage,PAGESIZE)
      console.log(result)
    }else{
      result = await reqProduct(currentPage,PAGESIZE)
    }
    const {status,data,msg} = result
    // 判断发送请求是否成功
    if(status === 0){
      const {total,pageNum,list} = data
      this.setState({productList:list,total,pageNum})
    }else{
      message.error(msg,1)
    }
  }
  //dom挂载完成
  componentDidMount(){
    this.getProduct() //请求商品列表
  }
  render() {
    // 表格内容
    // 数据源
    const dataSource = this.state.productList;
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
              <Button type={status === 1 ? 'danger':'primary'}>
              {status === 1 ? '下架':'上架'}
            </Button><br/>
            <span>{status === 1 ? '在售':'已停售'}</span>
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
        title={
          <div>
          {/* 搜索 */}
          <Select defaultValue="productName" onChange={(value) => this.setState({
            searchType:value
          })}>
            <Option value="productName">按名称搜索</Option>
            <Option value="productDesc">按描述搜索</Option>
          </Select>
          <Input
            allowClear
            placeholder="请输入关键词"
            style={{margin:'10px',width:'25%'}}
            onChange = {(event) => {
              const {value} = event.target
              // console.log(value)
              this.setState({
                searchName:value
              })
            }}
          />
          <Button onClick={() => {
            this.isSearch = true
            this.getProduct() //请求商品列表
          }} type="primary">
            <SearchOutlined/>搜索
          </Button>
          </div>
        } 
        extra={<Button type='primary'> 
        <PlusCircleOutlined/>
        添加商品</Button>}
      >
        {/* 表格 */}
        <Table
         rowKey="_id"
         bordered 
         dataSource={dataSource} 
         columns={columns}
         pagination={{
           pageSize:PAGESIZE,
           total:this.state.total,
           current: this.state.pageNum,
           //当页数发生改变
           onChange:(page) => {
            this.getProduct(page) //请求商品列表
           }
          }}
        />
      </Card>
    )
  }
}
