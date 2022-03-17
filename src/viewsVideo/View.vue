<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <!-- 封面 -->
        <img :src="viewData.data[0].poster" alt="" />
      </div>
      <div class="info-wrap">
        <!-- 名字 -->
        <p class="title">{{ viewData.data[0].name }}&#12288({{viewData.alias}})</p>
        <div class="author-wrap">
          <!-- 头像 -->
          <!-- <img class="avatar" :src="viewData.data[0].poster" alt="" /> -->
          <span class="name">主演：{{ viewData.actor[0].data[0].name }} / {{ viewData.actor[1].data[0].name }}</span>
          <br/>
          <span class="name">编剧导演：{{ viewData.writer[0].data[0].name }} / {{ viewData.writer[1].data[0].name }}</span>
          <br/>
          <span class="time">上映时间：{{ viewData.dateReleased }} </span> 
        </div>

        <!-- <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div> -->
        <!-- <div class="tag-wrap">
          <span class="title">标签:</span>

          <ul>
            <li v-for="(item, index) in viewData.tags" :key="index">
              {{ item }}
            </li>
          </ul>
        </div> -->
        <div class="desc-wrap">
          <span class="title">简介:</span>
      
          <span class="desc">
            {{ viewData.data[0].description }}
          </span>
        </div>
      </div>
    </div>
<br>
    <!-- 解析接口 -->
    <div>
      <h2>播放</h2>
      <br>
        <el-button @click="InterfacePaly1">接口1</el-button>
         <!-- <el-button @click="InterfacePaly2">接口2</el-button>
          <el-button @click="InterfacePaly3">接口3</el-button>
           <el-button @click="InterfacePaly4">接口4</el-button>
            <el-button @click="InterfacePaly5">接口5</el-button> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Ele8View",

  data() {
    return {
      id: 123,
      idIdmb:0,
      viewData:{},
    };
  },

  mounted() {},

  methods: {
    InterfacePaly1(){
      console.log('InterfacePaly1')
      this.$router.push(`/playVideo?id=${this.idIdmb}`)

    },
    InterfacePaly2(){
      console.log('InterfacePaly2')
    }

  },
  created() {
    const id = this.$route.query.id;
    this.id = id;

    const service = axios.create({
      baseURL: "http://172.22.217.134:8086", // api的base_url
      //   baseURL: "http://localhost:8086/", // api的base_url
      cache: false,
      timeout: 5000, // request timeout
    });
    //使用这个实例发送请求,返回一个promise对象
    var requestOne = service.request({
      // http://apiv2.vmovier.com/api/post/getPostInCate?cateid=0&p=1
      // https://api.wmdb.tv/api/v1/top?type=Imdb&skip=0&limit=10&lang=Cn
      // https://api.douban.com/v2/movie/subject/26942674
      // https://api.wmdb.tv/movie/api?id=doubanid
      url: "/Viewapi/movie/api",
      method: "get",
      cache: false,
      params: {
        // formname:form.name,
        // formpw:form.password
        id,
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
      console.log("typeofres",typeof  res);

        console.log('resdata',res.data)
      // console.log(res.data)
      this.viewData = res.data;
      this.idIdmb=res.data.imdbId
    });
    requestOne.catch((err) => {
      console.log("请求错误", err);
    });

    //         axios({
    //     // url: 'https://www.bilibili.com/index/ding.json',
    //     // url:'http://apiv2.vmovier.com/api/post/getPostInCate?cateid=0&p=1',
    //     url: 'https://api.douban.com/v2/movie/subject/26942674',
    //     // url: "'http://api.bilibili.com/x/web-interface/archive/related' --data-urlencode 'aid=7'",
    //     // url: 'https://www.https://api.bilibili.com/x/web-show/res/locs.com/index/ding.json',
    //     method: 'get'
    //   }).then(res => {
    //     console.log(res)
    //     console.log(res.data)
    //     this.list = res.data

    //   })
  },
};
</script>

<style lang="scss" scoped>
</style>
