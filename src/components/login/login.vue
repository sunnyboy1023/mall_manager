<template>
<div class="login-wrap">
    <el-form label-position="top" label-width="400px" :model="formdata" class="form">
        <h3>用户登录</h3>
        <el-form-item label="用户名">
            <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input type="password" v-model="formdata.password"></el-input>
        </el-form-item>
        <el-button @click.prevent="login()" type="primary" class="login-btn">登&nbsp;&nbsp;录</el-button>
    </el-form>
</div>
</template>

<script>
export default {
    data() {
        return {
            formdata: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            this.$http.post('/login', this.formdata).then(res => {
                const {meta:{msg, status}} = res.data;
                if (status === 200) {
                    const {token, username} = res.data.data;
                    this.$message.success(msg);
                    this.$router.push('/home');
                    localStorage.setItem('token', token);
                    localStorage.setItem('username', username);
                } else {
                    this.$message.error(msg)
                }
            })
        }
    }
}
</script>

<style>
.login-wrap {
    background-color: #324152;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.form {
    background-color: #fff;
    width: 400px;
    border-radius: 5px;
    padding: 40px;
}

.login-btn {
    margin-top: 20px;
    width: 100%;
}
</style>
