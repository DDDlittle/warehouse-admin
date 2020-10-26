<template>
  <div class="app-container">
    <!-- 表格查询条件 -->
    <div class="filter-container">
      <el-input
        v-model.trim="listQuery.username"
        placeholder="账号..."
        style="width: 200px;"
        class="filter-item"
        clearable
      />
      <div class="time-choose-box">
        <div class="time-choose">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="add">添加</el-button>
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
        prop="account"
        label="账号"
        align="center"
      />
      <el-table-column
        prop="nick_name"
        label="昵称"
        align="center"
      />
      <el-table-column
        prop="avatar"
        label="头像"
        align="center"
      >
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="账号启禁"
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
        prop="role_id"
        label="角色"
        align="center"
      >
        <template slot-scope="scope">
          {{ roles[scope.row.role_id] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="update_time"
        label="更新时间"
        align="center"
      />
      <el-table-column
        prop="remark"
        label="备注"
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
        <el-form-item label="账号">
          <el-input v-model.trim="form.account" :disabled="title === '编辑账号'" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model.trim="form.user_pwd" show-password placeholder="长度6至12位" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model.trim="form.nick_name" />
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model.trim="form.avatar" />
        </el-form-item>
        <el-form-item label="账号状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色">
          <el-select ref="role_id" v-model="form.role_id" placeholder="选择用户角色" clearable class="filter-item">
            <el-option v-for="(item,i) in rolesList" :key="i" :label="item.role_name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model.trim="form.remark" />
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
import { list, add, del, edit, roles, status } from '@/api/users'

export default {
  name: 'Administrator',
  data() {
    return {
      listQuery: {
        username: '', // 用户名
        page: 1, // 页数
        limit: 10 // 每页条数
      },
      form: { // 添加、编辑表单
        account: '', // 账号
        remark: '', // 备注
        role_id: '', // 角色id
        status: 1, // 账号状态
        avatar: '', // 头像
        user_pwd: '', // 密码
        nick_name: '' // 昵称
      },
      tableData: [], // 表格数据
      total: 0, // 表格总条数
      loading: false, // 加载状态
      roles: {}, // 角色信息
      rolesList: {}, // 角色列表
      title: '添加账号', // 弹窗标题
      dialogFormVisible: false // 添加编辑弹窗显示状态
    }
  },
  created() { // 页面加载的时候
    this.getRoles()
    this.search()
  },
  methods: {
    getRoles() { // 获取角色列表
      roles().then(res => {
        this.rolesList = res // 角色列表
        res.map(item => { // 角色列表对象
          this.roles[item.id] = item.role_name
        })
      })
    },
    search() { // 查询用户列表
      this.loading = true // 触发加载动画
      list(this.listQuery).then(res => {
        this.tableData = res.list // 用户列表
        this.total = res.total // 用户列表总条数
        this.loading = false // 停止加载动画
      })
    },
    add() { // 添加账号
      this.title = '添加账号' // 设置弹窗标题
      this.dialogFormVisible = true // 打开弹窗
      this.form = this.$options.data().form // 初始化form表单
    },
    edit(currentUser) { // 编辑账号
      this.form = { ...currentUser } // 表单回显
      this.title = '编辑账号' // 设置弹窗标题
      this.dialogFormVisible = true // 打开弹窗
    },
    ok() { // 提交表单
      if (this.title === '编辑账号') { // 编辑请求
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
    changeStatus(data) { // 编辑用户状态
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
    del(data) { // 删除用户
      if (data.status) { // 账号为启用状态禁止删除
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
