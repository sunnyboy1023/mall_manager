<template>
<el-card class="box-card">
    <div slot="header" class="clearfix">
        <bread-Crumb level1="商品管理" level2="商品列表"></bread-Crumb>
    </div>
    <div>
        <el-input placeholder="请输入内容" v-model="query" class="search" clearable @clear="getUserList()">
            <el-button slot="append" icon="el-icon-search" @click.prevent="searchUser()"></el-button>
        </el-input>
        <el-button type="primary" @click.prevent="addDialog()">添加用户</el-button>

        <el-table :data="goodsList" stripe style="width: 100%">
            <el-table-column type="index" label="#" width="100"></el-table-column>
            <el-table-column prop="username" label="姓名" width="150"></el-table-column>
            <el-table-column prop="mobile" label="电话" width="150"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="300"></el-table-column>
            <el-table-column prop="role_name" label="角色" width="200"></el-table-column>
            <el-table-column label="创建日期" width="300">
                <template slot-scope="scope">{{scope.row.create_time | fmtDate('YYYY-MM-DD')}}</template>
            </el-table-column>
            <el-table-column label="用户状态" width="200">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="switchChange(scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit" plain circle @click.prevent="editDialog(scope.row.id)"></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" plain circle @click.prevent="delUser(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>
    </div>


    
</el-card>
</template>

<script>
export default {
    data(){
        return{
            goodsList: []
        }
    },
    mounted(){

    },
    methods: {

    }

}
</script>

<style>

</style>
