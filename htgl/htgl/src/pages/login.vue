<template>
<div class="login">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="login_form">
  <el-form-item label="账号" prop="username">
    <el-input v-model="ruleForm.username" clearable></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="ruleForm.password" autocomplete="off" clearable show-password></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
import {getUserlogin} from '../util'
export default {
components:{
},
data(){
   return {
       ruleForm: {
          username: "",
          password: ""
        },
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符',  trigger: 'blur' }
          ],
        }
   }
},
methods: {
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            getUserlogin(this.ruleForm).then(res=>{
            if(res.code===200){
              sessionStorage.setItem('userInfo',JSON.stringify(res.list))
              this.$router.push('/index')
            }else{
              this.$message.error(res.msg);
            }
          })
          } else {
            this.$message.error('请输入必填项')
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
},
}
</script>
<style lang='stylus' scoped>
@import '../stylus/index.styl';

.login {
  width: 100vw;
  height: 100vh;
  background: $oneBgColor;

  .login_form {
    position: absolute;
    background: $twoBgColor;
    left: 50%;
    top: 50%;
    margin: -150px 0 0 -150px;
    padding: 40px 10px;
    border-radius: 20px;
    width: 430px;
    height: 200px;

    .el-input {
      width: 80%;
    }
  }
}
</style>