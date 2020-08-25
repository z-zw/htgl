<template>
  <div>
    <el-button type="primary" @click="roadd" class="add">添加</el-button>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageInfo.size"
      @current-change="getChange"
    ></el-pagination>
    <el-table :data="userData" border style="width: 90%">
      <el-table-column prop="uid" label="用户编号" width="150"></el-table-column>
      <el-table-column prop="username" label="用户名称" width="150"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="150"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status ==1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="edits(scope.row.uid)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="dels(scope.row.uid)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="isAdd?'添加角色':'修改角色'"
      :visible.sync="dialogFormVisible"
      center
      :before-close="resetForm"
    >
      <el-form :model="userForm" ref="ruleForm" :rules="rules">
        <el-form-item prop="roleid" label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="userForm.roleid" placeholder="请选择">
            <el-option
              v-for="item in roleData"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="username" label="用户名称：" :label-width="formLabelWidth">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="formLabelWidth">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="userForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancels">取 消</el-button>
        <el-button type="primary" @click="submits">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getUseradd,
  getUserinfo,
  getUseredit,
  getUserdelete,
  getUsercount,
} from "../util";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      total: 0,
      pageInfo: {
        size: 2,
        page: 1,
      },
      rules: {
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "change" },
        ],
        username: [
          { required: true, message: "请输入管理员名称", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      roid: 0,
      dialogFormVisible: false,
      isAdd: true,
      userForm: {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters(["roleData", "userData"]),
  },
  mounted() {
    this.getUserDataAction(this.pageInfo);
    this.getRoleDataAction();
    this.getCount();
  },
  methods: {
    getChange(n) {
      // console.log(n)
      this.pageInfo.page = n;
      this.getUserDataAction(this.pageInfo);
    },
    getCount() {
      getUsercount().then((res) => {
        if (res.code == 200) {
          this.total = res.list[0].total;
          if (this.pageInfo.page != 1 && this.userData.length == 1) {
            this.pageInfo.page--;
          }
          this.getUserDataAction(this.pageInfo);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    roadd() {
      this.isAdd = true;
      this.dialogFormVisible = true;
    },
    edits(uid) {
      this.dialogFormVisible = true;
      this.isAdd = false;
      getUserinfo({ uid }).then((res) => {
        if (res.code == 200) {
          this.userForm = res.list;
          this.roid = uid;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    ...mapActions(["getRoleDataAction", "getUserDataAction"]),
    submits() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            getUseradd(this.userForm).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg);
                this.getCount();
                this.getUserDataAction(this.pageInfo);
                this.resetForm();
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            this.userForm.uid = this.roid;
            getUseredit(this.userForm).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg);
                this.getUserDataAction(this.pageInfo);
                this.resetForm();
              } else {
                this.$message.error(res.msg);
              }
            });
          }
        } else {
          this.$message.error("请输入必选项");
          return false;
        }
      });
    },
    cancels() {
      this.resetForm();
    },
    resetForm() {
      (this.userForm = {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1,
      }),
        (this.dialogFormVisible = false);
    },
    dels(uid) {
      getUserdelete({ uid }).then((res) => {
        if (res.code == 200) {
          this.getCount();
          this.getUserDataAction(this.pageInfo);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>
<style lang='stylus' scoped>
.add {
  float: left;
}
</style>