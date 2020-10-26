<template>
  <div class="app-container">
    <!-- 表格查询条件 -->
    <div class="filter-container">
      <div class="time-choose-box">
        <div class="time-choose">
          <el-button type="primary" @click="add()">添加</el-button>
        </div>
      </div>
    </div>
    <!-- 表格区域 -->
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="menu_name"
        label="菜单名称"
        align="center"
      />
      <el-table-column
        prop="code"
        label="菜单编码"
        align="center"
      />
      <el-table-column
        label="菜单状态"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="changeStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        align="center"
      />
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row)" />
          <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称">
          <el-input v-model="form.menu_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="form.code" autocomplete="off" />
        </el-form-item>
        <el-form-item label="菜单状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { add, del, edit, list, status } from '@/api/menus'

export default {
  name: 'Administrator',
  data() {
    return {
      form: {
        menu_name: '',
        code: '',
        remark: '',
        status: 1
      },
      tableData: [],
      dialogFormVisible: false,
      loading: false
    }
  },
  created() { // 页面加载的时候
    this.search()
  },
  methods: {
    search() { // 查询菜单列表
      this.loading = true // 触发加载动画
      list().then(res => {
        this.tableData = res // 菜单列表
        this.loading = false // 停止加载动画
      })
    },
    add() { // 添加菜单
      this.title = '添加菜单' // 设置弹窗标题
      this.dialogFormVisible = true // 打开弹窗
      this.form = this.$options.data().form // 初始化form表单
    },
    edit(currentUser) { // 编辑菜单
      this.form = { ...currentUser } // 表单回显
      this.title = '编辑菜单' // 设置弹窗标题
      this.dialogFormVisible = true // 打开弹窗
    },
    ok() { // 提交表单
      if (this.title === '编辑菜单') { // 编辑请求
        edit(this.form).then(() => {
          this.$message.success('编辑成功') // 请求结果提示
          this.dialogFormVisible = false // 关闭弹窗
          this.search() // 刷新列表
        })
      } else { // 添加请求
        add(this.form).then(() => {
          this.$message.success('添加成功') // 请求结果提示
          this.dialogFormVisible = false // 关闭弹窗
          this.search() // 刷新列表
        })
      }
    },
    changeStatus(data) { // 编辑菜单状态
      status({
        status: data.status,
        id: data.id
      }).then(() => {
        this.$message.success('编辑成功') // 请求结果提示
      }).catch(() => {
        this.$message.success('编辑失败') // 请求结果提示
        this.search() // 刷新列表
      })
    },
    del(data) { // 删除菜单
      if (data.status) { // 菜单为启用状态禁止删除
        this.$message.error('删除前请先禁用它！')
        return
      }
      this.$confirm('确认删除么?', '提示', { // 删除确认框
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 确认删除
        this.loading = true // 启用动画
        del({ id: data.id }).then(() => { // 删除成功
          this.search() // 删除成功刷新列表
          this.loading = false // 停止动画
        }).catch(() => { // 删除失败
          this.loading = false
        })
      }).catch(() => { // 取消删除
      })
    }
  }
}
</script>
