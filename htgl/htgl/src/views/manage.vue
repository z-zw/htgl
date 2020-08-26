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
    <el-table :data="goodsData" border style="width: 100%">
      <el-table-column  prop="id" label="商品编号"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" ></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="market_price" label="市场价格" ></el-table-column>
      <el-table-column label="图片" width="150">
        <template slot-scope="item">
          <div>
            <img class="uploadImg" :src="item.row.img? uploadHttp+item.row.img : ''" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="item">
          <el-tag v-if="item.row.isnew ==1" type="success">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="item">
          <el-tag v-if="item.row.ishot ==1" type="success">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
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
      width='64%'
      @opened="createEditor"
    >
      <el-form :model="goodsForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="first_cateid" label="一级分类：" :label-width="formLabelWidth">
          <el-select v-model="goodsForm.first_cateid" @change="changeFristId()">
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
          <el-select v-model="goodsForm.second_cateid">
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
        <el-form-item prop="goodsname" label="商品名称：" :label-width="formLabelWidth">
          <el-input v-model="goodsForm.goodsname"></el-input>
        </el-form-item>
        <el-form-item prop="price" label="商品价格：" :label-width="formLabelWidth">
          <el-input v-model="goodsForm.price"></el-input>
        </el-form-item>
        <el-form-item prop="market_price" label="市场价格：" :label-width="formLabelWidth">
          <el-input v-model="goodsForm.market_price"></el-input>
        </el-form-item>
        <el-form-item prop="img" label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :on-change="changeInfo"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item prop="specsid" label="商品规格：" :label-width="formLabelWidth">
          <el-select v-model="goodsForm.specsid" @change="changeSpecsId()">
            <option value label="请选择" disabled></option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in specsData"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="specsattr" label="规格属性：" :label-width="formLabelWidth">
          <!-- multiple 是否多选 -->
          <el-select v-model="goodsForm.specsattr" multiple>
            <option value label="请选择" disabled></option>
            <!-- 动态数据 -->
            <el-option v-for="item in specsAttrs" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="goodsForm.isnew" :label="1">是</el-radio>
          <el-radio v-model="goodsForm.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="goodsForm.ishot" :label="1">是</el-radio>
          <el-radio v-model="goodsForm.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="goodsForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <div id="editor"></div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" :label-width="formLabelWidth">
        <el-button @click="cancels">取 消</el-button>
        <el-button type="primary" @click="submits">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {getGoodsAdd, getGoodsInfo, getGoodsEdit ,getGoodsDel,getGoodsCount} from "../util";
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      editor: null, //富文本标识
      secondCate: [], //二级分类
      specsAttrs: [], //规格属性
      //图片的一些配置
      imgUrl: "", //长传图片的地址
      fileList: [], //文件上传列表数组
      dialogVisible: false, //是否打开图片弹框
      dialogImageUrl: "", //图片地址
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
        first_cateid: [
          //代表加红色星标
          { required: true, message: "请选择一级分类", trigger: "change" },
        ],
        second_cateid: [
          //代表加红色星标
          { required: true, message: "请选择二级分类", trigger: "change" },
        ],
        goodsname: [
          //代表加红色星标
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        price: [
          //代表加红色星标
          { required: true, message: "请输入商品价格", trigger: "blur" },
        ],
        market_price: [
          //代表加红色星标
          { required: true, message: "请输入市场价格", trigger: "blur" },
        ],
        specsid: [
          //代表加红色星标
          { required: true, message: "请选择商品规格", trigger: "change" },
        ],
        specsattr: [
          //代表加红色星标
          { required: true, message: "请选择规格属性", trigger: "blur" },
        ],
      },
      roid: 0,
      dialogFormVisible: false,
      isAdd: true,
       goodsForm: {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品管理编号
        specsattr: "", //商品管理属性
        isnew: 1, //是否新品     1-是 2-否
        ishot: 1, //是否热卖推荐 1-是 2-否
        status: 1, //1正常2禁用
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters(["specsData","goodsData","cateData"]),
  },
  mounted() {
    this.getCateDataAction()
    this.getGoodsDataAction(this.pageInfo)
    this.getSpecsDataAction();
    this.getCount();
  },
  methods: {
     //创建富文本编辑器
    createEditor() {
      //创建打开富文本编辑器
      //实例化
      this.editor = new E("#editor");
      //创建
      this.editor.create();
      //描述信息赋值
      this.editor.txt.html(this.goodsForm.description)
    },
    changeFristId(n) {
      //超找你选择的id在数组中匹配出的索引下标
      let index = this.cateData.findIndex(
        (item) => item.id == this.goodsForm.first_cateid
      );
      this.secondCate = this.cateData[index].children;
      //如果参数n 不是true 清空双向数据绑定
      if (!n) {
        this.goodsForm.second_cateid = "";
      }
    },
    //选择规格触发规格属性
    changeSpecsId(n) {
      let index = this.specsData.findIndex(
        (item) => item.id == this.goodsForm.specsid
      );
      this.specsAttrs = this.specsData[index].attrs;
      // console.log(this.specsAttrs, "规格属性");
      if (!n) {
        this.goodsForm.specsattr = [];
      }
    },
     //图片移除时候的钩子函数
    handleRemove(file, fileList) {
      // console.log(file, fileList, "移除触发的钩子函数");
    },
    //查看图片触发的钩子函数
    handlePreview(file) {
      // console.log(file, "点击查看时候回调的钩子函数");
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //文件超出选择之后的提示
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //当上传文件图片发生变化的时候触发的函数
    changeInfo(file) {
      // console.log(file.raw, "文件详情");
      this.imgUrl = file.raw;
    },
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
      this.getGoodsDataAction(this.pageInfo)
    },
    getCount() {
      getGoodsCount().then((res) => {
        if (res.code == 200) {
          this.total = res.list[0].total;
          // console.log(this.total)
          if (this.pageInfo.page != 1 && this.specsData.length == 1) {
            this.pageInfo.page--;
          }
          this.getGoodsDataAction(this.pageInfo)
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
      getGoodsInfo({ id }).then((res) => {
        if (res.code == 200) {
          this.goodsForm = res.list;
          //数据二次转化==规格属性
          console.log(this.goodsForm)
         this.goodsForm.specsattr = this.goodsForm.specsattr
            ? this.goodsForm.specsattr.split(",")
            : [];
          //对图片进行二次转化
          this.fileList = this.goodsForm.img
            ? [{ url: `${this.uploadHttp}${this.goodsForm.img}` }]
            : [];
          //数据二次转化 电泳一级的change事件。不让二级置空
          this.changeFristId(true);
          this.changeSpecsId(true);
          this.roid = id;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    ...mapActions(["getSpecsDataAction","getGoodsDataAction",'getCateDataAction']),
    submits() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.goodsForm.specsattr = this.goodsForm.specsattr
            ? this.goodsForm.specsattr.join(",")
            : "";
          //商品描述
          this.goodsForm.description = this.editor.txt.html();
          //调用FormData
          let data = this.goodsForm;
          let file = new FormData();
          for(let i in data){
            file.append(i,data[i])
          };
          file.append("img",this.imgUrl);
          if (this.isAdd) {
            getGoodsAdd(file).then((res) => {
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
            getGoodsEdit(file).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg);
                this.getGoodsDataAction(this.pageInfo)
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
      this.goodsForm= {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品管理编号
        specsattr: "", //商品管理属性
        isnew: 1, //是否新品     1-是 2-否
        ishot: 1, //是否热卖推荐 1-是 2-否
        status: 1, //1正常2禁用
      };
      this.specsArr = [
        {
          value: "",
        }];
        //清空富文本编辑器
      this.editor.txt.html('');
      //重置文件上传列表
      this.fileList = [];
      this.dialogFormVisible = false;
      this.imgUrl=''
      this.$refs['ruleForm'].clearValidate(this.rules)
    },
    dels(id) {
      this.$confirm("确定要删除该数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getGoodsDel({ id }).then((res) => {
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
.uploadImg{
  width:150px;
  height:150px

}
</style>