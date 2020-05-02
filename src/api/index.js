import ajax from './ajax'

export const reqLogin = (userObj) => ajax.post('/login',userObj)