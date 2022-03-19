<template>
  <div class="top-container">
    <div class="left-box">
      <el-button round @click="change1(0)"> 音乐</el-button>
      <!-- @mouseleave="leave() -->
      <el-button round @click="change1(1)"> 视频</el-button>
      <el-button round @click="change1(2)"> 修改樣式</el-button>
    </div>
    <div class="middle-box">
      <div class="el-input el-input--small el-input--prefix">
        <!-- 搜索框 -->
        <input
          type="text"
          autocomplete="off"
          placeholder="搜索"
          class="el-input__inner"
          v-model="inputValue"
          @keyup.enter="toResult"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
    </div>
    <div class="left-box">
      <!-- <el-button icon="el-icon-user-solid" circle @click="tologin"></el-button> -->
      <el-dropdown @command="chufa">
        <el-button round icon="el-icon-user-solid">
          登录 / 注册<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a" >登录</el-dropdown-item>
          <el-dropdown-item command="b" >退出登录</el-dropdown-item>
          <el-dropdown-item command="c" > 注册</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      // 输入的内容
      inputValue: "",
      changeValue: "",
      drawer: false,
    };
  },
  methods: {
    // leave(){

    // },
    chufa(value){
      if(value=='a'){
        console.log('a');
        this.$router.push("/login");

      }else if(value=='b'){
        localStorage.removeItem("Flag");
        this.$router.push("/login");
        console.log('b');
      }else if(value=='c'){
        this.$router.push("/register");
        console.log('c');
      }
    },
    tologin() {
      console.log('tologin');
      this.$router.push("/login");
    },
    outlogin() {
      console.log('outlogin');
      localStorage.removeItem("Flag");
      // this.$router.push("/login");
    },
    toregister() {
      console.log('toregister');
      this.$router.push("/register");
    },
    toResult() {
      // 非空判断
      if (this.inputValue == "") {
        // 提示用户
        this.$message.warning("请输入内容");
      } else {
        // 去搜索页 携带数据
        this.$router.push("/result?q=" + this.inputValue);
      }
    },
    change(a) {
      // console.log(a)
    },
    change1(a) {
      this.$emit("show", a);
      if (a == 0) {
        this.$router.push("/discovery");
      } else if (a == 1) {
        // console.log('shipin')
        this.$router.push("/homePage");
      }
    },
    changeYanshi(b) {
      this.$emit("changeYs", b);
      //修改主题样式
      //  document.getElementById('theme').href = './assets/heiseBJ.css'
      // document.getElementById('app').setAttribute('class', 'heise')
    },
  },
};
</script>

<style scoped></style>
