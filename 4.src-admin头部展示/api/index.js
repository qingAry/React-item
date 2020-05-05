import ajax from './ajax'//二次封装后的axios
//请求登录函数，userObj是对象{username:×××,password:×××}
export const reqLogin = (userObj) => ajax.post('/login',userObj)
