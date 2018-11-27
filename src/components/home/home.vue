<template>
  <el-container class="wrap">
    <el-header class="header">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <img src="@/assets/images/logo.png" alt>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="grid-content bg-purple-light">
          <h2 class="title">后台电商管理系统</h2>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="grid-content bg-purple">
          <a @click.prevent="logout()" class="logout">退出</a>
        </div>
      </el-col>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          unique-opened>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-4-1"><i class="el-icon-menu"></i><span>用户列表</span></el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="1-4-1"><i class="el-icon-menu"></i><span>角色列表</span></el-menu-item>
            <el-menu-item index="1-4-1"><i class="el-icon-menu"></i><span>权限列表</span></el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="1-4-1"><i class="el-icon-menu"></i><span>商品列表</span></el-menu-item>
            <el-menu-item index="1-4-1"><i class="el-icon-menu"></i><span>分类参数</span></el-menu-item>
            <el-menu-item index="1-4-1"><i class="el-icon-menu"></i><span>商品分类</span></el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="1-4-1"><i class="el-icon-menu"></i><span>订单列表</span></el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="1-4-1"><i class="el-icon-menu"></i><span>数据报表</span></el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  beforeCreate(){
    const token = sessionStorage.getItem('token');
    if (!token){
      this.$message.warning('请先登录');
      this.$router.push('/login');
    }
  },
  methods: {
    logout(){
      sessionStorage.clear();
      this.$message.warning('退出登录');
      this.$router.push('/login');
    }
  }
}
</script>

<style>
.header {
  background-color: #b3c0d1;
}
.aside {
  background-color: #fff;
}
.main {
  background-color: #e9eef3;
}
.wrap {
  height: 100%;
}
.title {
  text-align: center;
  line-height: 60px;
}
.logout {
  line-height: 60px;
}
</style>
