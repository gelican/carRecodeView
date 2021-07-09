<template>
    <div>
        <div>111:{{login_result}}</div>
        <div>222:{{get_result}}</div>
        用户名<input type="text" v-model="userName">
        <br>
        密码<input type="text" v-model="password">
        <br>
        <button @click="login">login</button>
        <br>
        <button @click="get">get</button>
    </div>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {
                login_result: '',
                get_result: '',
                userName: '',
                password: '',
            }
        },
        methods: {
            async login() {
                let res = await this.$api.getUserLogin({
                    userName: this.userName,
                    password: this.password,
                })
                this.$store.commit('updateUserData', {
                    user: {
                        id: res.data.id,
                        userName: res.data.userName,
                        name: res.data.name,
                        token: res.data.token,
                    }
                })
            },
            async get() {
                let res = await this.$api.getUserList()
                this.get_result = res.data
            },
        },
    }
</script>

<style scoped>

</style>