<template>
    <div class="wrap">
        <div style="height: 1px;"></div>
        <div class="container">
            <div class="form" v-if="!registerFlag">
                <div class="title">用户登录</div>
                <div class="input">
                    <div class="icon iconfont icon-user"></div>
                    <input class="content" v-model="name" placeholder="账号">
                </div>
                <div class="input">
                    <div class="icon iconfont icon-unlock"></div>
                    <input class="content" v-model="password" placeholder="密码" type="password">
                </div>
                <div class="button" v-if="!loading" @click="login">登 录</div>
                <div class="button disabled" v-else>登 录 中...</div>
                <div class="tips" @click="registerFlag = true">没有账号？马上注册</div>
            </div>
            <div class="form" v-else>
                <div class="title">用户注册</div>
                <div class="input">
                    <div class="icon iconfont icon-user"></div>
                    <input class="content" v-model="name" placeholder="账号">
                </div>
                <div class="input">
                    <div class="icon iconfont icon-user"></div>
                    <input class="content" v-model="nick" placeholder="昵称">
                </div>
                <div class="input">
                    <div class="icon iconfont icon-unlock"></div>
                    <input class="content" v-model="password" placeholder="密码" type="password">
                </div>
                <div class="input">
                    <div class="icon iconfont icon-unlock"></div>
                    <input class="content" v-model="passwordAgain" placeholder="重复密码" type="password">
                </div>
                <div class="button" v-if="!loading" @click="register">注 册</div>
                <div class="button disabled" v-else>注 册 中...</div>
                <div class="tips" @click="registerFlag = false">已有账号？马上登录</div>
            </div>
        </div>
    </div>
</template>

<script>
    let that;
    export default {
        name: "login",
        data() {
            return {
                loading: false,
                name: '',
                nick: '',
                password: '',
                passwordAgain: '',
                registerFlag: false, // 是否是注册页
            };
        },
        beforeCreate() {
            that = this
        },
        methods: {
            async login() {
                if (this.name === '') {
                    this.$notify({
                        type: 'danger',
                        message: '请填写账号'
                    })
                    return
                }
                if (this.password === '') {
                    this.$notify({
                        type: 'danger',
                        message: '请填写密码'
                    })
                    return
                }
                let res = await this.$api.login({
                    name: this.name,
                    password: this.password,
                })
                if (res) {
                    this.$store.commit('updateUserData', {
                        user: {
                            id: res.id,
                            name: res.name,
                            nick: res.nick,
                            token: res.token,
                            isAdmin: res.isAdmin,
                        }
                    })
                    this.$router.replace({
                        path: '/'
                    })
                }
            },
            async register() {
                if (this.name === '') {
                    this.$notify({
                        type: 'danger',
                        message: '请填写账号'
                    })
                    return
                }
                if (this.nick === '') {
                    this.$notify({
                        type: 'danger',
                        message: '请填写昵称'
                    })
                    return
                }
                if (this.password === '') {
                    this.$notify({
                        type: 'danger',
                        message: '请填写密码'
                    })
                    return
                }
                if (this.passwordAgain === '') {
                    this.$notify({
                        type: 'danger',
                        message: '请填写重复密码'
                    })
                    return
                }
                if (this.passwordAgain !== this.password) {
                    this.$notify({
                        type: 'danger',
                        message: '两次密码输入不一致'
                    })
                    return
                }
                let res = await this.$api.register({
                    name: this.name,
                    nick: this.nick,
                    password: this.password,
                })
                if (res) {
                    this.$notify({
                        type: 'success',
                        message: '注册成功，请登录',
                        onOpened() {
                            that.name = ''
                            that.nick = ''
                            that.password = ''
                            that.passwordAgain = ''
                            that.registerFlag = false
                        }
                    })
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    .wrap{
        height: 100%;
        background-image: url("../assets/images/car.jpg");
        background-size: cover;
        background-position: 12% 0;
        background-repeat: no-repeat;
        position: relative;
        .container{
            width: 400px;
            max-width: 70%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -70%);
            .form{
                background-color: rgba(255, 255, 255, 0.8);
                border-radius: 10px;
                padding-bottom: 10px;
                .title{
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    color: #707070;
                    font-size: 18px;
                    letter-spacing: 6px;
                    padding: 10px 0;
                }
                .input{
                    width: 80%;
                    border: 1px solid #dcdfe6;
                    border-radius: 4px;
                    margin: 0 auto 20px;
                    height: 28px;
                    line-height: 28px;
                    color: #606266;
                    .icon{
                        width: 12%;
                        height: 100%;
                        float: left;
                        text-align: center;
                    }
                    .content{
                        outline: none;
                        border: none;
                        background-color: transparent;
                        width: 86%;
                        height: 100%;
                        padding: 0;
                        margin: 0;
                        float: right;
                    }
                }
                .button{
                    width: 80%;
                    height: 36px;
                    line-height: 36px;
                    border-radius: 5px;
                    text-align: center;
                    margin: 30px auto 10px;
                    font-size: 15px;
                    color: #fff;
                    background-color: #1890ff;
                    &:not(.disabled):active{
                        background-color: #46a6ff;
                    }
                    &.disabled{
                        background-color: #a2adb6;
                    }
                }
                .tips{
                    color: #46a6ff;
                    height: 20px;
                    text-align: center;
                    font-size: 14px;
                    text-decoration: underline;
                }
            }
        }
    }
</style>
