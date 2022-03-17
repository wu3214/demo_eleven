<template>
    <div class="register-wrap">
        <h3 style='margin-left:40%'>注册</h3>
        <el-form ref="form" :model="form" class="login-box" :rules="rules">
      <el-form-item label="账号" prop="name">
        <el-input
          type="text"
          v-model="form.name"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input
          type="tel"
          v-model="form.phone"
          placeholder="请输入手机号码"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          type="email"
          v-model="form.email"
          placeholder="请输入邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
       <el-form-item label="请确认密码" prop="password1">
        <el-input
          type="password"
          v-model="form.password1"
          placeholder="请再次输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form',form)" style='margin-left:30%'>注册</el-button></el-button>
        <el-button type="warning" @click="clear()" style='margin-left:10%'>清空</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>

<script>
export default {
  name: "Ele8Register",

  data() {
    // 密码验证
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码1"));
      } else {
        if (this.form.password1 !== "") {
          this.$refs.form.validateField('password1');
        }
        callback();
      }
    };
    // 再次确认密码验证
    var validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码1"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 手机号码验证
    var validatePhone = (rule, value, callback) => {
      var reg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/;
      if (value === "") {
        callback(new Error("请输入手机号1"));
      } else if (!reg.test(value)) {
        callback(new Error("手机号码格式不正确!"));
      } else {
        callback();
      }
    };

    return {
      form: {
        name: "",
        email: "",
        phone: "",
        password: "",
        password1: "",
      },
      yanzheng: false,
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮件账号", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ], 
        password:[{validator: validatePass, trigger: 'blur'}],
        password1:[{validator: validateCheckPass, trigger: 'blur'}],
        phone:[{validator: validatePhone, trigger: 'blur'}],
      },
    };
  },

  mounted() {},

  methods: {
    submitForm(formName, form) {
      console.log("form", form);
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
              formname: form.name,
              formpw: form.password,

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
          requestOne.then((res) => {
            console.log("res", res);
            console.log("res", res.data);

            this.yanzheng = res.data;
            console.log("this.yanzheng", this.yanzheng);
            if (this.yanzheng == true) {
              this.$router.push("/firstpage");
            } else {
              return;
            }
          });
          requestOne.catch((err) => {
            console.log("请求错误", err);
          });

          // this.$router.push("/firstpage");
        } else {
          this.$message({
            message: "error submit!!",
            type: "warning",
          });
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>