<template>
  <div class="app-container">
    <!-- 表格查询条件 -->
    <div class="filter-container">
      <el-input
        v-model.trim="listQuery.username"
        placeholder="商品"
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
        prop="item_type"
        label="商品类型"
        align="center"
      />
      <el-table-column
        prop="provider_address"
        label="供应商地址"
        align="center"
      />
      <el-table-column
        prop="count"
        label="库存数量"
        align="center"
      />
      <el-table-column
        prop="unit"
        label="单位"
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
    <el-dialog title="添加商品" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="供应商名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品类别">
          <el-select v-model="form.region" placeholder="请选择商品类别">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="单位">
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
        item_name: '旺仔牛奶',
        provider: '旺旺食品',
        item_type: '乳制品',
        provider_address: '上海市普陀区金沙江路 1518 弄',
        count: '10',
        unit: '箱'
      }, {
        item_name: '旺仔牛奶',
        provider: '旺旺食品',
        item_type: '乳制品',
        provider_address: '上海市普陀区金沙江路 1518 弄',
        count: '10',
        unit: '箱'
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
