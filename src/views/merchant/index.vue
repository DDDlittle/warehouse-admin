<template>
  <div class="app-container">
    <!-- 表格查询条件 -->
    <div class="filter-container">
      <el-input
        v-model.trim="listQuery.username"
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
        prop="designation"
        label="名称"
        width="180"
        align="center"
      />
      <el-table-column
        prop="merchant_code"
        label="菜单编码"
        width="180"
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
    <el-dialog title="添加" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.name" autocomplete="off" />
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
export default {
  name: 'Administrator',
  data() {
    return {
      listQuery: {
        username: ''
      },
      form: {},
      tableData: [{
        designation: '系统管理',
        merchant_code: 'admin',
        remark: ''
      }, {
       designation: '系统管理',
        merchant_code: 'admin',
        remark: ''
      }],
      dialogFormVisible: false
    }
  },
  created() {
  },
  methods: {
    search() {
      console.log('search...')
    },
    add() {
      console.log('add...')
      // 打开弹窗
      this.dialogFormVisible = true
    },
    edit(data) {
      console.log('edit...')
      console.log(data)
    },
    ok() {
      // 关闭弹窗
      this.dialogFormVisible = false
    },
    del(data) {
      console.log('delete...')
      console.log(data)
    }
  }
}
</script>