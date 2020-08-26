<template>
  <div>
    <el-button type="primary" @click="muadd">添加</el-button>
    <el-table :data="tableData" border style="width: 90%" row-key='id' default-expand-all :tree-props="{children: 'children'}">
      <el-table-column prop="id" label="菜单编号" width="formtabelWidth"></el-table-column>
      <el-table-column prop="title" label="菜单名称" width="formtabelWidth"></el-table-column>
      <el-table-column prop="pid" label="上级菜单" width="formLabelWidth"></el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="formtabelWidth"></el-table-column>
      <el-table-column prop="url" label="菜单地址" width="formtabelWidth"></el-table-column>
      <el-table-column prop="status" label="状态" width="formLabelWidth">
        <template slot-scope="item">
          <el-tag v-if="item.row.status ==1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="formLabelWidth">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="edits(scope.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deletes(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :before-close="resetForm"
      :title="isAdd?'添加菜单':'修改菜单'"
      :visible.sync="dialogFormVisible"
      center
    >
      <el-form :model="menuForm" ref="ruleForm" :rules="rules">
        <el-form-item prop="title" label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="menuForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pid" label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="menuForm.pid" placeholder="请选择上级菜单">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in tableData"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="menuForm.type" :label="1">目录</el-radio>
          <el-radio v-model="menuForm.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item
          v-if="menuForm.type==1"
          prop="icon"
          label="菜单图标"
          :label-width="formLabelWidth"
        >
          <el-input v-model="menuForm.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="menuForm.type==2" prop="url" label="菜单地址" :label-width="formLabelWidth">
          <el-input v-model="menuForm.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="menuForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancels">取 消</el-button>
        <el-button type="primary" @click="submits('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getMenuadd, getMenuinfo, getMenuedit ,getMenudelete} from "../util";
import {mapGetters,mapActions} from 'vuex'
export default {
  components: {},
  data() {
    return {
      muid: 0,
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        pid: [
          { required: true, message: "请选择上级菜单目录", trigger: "change" },
        ],
      },
      isAdd: true,
      dialogFormVisible: false,
      menuForm: {
        title: "", //标题
        pid: 0, //上级分类编号
        type: 1, //类型1目录2菜单
        status: 1, //状态1正常2禁用
        url: "",
        icon: "",
      },
      formLabelWidth: "120px",
      formtabelWidth: 150,
    };
  },
  computed: {
    ...mapGetters(['tableData'])
  },
  mounted() {
    this.gettableDataAction();
  },
  methods: {
    muadd() {
      this.isAdd = true;
      this.dialogFormVisible = true;
    },
    ...mapActions(['gettableDataAction']),
    submits(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            getMenuadd(this.menuForm).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg);
                this.gettableDataAction();
                this.resetForm();
              }else{
                this.$message.error(res.msg);
              }
            });
          } else {
            this.menuForm.id = this.muid;
            getMenuedit(this.menuForm).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg);
                this.gettableDataAction();
                this.resetForm();
              }else{
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
      this.resetForm("ruleForm");
      this.dialogFormVisible = false;
    },
    resetForm() {
      // console.log(this.$refs[formName],1111)
      // debugger
      this.$refs["ruleForm"].resetFields();
      this.dialogFormVisible = false;
    },
    edits(id) {
      this.isAdd = false;
      this.dialogFormVisible = true;
      getMenuinfo({ id }).then((res) => (this.menuForm = res.list));
      this.muid = id;
    },
    deletes(id){
      getMenudelete({id}).then(res=>{
        if(res.code==200){
          this.$message.success(res.msg);
           this.gettableDataAction();
        }else{
                this.$message.error(res.msg);
              }
      })
    }
  },
};
</script>
<style lang='stylus' scoped></style>