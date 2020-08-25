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
    <el-table :data="specsData" border style="width: 90%">
      <el-table-column prop="id" label="规格编号" width="150"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="150"></el-table-column>
      <el-table-column prop="attrs" label="规格属性" width="150">
        <template slot-scope="item">
          <el-tag v-for='attr in item.row.attrs' type='info' :key='attr'>{{attr}}</el-tag>
        </template>
      </el-table-column>
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
      :title="isAdd?'添加商品规格':'修改商品规格'"
      :visible.sync="dialogFormVisible"
      center
      :before-close="resetForm"
    >
      <el-form :model="specsForm" ref="ruleForm" :rules="rules">
        <el-form-item prop="specsname" label="规格名称：" :label-width="formLabelWidth">
          <el-input v-model="specsForm.specsname"></el-input>
        </el-form-item>

        <el-form-item
          :label-width="formLabelWidth"
          v-for="(item, index) in specsArr"
          label="规格属性:"
          :key="index"
        >
          <el-input style="width:60%" v-model="item.value"></el-input>
          <el-button v-if="index==0" @click="addSpecs(item)" type="primary">新增规格属性</el-button>
          <el-button v-else @click="delSpecs(item)">删除</el-button>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="specsForm.status"
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
  getSpecsadd,
  getSpecsinfo,
  getSpecsedit,
  getSpecsdelete,
  getSpecscount,
} from "../util";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      specsArr:[
        {
          value: "",
        },
      ],
      total: 0,
      pageInfo: {
        size: 2,
        page: 1,
      },
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
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
      specsForm: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters(["specsData"]),
  },
  mounted() {
    this.getSpecsDataAction(this.pageInfo);
    this.getCount();
  },
  methods: {
    addSpecs(item) {
        if(this.specsArr.length<6){
          this.specsArr.push({
          value: '',
          key: Date.now()
        });
        }else{
          this.$message.warning('最多添加5个')
        }
      },
      delSpecs(item) {
        var index = this.specsArr.indexOf(item)
        if (index !== -1) {
          this.specsArr.splice(index, 1)
        }
      },
    getChange(n) {
      this.pageInfo.page = n;
      this.getSpecsDataAction(this.pageInfo);
    },
    getCount() {
      getSpecscount().then((res) => {
        if (res.code == 200) {
          this.total = res.list[0].total;
          console.log(this.total)
          if (this.pageInfo.page != 1 && this.specsData.length == 1) {
            this.pageInfo.page--;
          }
          this.getSpecsDataAction(this.pageInfo);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    roadd() {
      this.isAdd = true;
      this.dialogFormVisible = true;
    },
    edits(id) {
      this.dialogFormVisible = true;
      this.isAdd = false;
      getSpecsinfo({ id }).then((res) => {
        if (res.code == 200) {
          this.specsForm = res.list[0];
          //数据二次转化==规格属性
          this.specsForm.attrs.map((item, index) => {
            console.log(item, "每一项");
            if (index == 0) {
              this.specsArr[0].value = item;
            } else {
              this.specsArr.push({
                value: item,
              });
            }
          });
          this.roid = id;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    ...mapActions(["getSpecsDataAction"]),
    submits() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
           let arr = this.specsArr.map((item) => item.value);
          this.specsForm.attrs = arr ? arr.join(",") : "";
          if (this.isAdd) {
            getSpecsadd(this.specsForm).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg);
                this.getCount();
                // this.getSpecsDataAction(this.pageInfo);
                this.resetForm();
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            this.specsForm.id = this.roid;
            getSpecsedit(this.specsForm).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg);
                this.getSpecsDataAction(this.pageInfo);
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
      this.specsForm = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.specsArr = [
        {
          value: "",
        },],
      this.dialogFormVisible = false;
    },
    dels(id) {
      this.$confirm("确定要删除该数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getSpecsdelete({ id }).then((res) => {
            if (res.code == 200) {
              this.getCount();
              this.$message.success(res.msg);
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
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