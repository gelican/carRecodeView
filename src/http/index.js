import axios from 'axios'
import Vue from 'vue'
import store from '../store'
import router from '../router/index'
import { Notify } from 'vant';

// 请求前
axios.interceptors.request.use(res => {
    return res
}, (error) => {
    return Promise.reject(error)
})

// 请求后
axios.interceptors.response.use(res => {
    if (res.status === 200) {
        if (res.data.code === 200) {
            return res.data.data
        } else {
            Notify({
                type: 'danger',
                message: res.data.msg
            });
            return
        }
    } else {
        Notify({
            type: 'danger',
            message: '请求数据报错，请联系管理员'
        });
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
