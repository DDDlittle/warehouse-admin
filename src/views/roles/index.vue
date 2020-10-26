<template>
  <div class="app-container">
    <!-- 表格查询条件 -->
    <div class="filter-container">
      <el-input
        v-model.trim="listQuery.role_name"
        placeholder="角色..."
        style="width: 200px;"
        class="filter-item"
        clearable
      />
      <div class="time-choose-box">
        <div class="time-choose">
          <el-button type="primary" @click="search()">查询</el-button>
          <el-button type="primary" @click="add()">添加</el-button>
        </div>
      </div>
    </div>
    <!-- 表格区域 -->
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="role_name"
        label="角色名称"
        align="center"
      />
      <el-table-column
        label="角色状态"
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
        prop="update_time"
        label="更新时间"
        align="center"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="108"
      >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row)" />
          <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page.sync="listQuery.page"
      layout="total, prev,pager, next"
      :total="total"
      background
      @current-change="search"
    />
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色名称">
          <el-input v-model.trim="form.role_name" />
        </el-form-item>
        <el-form-item label="角色状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色权限">
          <el-checkbox-group v-model="form.role_keys">
            <el-checkbox v-for="(item, index) in menusList" :key="index" :label="item.code">
              {{ item.menu_name }}
            </el-checkbox>
          </el-checkbox-group>
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
import { list, add, del, edit, menus, status } from '@/api/roles'

export default {
  name: 'Administrator',
  data() {
    return {
      listQuery: {
        role_name: '',
        page: 1,
        limit: 10
      },
      title: '添加角色',
      menusList: [],
      form: {
        role_name: '',
        status: 1,
        role_keys: []
      },
      tableData: [],
      total: 0,
      dialogFormVisible: false
    }
  },
  created() { // 页面加载的时候
    this.getMenus()
    this.search()
  },
  methods: {
    getMenus() { // 获取菜单列表
      menus().then(res => {
        this.menusList = res // 菜单列表
      })
    },
    search() { // 查询菜单列表
      this.loading = true // 触发加载动画
      list(this.listQuery).then(res => {
        this.tableData = res.list // 角色列表
        this.total = res.total // 角色列表总条数
        this.loading = false // 停止加载动画
      })
    },
    add() { // 添加角色
      this.title = '添加角色' // 设置弹窗标题
      this.dialogFormVisible = true // 打开弹窗
      this.form = this.$options.data().form // 初始化form表单
    },
    edit(currentUser) { // 编辑角色
      this.form = { ...currentUser } // 表单回显
      this.form.role_keys = this.form.role_keys.split(',')
      this.title = '编辑角色' // 设置弹窗标题
      this.dialogFormVisible = true // 打开弹窗
    },
    ok() { // 提交表单
      if (this.title === '编辑角色') { // 编辑请求
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
    changeStatus(data) { // 编辑角色状态
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
    del(data) { // 删除角色
      if (data.status) { // 角色为启用状态禁止删除
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
