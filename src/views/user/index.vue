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
        prop="id"
        label="账号"
        width="180"
        align="center"
      />
      <el-table-column
        prop="id_name"
        label="昵称"
        width="180"
        align="center"
      />
      <el-table-column
        prop="head_photo"
        label="头像"
        align="center"
      />
      <el-table-column
        label="账号启禁"
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
    <el-dialog title="添加账号" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="账号">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="账号状态">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="创建时间">
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
import { list, signup, del, edit, getRoles } from '@/api/users'
export default {
  name: 'Administrator',
  data() {
    return {
      listQuery: {
        username: '',
      },
      form: {},
      tableData: [{
        id: '011',
        id_name: '李四',
        status:1,
        head_photo: '',
        character: 'boss',
        retimme: '2020.09.25',
        remark:'无'
      }],
      dialogFormVisible: false
    }
  },
  created() {
    getRoles().then(res => {
      res.map(item => {
        this.roles[item.id] = item.role_name
      })
    })
    this.search()
  },
  methods: {
    search() {
      list(this.listQuery).then(res => {
        this.list = res.list
      })
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
