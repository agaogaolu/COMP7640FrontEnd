const USER_KEY = "user_info"

// 获取个人信息
export const getUserInfo = () => {
    const defaultObj = { token: '', role: '' }
    const result = localStorage.getItem(USER_KEY)
    return result ? JSON.parse(result) : defaultObj
  }
  
  // 设置个人信息
  export const setUserInfo = (obj) => {
    localStorage.setItem(USER_KEY, JSON.stringify(obj))
  }
  
  // 移除个人信息
  export const removeInfo = () => {
    localStorage.removeItem(USER_KEY)
  }
  