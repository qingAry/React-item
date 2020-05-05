import ajax from './ajax'//二次封装后的axios
// 引入jsonp(发送请求)
import jsonp from 'jsonp'
import { CITY,AK } from '@/config/type'
//请求登录函数，userObj是对象{username:×××,password:×××}
export const reqLogin = (userObj) => ajax.post('/login',userObj)
//请求天气函数
export const reqWeather = () => {
  const url = `http://api.map.baidu.com/telematics/v3/weather`
  jsonp(url, {
    param:`location=${CITY}&output=json&ak=${AK}`,//query参数
    timeout:2000,//超时
  },() => {
    
  })
}


