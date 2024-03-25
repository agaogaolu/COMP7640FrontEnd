import Vue from 'vue';
import store from '@/store'
import axios from 'axios'


// 创建 axios 实例，将来对创建出来的实例，进行自定义配置
// 好处：不会污染原始的 axios 实例
const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    timeout: 5000
})

// 自定义配置 - 请求/响应 拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {

    
    // 只要有token，就在请求时携带，便于请求需要授权的接口
    const userInfo = store.getters.userInfo
    // console.log(userInfo.token)
    if (userInfo.token) {
        config.headers.token = userInfo.token
    }
    // console.log(config)
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么 (默认axios会多包装一层data，需要响应拦截器中处理一下)
    const res = response.data
    // console.log(response)
    // console.log(res)
    // console.log(response.status == 200)

    if (response.data.status !== 200) {
        // 给错误提示, Toast 默认是单例模式，后面的 Toast调用了，会将前一个 Toast 效果覆盖
        // 同时只能存在一个 Toast
        Vue.prototype.$message({
            message: res.msg,
            type: 'error'
        })
        // 抛出一个错误的promise
        return Promise.reject(res.msg)
    }

    return res
}, function (error) {
    Vue.prototype.$message({
        message: "网络故障",
        type: 'error'
    })
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
})

// 导出配置好的实例
export default instance


