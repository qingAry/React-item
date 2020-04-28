import ajax from './ajax'

export const reqLogin = (LoginObj) => ajax.post('/login',LoginObj)