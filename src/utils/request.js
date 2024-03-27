import Vue from 'vue';
import store from '@/store'
import axios from 'axios'


// Create an axios instance and customize it in the future.
// Benefit: doesn't pollute the original axios instance.
const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    timeout: 5000
})

// Custom Configuration - Request/Response Interceptors
// Add a request interceptor
instance.interceptors.request.use(function (config) {

    
    // As long as the token is available, carry it with the request to make it easier to request interfaces that require authorization
    const userInfo = store.getters.userInfo
    // console.log(userInfo.token)
    if (userInfo.token) {
        config.headers.token = userInfo.token
    }
    console.log("11111")
    console.log(config)
    return config
}, function (error) {
    // Do something about the request error
    return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // This function is triggered for any status code in the 2xx range.
    // Do something with the response data (by default axios wraps an extra layer of data, which needs to be handled in the response interceptor).
    const res = response.data
    // console.log(response)
    // console.log(response)
    // console.log(response.status == 200)

    if (response.data.status !== 200) {
        // Toasts are singleton by default, if a later Toast is called, it will overwrite the previous Toast.
        // Only one Toast can exist at a time.
        // console.log(res)
        Vue.prototype.$message({
            message: res.msg,
            type: 'error'
        })
        // Throw an error promise
        return Promise.reject(res.msg)
    }
    // console.log("22222")
    // console.log(res)
    return res
}, function (error) {
    Vue.prototype.$message({
        message: "Netword Error",
        type: 'error'
    })
    // This function is triggered by any status code outside the 2xx range.
    // Do something about response errors
    return Promise.reject(error)
})

// Export the configured instance
export default instance


