<template>
    <el-card class="box-card">
    <div slot="header" class="clearfix">
        <bread-Crumb level1="权限管理" level2="角色列表"></bread-Crumb>
    </div>
    <el-button type="primary">添加角色</el-button>
    <el-table :data="rolesList" stripe style="width: 100%">
        <el-table-column type="expand" width="50"></el-table-column>
        <el-table-column type="index" label="#" width="100"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="200"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              plain
              circle
              @click.prevent="editDialog(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              plain
              circle
              @click.prevent="delUser(scope.row.id)"
            ></el-button>
            <el-button
              type="success"
              size="mini"
              icon="el-icon-check"
              plain
              circle
              @click.prevent="roleDialog(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
</template>

<script>
export default {
    data(){
        return {
            rolesList: []
        }
    },
    mounted(){
        this.getRolesList()
    },
    methods: {
        async getRolesList(){
            const res = await this.$http.get(`roles`)
            this.rolesList = res.data.data
        }
    }
}
</script>

<style>
.box-card{
    height: 100%;
}
</style>
