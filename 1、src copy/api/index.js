import ajax from './ajax'
// 请求登录 LoginObj请求体(body)参数 发送请求必须携带
export const reqLogin = (LoginObj) => ajax.post('/login',LoginObj)