<template>
<el-card class="box-card">
    <div slot="header" class="clearfix">
        <bread-Crumb level1="权限管理" level2="权限列表"></bread-Crumb>
    </div>

    <el-table :data="rightsList" border stripe style="width: 100%" class="table" height="600">
        <el-table-column label="#" type="index" width="80">
        </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="200">
        </el-table-column>
        <el-table-column prop="path" label="路径" width="200">
        </el-table-column>
        <el-table-column label="层级" >
            <template slot-scope="scope">
                <span v-if="scope.row.level === '0'">一级</span>
                <span v-if="scope.row.level === '1'">二级</span>
                <span v-if="scope.row.level === '2'">三级</span>
            </template>
        </el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      rightsList: []
    }
  },
  mounted () {
    this.getRights()
  },
  methods: {
    async getRights () {
      const res = await this.$http.get(`rights/list`)
      this.rightsList = res.data.data
    }
  }
}
</script>

<style>
.box-card{
    height: 100%;
}
</style>
