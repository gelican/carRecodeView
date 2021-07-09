import {request} from './index'
import transformFormData from '../public/transformFormData'

const api = {
    /**
     * 用户端接口
     */
    // 前台登录
    login(data) {
        return request('/user/login', 'post', data)
    },
    register(data) {
        return request('/user/register', 'post', data)
    },
}

export default api
