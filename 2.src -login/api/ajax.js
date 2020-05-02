import axios from 'axios'
import qs from 'querystring'
import {message as msg} from 'antd' //取别名
// 默认配置
axios.defaults.baseURL = '/api'
axios.defaults.timeout = '2000'
// 响应拦截器
axios.interceptors.request.use((config) => {
  console.log('config',config)
  const {method,data} = config
  if(method.toLowerCase()==='post' && data instanceof Object){
    config.data =  qs.stringify(data)
  }
  return config
})
//请求拦截器
axios.interceptors.response.use((response) => {
  // console.log('......................')
  return response.data
},(error) => {
  
  const {message} = error
  alert(message)
  let errorMsg = '未知错误，请联系工作人员'
  if(message.indexOf('Network') !== -1) errorMsg = '请查看网络连接是否正常'
  else if(message.indexOf('timeout') !== -1) errorMsg = '网络请求超时'
  else if(message.indexOf('401') !==-1) errorMsg='身份过期，请重新登录'
  msg.error(errorMsg)
  return new Promise(()=>{})
})
//暴露axios
export default axios