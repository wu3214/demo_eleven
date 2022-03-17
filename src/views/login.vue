<template>
    <div class="login-wrap">
        <h3 style='margin-left:40%'>登录</h3>
        <el-form ref="form" :model="form" class="login-box" :rules="rules">
      <el-form-item label="账号" prop="name">
        <el-input
          type="text"
          v-model="form.name"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form',form)" style='margin-left:10%'>登录</el-button>
        <el-button type="warning" @click="clear()" style='margin-left:10%'>清空</el-button>
        <el-button type="info" @click="register()" style='margin-left:10%'>注册</el-button>

        <!-- <el-button type="primary" @click="onSubmit(form)">注册</el-button> -->
      </el-form-item>
    </el-form>
    </div>
</template>

<script>
export default {
    name: 'Ele8Login',

     data() {
    return {
      form: {
        name: "",
        password: "",
      },
      yanzheng:false,
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
            { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
            { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
      },
    };
  },

  mounted() {},

  methods: {
    submitForm(formName,form) {
      console.log('form',form)
      this.$refs[formName].validate((valid) => {
        if (valid) { 
                  const service = axios.create({
              baseURL: "http://172.22.217.134:8080", // api的base_url
              timeout: 5000, // request timeout
            });
            //使用这个实例发送请求,返回一个promise对象
            var requestOne = service.request({
              url: "/api/login",
              method: "get",
              params: {
                formname:form.name,
                formpw:form.password
                
                // id // id:id
              },
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                  "Origin, X-Requested-With, Content-Type, Accept",
                "Content-Type": "application/json",
                "Accept-Language": "zh-cn",
              },
            });
            //发送成功的回调
            requestOne.then(res => {
              console.log('res',res)
              console.log('res',res.data)

              this.yanzheng=res.data;
              console.log('this.yanzheng',this.yanzheng)
              if(this.yanzheng==true){
                this.$router.push("/firstpage");
              }else{
                return
              }
              
            });
            requestOne.catch((err) => {
              console.log("请求错误", err);
              
            });

          // this.$router.push("/firstpage");
        } else {
          this.$message({
          message: 'error submit!!',
          type: 'warning'
        });
          return false;
        }
      });
    },
    clear(){
        this.form.name='',
        this.form.password=''
    },
    register(){
          this.$router.push("/register");
    }
  },
};
</script>

<style lang="scss" scoped>

</style>