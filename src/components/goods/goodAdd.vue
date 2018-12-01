<template>
<el-card class="box-card">
    <div slot="header" class="clearfix">
        <bread-Crumb level1="商品管理" level2="商品列表"></bread-Crumb>
    </div>
    <el-alert title="添加商品信息" type="info" center :closable="false" show-icon></el-alert>
    <el-steps :active="1*active" align-center class="step">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
    </el-steps>
    <el-form label-position="left" label-width="150px" :model="goodForm">
        <el-tabs tab-position="left" v-model="active" @tab-click="tabChange">
            <el-tab-pane name="1" label="基本信息">
                <el-form-item label="商品名称">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="商品重量">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="商品数量">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="商品分类">
                    {{selectedOptions}}
                    <el-cascader expand-trigger="hover" :options="options" :props="props" v-model="selectedOptions" clearable>
                    </el-cascader>
                </el-form-item>

            </el-tab-pane>
            <el-tab-pane name="2" label="商品参数">
                <el-form-item v-for="(v1,i1) in optionForm" :key="i1" :label="v1.attr_name">
                    <el-checkbox-group v-model="v1.attr_vals">
                        <el-checkbox border v-for="(v2,i2) in v1.attr_vals" :key="i2" :label="v2"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane name="3" label="商品属性">
                <el-form-item v-for="(v1,i1) in paramsForm" :key="i1" :label="v1.attr_name">
                    <el-input v-model="v1.attr_vals"></el-input>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane name="4" label="商品图片">
                <el-upload class="upload-demo" action="http://localhost:8888/api/private/v1/upload" :headers="headers" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-tab-pane>
            <el-tab-pane name="5" label="商品内容">
                <quill-editor></quill-editor>
                <el-button class="addBtn" @click="addGood">添加商品</el-button>
            </el-tab-pane>
        </el-tabs>
    </el-form>
</el-card>
</template>

<script>

import {
  quillEditor
} from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  data () {
    return {
      active: '1',
      goodForm: {},
      selectedOptions: [],
      options: [],
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      optionForm: [],
      selectForm: [],
      paramsForm: [],
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  created () {
    this.getGoodscategories()
  },
  methods: {
    async getGoodscategories () {
      const res = await this.$http.get(`categories?type=3`)
      this.options = res.data.data
    },
    async tabChange () {
      if (this.active === '2' || this.active === '3') {
        if (this.selectedOptions.length !== 3) {
          this.$message.warning('请先选择三级商品分类')
        } else if (this.active === '2') {
          const res1 = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`)
          let arr = res1.data.data
          arr.forEach((v) => {
            v.attr_vals = v.attr_vals.split(',')
            this.optionForm = res1.data.data
          })
        } else if (this.active === '3') {
          const res2 = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
          this.paramsForm = res2.data.data
          console.log(this.paramsForm)
          console.log(res2)
        }
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleSuccess (file) {
      console.log(file)
    },
    addGood () {
      // goods_name	商品名称	不能为空
      // goods_cat	以为','分割的分类列表	不能为空
      // goods_price	价格	不能为空
      // goods_number	数量	不能为空
      // goods_weight	重量	不能为空
      // goods_introduce	介绍	可以为空
      // pics	上传的图片临时路径（对象）	可以为空
      // attrs	商品的参数（数组）	可以为空
      console.log(this.goodForm)
    }
  },
  components: {
    quillEditor
  }
}
</script>

<style>
.step {
    margin: 20px 0;
}

.box-card {
    height: 100%;
}
.ql-editor {
    height: 500px;
}
.addBtn {
    margin: 10px 0;
}
</style>
