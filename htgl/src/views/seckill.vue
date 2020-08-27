<template>
  <div>
    <el-button type="primary" @click="roadd">添加</el-button>
    <el-table :data="seckData" border style="width: 90%">
      <el-table-column prop="title" label="活动名称" width="180"></el-table-column>
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
      :title="isAdd?'添加活动':'修改活动'"
      :visible.sync="dialogFormVisible"
      center
      :before-close="resetForm"
    >
      <el-form :model="seckForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="title" label="活动名称：" :label-width="formLabelWidth">
          <el-input v-model="seckForm.title"></el-input>
        </el-form-item>
        <el-form-item label="活动期限：" :label-width="formLabelWidth">
          <el-date-picker
            v-model="timer"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="first_cateid" label="一级分类：" :label-width="formLabelWidth">
          <el-select v-model="seckForm.first_cateid" @change="changeFristId()">
            <option value label disabled>---请选择---</option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in cateData"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="second_cateid" label="二级分类：" :label-width="formLabelWidth">
          <el-select v-model="seckForm.second_cateid" @change="changeGoods()">
            <option value label="请选择" disabled></option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="goodsid" label="商品：" :label-width="formLabelWidth">
          <el-select v-model="seckForm.goodsid">
            <option value label="请选择" disabled></option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="seckForm.status"
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
import { getSeckadd, getSeckinfo, getSeckedit, getSeckdelete,getGoodsList } from "../util";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
       timer:"",
      defaultProps: {
        children: "children",
        label: "title",
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
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
      seckForm: {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1,
      },
      secondCate: [], //二级分类
      goodsArr: [], //商品数组
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters(["seckData","cateData"]),
  },
  mounted() {
    this.getSeckDataAction();
    this.getCateDataAction()
  },
  methods: {
     //选择一级分类触发事件
    changeFristId(n) {
      //超找你选择的id在数组中匹配出的索引下标
      let index = this.cateData.findIndex(
        (item) => item.id == this.seckForm.first_cateid
      );
      this.secondCate = this.cateData[index].children;
      //如果参数n 不是true 清空双向数据绑定（切断的是一级和二级还有三级的联动）
      if (!n) {
        this.seckForm.second_cateid = "";
        this.seckForm.goodsid = "";
      }
    },
    //选择二级之联动渲染渲染商品列表
    changeGoods(n) {
      getGoodsList({
        fid: this.seckForm.first_cateid,
        sid: this.seckForm.second_cateid,
      }).then((res) => {
        if (res.code === 200) {
          this.goodsArr = res.list;
        }
      });
      //如果参数n 不是true 清空双向数据绑定(切断的是二级和三级的联动)
      if (!n) {
        this.seckForm.goodsid = "";
      }
    },
    roadd() {
      this.isAdd = true;
      this.dialogFormVisible = true;
    },
    edits(id) {
      this.dialogFormVisible = true;
      this.isAdd = false;
      getSeckinfo({ id }).then((res) => {
        if (res.code == 200) {
          this.seckForm = res.list;
          this.timer = [
            new Date(parseFloat(this.seckForm.begintime)),
            new Date(parseFloat(this.seckForm.endtime)),
          ];
          this.changeFristId(true);
          this.changeGoods(true);
          this.roid = id;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    ...mapActions(["getSeckDataAction","getCateDataAction"]),
    submits() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.seckForm.begintime = new Date(this.timer[0]).getTime();
          //结束时间
          this.seckForm.endtime = new Date(this.timer[1]).getTime();
          if (this.isAdd) {
            getSeckadd(this.seckForm).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg);
                this.getSeckDataAction();
                this.resetForm();
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            this.seckForm.id = this.roid;
            getSeckedit(this.seckForm).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg);
                this.getSeckDataAction();
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
      this.seckForm = {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1,
      };
      this.timer = [];
      this.dialogFormVisible = false;
    },
    dels(id) {
      getSeckdelete({ id }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.getSeckDataAction();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>
<style lang='stylus' scoped></style>