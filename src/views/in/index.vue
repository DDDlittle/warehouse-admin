<template>
  <div class="app-container">
    <!-- 表格查询条件 -->
    <div class="filter-container">
      <el-input
        v-model.trim="listQuery.username"
        placeholder=""
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
        prop="order_number"
        label="订单号"
        width="180"
        align="center"
      />
      <el-table-column
        prop="order_status"
        label="订单状态"
        width="180"
        align="center"
      />
      <el-table-column
        prop="start_time"
        label="创建时间"
        align="center"
      />
      <el-table-column
        prop="end_time"
        label="完成时间"
        align="center"
      />
      <el-table-column
        prop="operation_staff"
        label="操作员"
        align="center"
      />
    </el-table>
    <el-dialog title="添加商品" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="订单号">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="时间">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品列表">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
        >
        <el-table-column
        prop="item_name"
        label="商品名称"
        width="180"
        align="center"
        />
        <el-table-column
            prop="provider"
            label="供应商"
            width="180"
            align="center"
        />
        <el-table-column
            prop="count"
            label="数量"
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
        order_number: '99999999999',
        order_status: '运输中...',
        start_time: '2020.09.25',
        end_time: '-',
        operation_staff: ''
      }, {
        order_number: '88888888888',
        order_status: '到货',
        start_time: '2020.09.25',
        end_time: '2020.09.25',
        operation_staff: ''
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