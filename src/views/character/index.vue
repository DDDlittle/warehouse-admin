<template>
  <div class="app-container">
    <!-- 表格查询条件 -->
    <div class="filter-container">
      <el-input
        v-model.trim="listQuery.username"
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
        prop="character_name"
        label="角色名称"
        width="180"
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
            active-value="1"
            inactive-value="0">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="character"
        label="角色"
        align="center"
      />
      <el-table-column
        prop="retimme"
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
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色状态">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="创建时间">
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
        username: '',
      },
      form: {},
      tableData: [{
        character_name: '李四',
        status:1,
        character: 'boss',
        retimme: '2020.09.25',
      },{
       character_name: '麻子',
        status:1,
        character: 'staff',
        retimme: '2020.09.25',
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