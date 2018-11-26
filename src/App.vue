<template>
  <div id="app">
    <el-form label-position="top" label-width="400px" :model="formLabelAlign">
      <h3>用户登录</h3>
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formLabelAlign.region"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
      return {
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      };
    }
};
</script>

<style>
</style>
