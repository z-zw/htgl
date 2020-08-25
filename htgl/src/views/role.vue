<template>
  <div>
    <el-button type="primary" @click="roadd">添加</el-button>
    <el-table :data="roleData" border style="width: 90%">
      <el-table-column prop="id" label="角色编号" width="150"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="150"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status ==1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="edits(scope.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="dels(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="isAdd?'添加角色':'修改角色'"
      :visible.sync="dialogFormVisible"
      center
      :before-close="resetForm"
    >
      <el-form :model="roleForm" ref="ruleForm" :rules="rules">
        <el-form-item prop="rolename" label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="roleForm.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="tableData"
            show-checkbox
            node-key="id"
            ref="tree"
            default-expand-all
            :props="defaultProps"
            :default-checked-keys="roleMenus"
            check-strictly
          ></el-tree>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="roleForm.status"
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
import { getRoleadd, getRoleinfo, getRoleedit, getRoledelete } from "../util";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      roleMenus: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "长度在 2 到 8 个字符",
            trigger: "blur",
          },
        ],
      },
      roid: 0,
      dialogFormVisible: false,
      isAdd: true,
      roleForm: {
        rolename: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters(["roleData", "tableData"]),
  },
  mounted() {
    this.gettableDataAction();
    this.getRoleDataAction();
  },
  methods: {
    roadd() {
      this.isAdd = true;
      this.dialogFormVisible = true;
    },
    edits(id) {
      this.dialogFormVisible = true;
      this.isAdd = false;
      getRoleinfo({ id }).then((res) => {
        if (res.code == 200) {
          this.roleForm = res.list;
          this.roleMenus = this.roleForm.menus
            ? this.roleForm.menus.split(",")
            : [];//字符串变数组
          this.roid = id;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    ...mapActions(["getRoleDataAction", "gettableDataAction"]),
    submits() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.roleForm.menus = this.$refs.tree.getCheckedKeys().join(",");
          if (this.isAdd) {
            getRoleadd(this.roleForm).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg);
                this.getRoleDataAction();
                this.resetForm();
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            this.roleForm.id = this.roid;
            getRoleedit(this.roleForm).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg);
                this.getRoleDataAction();
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
      (this.roleForm = {
        rolename: "",
        status: 1,
      }),
        this.$refs.tree.setCheckedKeys([]);
      // this.$refs["ruleForm"].resetFields();
      this.dialogFormVisible = false;
    },
    dels(id) {
      getRoledelete({ id }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.getRoleDataAction();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>
<style lang='stylus' scoped></style>