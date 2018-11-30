<template>
<el-container class="wrap">
    <el-header class="header">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <img src="@/assets/images/logo.png" alt>
        </div>
        </el-col>
        <el-col :span="16">
            <div class="grid-content bg-purple-light">
                <h2 class="title">后台电商管理系统</h2>
            </div>
        </el-col>
        <el-col :span="4">
            <div class="grid-content bg-purple logout">
                当前登录用户【 {{username}} 】 &nbsp;&nbsp;
                <el-button type="info" plain size="small" @click.prevent="logout()">退出</el-button>
            </div>
        </el-col>
    </el-header>
    <el-container>
        <el-aside width="200px" class="aside">
            <el-menu default-active="2" class="el-menu-vertical-demo" unique-opened router>
                <el-submenu :index="'' + v1.id" v-for="(v1,i1) in asideList" :key="i1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{v1.authName}}</span>
                    </template>
                    <el-menu-item :index="v2.path" v-for="(v2,i2) in v1.children" :key="i2">
                        <i class="el-icon-menu"></i>
                        <span>{{v2.authName}}</span>
                    </el-menu-item>
                </el-submenu>

            </el-menu>
        </el-aside>
        <el-main class="main">
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      asideList: []
    }
  },
  beforeCreate () {
    const token = localStorage.getItem('token')
    if (!token) {
      this.$message.warning('请先登录')
      this.$router.push('/login')
    }
  },
  mounted () {
    this.username = localStorage.getItem('username')
    this.loadAside()
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$message.warning('退出登录')
      this.$router.push('/login')
    },
    async loadAside () {
      const res = await this.$http.get(`menus`)
      this.asideList = res.data.data
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

.search {
    width: 400px;
}

.block {
    margin-top: 10px;
}
</style>
