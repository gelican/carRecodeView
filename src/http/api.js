import {request} from './index'
import transformFormData from '../public/transformFormData'

const api = {
    /**
     * 用户端接口
     */
    // 前台登录
    login(data) {
        return request('/user', 'post', data)
    },
    getUserLogin(data) {
        return request('/user/login', 'post', data)
    },
    getUserList(data) {
        return request('/user', 'get')
    },
}

export default api
