import axios from 'axios'//引入axios的核心库
import qs from 'querystring'//引入querystring，请求数据转换位urlencoded
import {message as msg} from 'antd'//引入antd库中的message,as是别名


// 默认配置
axios.defaults.baseURL = '/api'//基础路径
axios.defaults.timeout = 2000 //请求超时时间

// 请求拦截器
axios.interceptors.request.use((config) => {
  let {data,method} = config
  console.log('config',config)
  if(method.toLowerCase() === 'post' && data instanceof Object){
    // 对象转换位urlencoded
    config.data = qs.stringify(data)
  }
  //必须返回config
  return config
})
//响应拦截器
axios.interceptors.response.use(response => {
  //请求成功的数据
  return response.data
},error => {
  // alert (error.message)
  const {message} = error
  let errMsg = '未知错误，请联系管理员'
  if(message.indexOf('Network') !== -1) errMsg = '请检查网络连接是否正常'
  else if(message.indexOf('timeout') !==-1) errMsg = '网络连接超时'
  else if(message.indexOf('401') !== -1) errMsg = '登录错误，请重新登录'
  msg.error(errMsg)
  //二次封装
  //  中断promise链 处理错误 .then() 之后不再处理
  return new Promise(() => {}) //后续错误不用在进行处理
  // return Promise.reject(error) //.then之后继续处理错误
  //throw error  //.then之后继续处理错误
})

export default axios