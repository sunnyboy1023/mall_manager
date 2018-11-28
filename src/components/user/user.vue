<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <bread-Crumb level1="用户管理" level2="用户列表"></bread-Crumb>
    </div>
    <div>
      <el-input placeholder="请输入内容" v-model="query" class="search" clearable @clear="getUserList()">
        <el-button slot="append" icon="el-icon-search" @click.prevent="searchUser()"></el-button>
      </el-input>
      <el-button type="primary" @click.prevent="addDialog()">添加用户</el-button>

      <el-table :data="usersList" stripe style="width: 100%">
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
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="switchChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
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
      
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>

    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="600px">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="80px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑用户" :visible.sync="editDialogVisible" width="600px">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="form.username" autocomplete="off" disabled></el-input>
        </el-form-item>

        <el-form-item label="邮箱" label-width="80px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="80px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="更改用户角色" :visible.sync="roleDialogVisible" width="600px">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="80px">
          <el-input :value="curUser" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="分配角色" label-width="80px">
          <el-select v-model="curRoleId">
            <el-option label="请选择" disabled :value="-1"></el-option>
            <el-option v-for="(v,i) in roleList" :key="i" :label="v.roleName" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      usersList: [],
      query: '',
      pagenum: 1,
      pagesize: 2,
      total: -1,
      addDialogVisible: false,
      editDialogVisible: false,
      roleDialogVisible: false,
      form: {},
      roleList: [],
      curRoleId: -1,
      userId: -1,
      curUser: ''
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
    this.getUserList()
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$message.warning('退出登录')
      this.$router.push('/login')
    },
    async getUserList () {
      // this.$http.defaults.headers.common['Authorization'] = localStorage.getItem('token')
      // const AUTH_TOKEN = localStorage.getItem('token')
      // this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      )
      const {
        data: { total, users }
      } = res.data
      this.usersList = users
      this.total = total
    },
    handleSizeChange (i) {
      this.pagesize = i
      this.getUserList()
    },
    handleCurrentChange (i) {
      this.pagenum = i
      this.getUserList()
    },
    addDialog () {
      this.addDialogVisible = true
    },
    async editDialog (id) {
      this.editDialogVisible = true
      const res = await this.$http.get(`users/${id}`)
      this.form = res.data.data
      this.userId = id
    },
    async roleDialog (id) {
      this.roleDialogVisible = true
      const res1 = await this.$http.get('roles')
      this.roleList = res1.data.data
      const res2 = await this.$http.get(`users/${id}`)
      this.curUser = res2.data.data.username
      this.curRoleId = res2.data.data.rid
      this.userId = id
    },
    async changeRole () {
      this.roleDialogVisible = false
      console.log(this.curRoleId)
      const res = await this.$http.put(`users/${this.userId}/role`, {
        rid: this.curRoleId
      })
      const {
        meta: { status, msg }
      } = res.data
      if (status === 200) {
        this.$message.success(msg)
        this.getUserList()
      } else {
        this.$message.warning(msg)
      }
    },
    async addUser () {
      this.addDialogVisible = false
      const res = await this.$http.post('users', this.form)
      const {
        meta: { msg, status }
      } = res.data
      if (status === 201) {
        this.$message.success(msg)
        this.form = {}
      } else {
        this.$message.warning(msg)
      }
    },
    async editUser () {
      this.editDialogVisible = false
      const res = await this.$http.put(`users/${this.userId}`, this.form)
      const {
        meta: { status, msg }
      } = res.data
      if (status === 200) {
        this.$message.success(msg)
        this.getUserList()
      } else {
        this.$message.warning(msg)
      }
    },
    searchUser () {
      this.pagenum = 1
      this.getUserList()
    },
    delUser (id) {
      this.$confirm('确定删除此用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.delete(`users/${id}`).then(res => {
            console.log(res)
            const {
              meta: { msg, status }
            } = res.data
            if (status === 200) {
              this.$message.success(msg)
              this.getUserList()
            } else {
              this.$message.warning(msg)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async switchChange (user) {
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      )
      console.log(res)
    }
  }
}
</script>

<style>
.box-card{
    height: 100%;
}
</style>
