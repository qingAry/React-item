/* 
	该文件是对axios这个库的二次封装，完成：
		1.配置请求的基础路径
		2.配置超时时间
		3.统一处理post请求json编码问题（转为urlencoded）
		4.统一返回真正的数据data，而不是response对象
*/

import axios from 'axios'
import qs from 'querystring'
import {message as msg} from 'antd'


// axios的默认配置
axios.defaults.baseURL ='http://localhost:3000'
// 请求的超时时间
axios.defaults.timeout = 1500
// 请求拦截器
axios.interceptors.request.use(config=>{
  //config请求相关的配置对象 发送请求要根据config
  // console.log(config)
  const {data,method} = config
  if(method.toLowerCase() === 'post' && data instanceof Object){
    config.data = qs.stringify(data)
  }
  return config
})
//响应拦截器
axios.interceptors.response.use(
  response =>{
    //响应数据 axios发送请求得到的数据就是返回的数据
    return response.data
  },
  error => {
    let errStr = ''
    const {message} = error
    if(message.indexOf('Network') !=-1){
      errStr = '网络错误,请查看网络是否连接'
    }else if( message.indexOf('timeout')!=-1 ){
      errStr = '请求超时'
    }else{
      errStr = '未知错误,请联系客服'
    }
    msg.error(errStr)
    // console.log(error.message)
    //这里返回的要是一个错误的promise或者初始状态的
    //发送请求返回不再处理正确的信息
    return new Promise(() => {})
    // return error
  }
)

export default axios
