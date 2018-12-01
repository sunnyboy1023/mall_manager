<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <bread-Crumb level1="商品管理" level2="商品列表"></bread-Crumb>
    </div>
    <div>
      <el-input placeholder="请输入内容" v-model="query" class="search" clearable @clear="getUserList()">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="primary" @click.prevent="$router.push('/goodAdd')">添加商品</el-button>

      <el-table :data="goodsList" stripe border style="width: 100%" height="600">
        <el-table-column type="index" label="#" width="50"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="900"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格" width="150"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="150"></el-table-column>
        <el-table-column label="创建日期" width="200">
          <template slot-scope="scope">{{scope.row.upd_time | fmtDate('YYYY-MM-DD')}}</template>
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
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[6, 10, 14, 18]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [],
      pagenum: 1,
      pagesize: 10,
      query: "",
      total: -1
    };
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
    async getGoodsList() {
      const res = await this.$http.get(
        `goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      this.goodsList = res.data.data.goods;
      this.total = res.data.data.total;
    },
    handleSizeChange(i){
        this.pagesize = i
        this.getGoodsList()
    },
    handleCurrentChange(i){
        this.pagenum = i
        this.getGoodsList()
    }
  }
};
</script>

<style>
.box-card {
  height: 100%;
}
</style>
