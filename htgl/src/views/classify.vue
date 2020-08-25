<template>
  <div>
    <el-button type="primary" @click="roadd">添加</el-button>
    <el-table :data="cateData" border style="width: 90%" row-key='id' default-expand-all :tree-props="{children: 'children'}">
      <el-table-column prop="id" label="分类编号" width="150"></el-table-column>
      <el-table-column prop="catename" label="分类名称" width="150"></el-table-column>
      <el-table-column prop="img" label="图片" width="150">
         <template slot-scope="scorp">
            <div>
               <img :src="scorp.row.img?uploadHttp+scorp.row.img:''" alt="" class="imgss">
            </div>
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
      :title="isAdd?'添加商品分类':'修改商品分类'"
      :visible.sync="dialogFormVisible"
      center
      :before-close="resetForm"
    >
      <el-form :model="cateForm" ref="ruleForm" :rules="rules">
        <el-form-item prop="pid" label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="cateForm.pid" placeholder="请选择上级菜单" :disabled="isAdd?false:true">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in cateData"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="catename" label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="cateForm.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="img" label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :file-list="fileLists"
            :limit="1"
            :on-exceed="handleExceed"
            :on-change = 'changeInfo'
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="cateForm.status"
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
import { getCateadd, getCateinfo, getCateedit, getCatedelete } from "../util";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
       imgUrl:"",
       fileLists:[],
      dialogImageUrl: '',
      dialogVisible: false,
      roleMenus: [],

      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          {
            min: 2,
            max: 12,
            message: "长度在 2 到 12 个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请选择商品分类", trigger: "change" }],
      },
      roid: 0,
      dialogFormVisible: false,
      isAdd: true,
      cateForm: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters(["cateData"]),
  },
  mounted() {
    this.getCateDataAction();
  },
  methods: {
    changeInfo(file){
      this.imgUrl = file.raw
    },
     handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    roadd() {
      this.isAdd = true;
      this.dialogFormVisible = true;
    },
    edits(id) {
      this.dialogFormVisible = true;
      this.isAdd = false;
      this.roid = id;
      
      getCateinfo({ id }).then((res) => {
        if (res.code == 200) {
          // this.$refs.sele.setAttribute('disabled',true)
          this.cateForm = res.list;
          this.fileLists = this.cateForm.img ? [{url:`${this.uploadHttp}${this.cateForm.img}`}] :[];
          
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    ...mapActions(["getCateDataAction"]),
    submits() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
           
        let data = this.cateForm
        let file = new FormData()
        for(let i in data){
          file.append(i,data[i])
        }
        //转化
        file.append("img",this.imgUrl)
          if (this.isAdd) {
            getCateadd(file).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg);
                this.getCateDataAction();
                this.resetForm();
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            file.append('id',this.roid);
            getCateedit(file).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg);
                this.getCateDataAction();
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
      this.cateForm={
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
      this.fileLists =[];
      this.dialogFormVisible = false;
    },
    dels(id) {
      this.$confirm("确定要删除该数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getCatedelete({ id }).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              //重新调取列表接口
              this.getCateDataAction();
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
.imgss{
  width:100px
}
</style>