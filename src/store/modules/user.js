import {  getUserInfo, setUserInfo } from "@/utils/storage"

export default {
    namespaced: true,
    state () {
      return {
        // 
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
        // Personal information should be reset
        context.commit('setUserInfo', {})
  
      }
    },
    getters: {}
  }