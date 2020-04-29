//初始化的状态值 再不操作任何的东西之后 返回数据为0
export function changeState(pre = 0,action) {
  //创建reducer函数 返回一个新的数据
  const {type,data} = action
  // let newNum = 0;
  switch (type) {
    case "increment":
    // newNum =pre + data
    // console.log('object',newNum)
    // break;
    return pre + data
    case "decrement":
    // newNum = pre - data
    // break;
    return pre - data
    default:
    // newNum = pre
    // break;
    return pre
  }
  // return newNum
}

