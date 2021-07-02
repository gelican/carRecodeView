import axios from 'axios'
import Vue from 'vue'
import store from '../store'
import router from '../router/index'
import { Message } from 'element-ui';

// 请求前
axios.interceptors.request.use(res => {
    return res
}, (error) => {
    return Promise.reject(error)
})

// 请求后
axios.interceptors.response.use(res => {
    console.log(res)
    if (res.data.code === 200) {
        return res.data.data
    } else {
        Message({
            message: res.data.msg,
            type: 'error',
            duration: 3 * 1000
        })
        return (res.data.data)
    }
}, error => {
    return Promise.reject(error)
})

function request(url = '', methods = 'get', params = {}) {
    return axios({
        method: methods,
        url: '/api' + url,
        data: params,
        headers: {
            "Content-type": "application/json",
            "Authorization": store.state.userData.token
        },
    })
}

export {
    axios,
    request
}
