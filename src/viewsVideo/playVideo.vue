<template>
  <div class="div1">
    <div class="search">
      <input type="text" v-model="inputValue" />
      <button type="button" @click="input_parse()">播放</button>
      <button type="button" @click="reset()">清空</button>
    </div>

    <iframe
      frameborder="0"
      allowfullscreen
      :src="src1"
      allowtransparency
    ></iframe>
    <!-- <p>在搜索栏输入地址后，按回车键即可解析，按Esc可以清空地址栏</p> -->
    <p>{{src1}}</p>
    

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Ele8Playvideo",

  data() {
    return {
      inputValue: "",
      a:1,
      src1:"",
      // url: "",
      srcyuan:"",
      parse_url: "https://okjx.cc/?url=",
      // ImdbId:0
    };
  },

  mounted() {
    
  },
  created() {
    const ImdbId = this.$route.query.id;
    console.log("ImdbId", ImdbId);
    const service = axios.create({
      baseURL: "http://172.22.217.134:8086", // api的base_url
      timeout: 5000, // request timeout
    });
    //使用这个实例发送请求,返回一个promise对象
    var requestOne = service.request({
      url: "/PlayViewapi/getUrl",
      method: "get",
      params: {
        // id
        id: ImdbId,
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
      console.log(2);
      console.log("响应数据1：", res);
      //   console.log("响应数据2：", res.data);
      //   console.log("typeof响应数据2：", typeof res.data);
      // this.src = res.data[0].url;
      this.srcyuan = res.data[0].url;
      // this.src = this.parse_url+this.srcyuan; 
      this.inputValue = this.srcyuan; 
      
      // console.log("src", this.src);
    });
    requestOne.catch((err) => {
      console.log("请求错误", err);
    });
  },
  watch: {
    src1: function () {
      console('触发SRC')
      // 通过地址栏解析
    // 提取?后面的url的值，并进行解析动作,如果不存在，则不进行解析
    // 获取网址的url
    let tmp = location.search;
    console.log("tmp", tmp);
    // 提取url=后面的网址
    let href = tmp.substr(tmp.indexOf("?"));
    console.log("href", href);

    let reg = "url=([^&]*)";
    console.log("reg", reg);

    let url = href.match(reg)[0];
    console.log("url", url);
      if (url !== null && url.length > 4) {
        url = url.substr(url.indexOf("url=") + 4);
      console.log('url.substr(url.indexOf("url=") + 4); url',url);

        // 解析该网址
        location_parse(url);
      }
    },
  },
  methods:{
    // play1(){
    //   console.log('play1')
    //   // console.log('play1 this.src1',this.src1)

    // },
    // play:function(url){
    //   this.src1 = 456
    //   this.a=3

    //   console.log('play url',url)
    //   console.log('this.src1',this.src1)
    //   this.$options.methods.play1()
    // },
    
    input_parse() {
      this.a=2
      let urll = this.parse_url + this.inputValue
      // 播放视频
      console.log('urll',urll)
      this.src1=urll
      // this.$options.methods.play(urll)
    },
    // 当点击清空时
    reset() {
      // 清空输入框
      this.inputValue = ""
    },

    location_parse(url) {
      // 拼接成合适的url
      console.log('location_parse url',url)

      let tmp = this.parse_url + url
      console.log('tmp',tmp)

      // 播放视频
      // this.$options.methods.play(tmp)
      this.src1=tmp
      // 把url填入搜索栏中
      this.inputValue = url
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  background-color: #505050;
  font-size: 15px;
}
/* 设置搜索框，让其垂直居中 */
.search {
  margin-top: 50px;
  text-align: center;
}
.search input {
  width: 500px;
  height: 24px;
  outline: none;
}
.search button {
  vertical-align: center;
}
/* 设置播放器的宽高和背景色 */
iframe {
  display: block;
  width: 1000px;
  height: 500px;
  margin: 30px auto;
  background-color: #dddddd;
}

p {
  color: #000;
  text-align: center;
}
</style>