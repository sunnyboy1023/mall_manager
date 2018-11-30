<template>
<el-card class="box-card">
    <div slot="header" class="clearfix">
        <bread-Crumb level1="权限管理" level2="角色列表"></bread-Crumb>
    </div>
    <el-button type="primary">添加角色</el-button>
    <el-table :data="rolesList" stripe style="width: 100%" height="800">
        <el-table-column type="expand" width="50">
            <template slot-scope="props">
                <el-row v-for="(v1,i1) in props.row.children" :key="i1" class="level1" @close="delRight(props.row,v1.id)">
                    <el-col :span="4">
                        <el-tag closable>{{v1.authName}}</el-tag>
                        <i class="el-icon-arrow-right"></i>
                    </el-col>
                    <el-col :span="20">
                        <el-row v-for="(v2,i2) in v1.children" :key="i2" class="level2">
                            <el-col :span="4">
                                <el-tag closable type="success" @close="delRight(props.row,v2.id)">{{v2.authName}}</el-tag>
                                <i class="el-icon-arrow-right"></i>
                            </el-col>
                            <el-col :span="20">
                                <el-tag closable type="info" v-for="(v3,i3) in v2.children" :key="i3" @close="delRight(props.row,v3.id)">{{v3.authName}}</el-tag>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row v-if="props.row.children.length == '0'">
                    <el-col :span="24">未分配权限</el-col>
                </el-row>
            </template>
        </el-table-column>
        <el-table-column type="index" label="#" width="100"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="200"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-edit" plain circle @click.prevent="editDialog(scope.row.id)"></el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" plain circle @click.prevent="delUser(scope.row.id)"></el-button>
                <el-button type="success" size="mini" icon="el-icon-check" plain circle @click.prevent="roleDialog(scope.row)"></el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog title="分配权限" :visible.sync="rightDialogVisible" width="50%">
        <el-tree :data="rightsList" show-checkbox node-key="id" default-expand-all :default-checked-keys="checkedList" :props="defaultProps" ref="tree">
        </el-tree>
        <span slot="footer" class="dialog-footer">
    <el-button @click="rightDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateRights">确 定</el-button>
  </span>
    </el-dialog>

</el-card>
</template>

<script>
export default {
  data () {
    return {
      rolesList: [],
      rightDialogVisible: false,
      rightsList: [],
      checkedList: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      curRoleId: -1
    }
  },
  mounted () {
    this.getRolesList()
  },
  methods: {
    async getRolesList () {
      const res = await this.$http.get(`roles`)
      this.rolesList = res.data.data
    },
    async delRight (role, rightId) {
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      role.children = res.data.data
    },
    async roleDialog (role) {
      this.rightDialogVisible = true
      const res = await this.$http.get(`rights/tree`)
      this.rightsList = res.data.data

      let arr = []
      role.children.forEach(v1 => {
        v1.children.forEach(v2 => {
          v2.children.forEach(v3 => {
            arr.push(v3.id)
          })
        })
      })
      this.checkedList = arr
      this.curRoleId = role.id
    },
    async updateRights () {
      let arr1 = this.$refs.tree.getHalfCheckedKeys()
      let arr2 = this.$refs.tree.getCheckedKeys()
      let rids = arr1.concat(arr2)
      const res = await this.$http.post(`roles/${this.curRoleId}/rights`, {rids: rids.join(',')})
      const {msg, status} = res.data.meta
      if (status === 200) {
        this.$message.success(msg)
        // 不加就不更新
        this.getRolesList()
      } else {
        this.$message.warning(msg)
      }
      this.rightDialogVisible = false
    }
  }

}
</script>

<style>
.box-card {
    height: 100%;
}

.level1 {
    margin: 10px 0;
}

.level2 {
    margin: 5px 0;
}
</style>
