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
            <el-menu default-active="2" class="el-menu-vertical-demo" unique-opened>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="1-4-1">
                        <i class="el-icon-menu"></i>
                        <span>用户列表</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>
                    </template>
                    <el-menu-item index="1-4-1">
                        <i class="el-icon-menu"></i>
                        <span>角色列表</span>
                    </el-menu-item>
                    <el-menu-item index="1-4-1">
                        <i class="el-icon-menu"></i>
                        <span>权限列表</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品管理</span>
                    </template>
                    <el-menu-item index="1-4-1">
                        <i class="el-icon-menu"></i>
                        <span>商品列表</span>
                    </el-menu-item>
                    <el-menu-item index="1-4-1">
                        <i class="el-icon-menu"></i>
                        <span>分类参数</span>
                    </el-menu-item>
                    <el-menu-item index="1-4-1">
                        <i class="el-icon-menu"></i>
                        <span>商品分类</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订单管理</span>
                    </template>
                    <el-menu-item index="1-4-1">
                        <i class="el-icon-menu"></i>
                        <span>订单列表</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>数据统计</span>
                    </template>
                    <el-menu-item index="1-4-1">
                        <i class="el-icon-menu"></i>
                        <span>数据报表</span>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main class="main">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div>
                    <el-input placeholder="请输入内容" v-model="searchVal" class="search">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-button type="info" plain>搜索</el-button>

                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="date" label="ID" width="200">
                        </el-table-column>
                        <el-table-column prop="date" label="姓名" width="200">
                        </el-table-column>
                        <el-table-column prop="date" label="邮箱" width="400">
                        </el-table-column>
                        <el-table-column prop="name" label="创建日期" width="350">
                        </el-table-column>
                        <el-table-column prop="name" label="用户状态" width="200">
                        </el-table-column>
                        <el-table-column prop="name" label="操作">
                        </el-table-column>
                    </el-table>

                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
                        </el-pagination>
                    </div>
                </div>
            </el-card>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            tableData: [],
            searchVal: ''
        }
    },
    beforeCreate() {
        const token = sessionStorage.getItem("token");
        if (!token) {
            this.$message.warning("请先登录");
            this.$router.push("/login");
        }
    },
    mounted() {
        this.username = sessionStorage.getItem("username");
    },
    methods: {
        logout() {
            sessionStorage.clear();
            this.$message.warning("退出登录");
            this.$router.push("/login");
        }
    }
};
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
</style>
