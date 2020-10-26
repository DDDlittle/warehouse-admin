<template>
  <div class="app-container">
    <!-- 表格查询条件 -->
    <div class="filter-container">
      <el-input
        v-model.trim="listQuery.username"
        placeholder="供应商"
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
        prop="provider"
        label="供应商名称"
        width="180"
        align="center"
      />
      <el-table-column
        prop="contact"
        label="联系人"
        width="180"
        align="center"
      />
      <el-table-column
        prop="contact_way"
        label="联系方式"
        align="center"
      />
      <el-table-column
        prop="provider_address"
        label="供应商地址"
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
    <el-dialog title="添加供应商" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="供应商名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.name" autocomplete="off" />
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
        provider: '旺旺食品',
        contact: '张三',
        contact_way: '11111111111',
        provider_address: '上海市普陀区金沙江路 1518 弄'
      }, {
        provider: '乐事',
        contact: '李四',
        contact_way: '22222222222',
        provider_address: '上海市普陀区金沙江路 1518 弄'
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
