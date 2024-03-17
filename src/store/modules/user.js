import {  getUserInfo, setUserInfo } from "@/utils/storage"

export default {
    namespaced: true,
    state () {
      return {
        // 个人权证相关
        userInfo: getUserInfo()
      }
    },
    mutations: {
      // 所有mutations的第一个参数，都是state
      setUserInfo (state, obj) {
        state.userInfo = obj
        setUserInfo(obj)
        console.log('user/setUserInfo:'+obj)
      }
    },
    actions: {
      logout (context) {
        // 个人信息要重置
        context.commit('setUserInfo', {})
  
      }
    },
    getters: {}
  }