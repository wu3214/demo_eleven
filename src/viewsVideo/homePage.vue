<template>
    <div>
        <h1>shouye</h1>
        <div class="discovery-container">
            <!-- 轮播图 -->
            <!-- <el-carousel class="" :interval="4000" type="card">
            <el-carousel-item v-for="(item, index) in banners" :key="index">
                <img :src="item.imageUrl" alt="" />
            </el-carousel-item>
            </el-carousel> -->
            <!-- 经典电影 -->
            <div class="recommend">
            <h3 class="title">
                经典电影
            </h3>
            <div class="items">
                <div class="item" v-for="(item, index) in list" :key="index">
                <div class="img-wrap" @click="toView(item.doubanId)">
                    <div class="desc-wrap">
                    <span class="desc">豆瓣评分{{ item.doubanRating }}、IMD评分{{ item.imdbRating }}</span>
                    </div>
                    <!-- <img src="item.data[0].poster" alt="" /> 可以显示图片的-->
                    <img src="" alt="" />
                    <span class="iconfont icon-play"></span>
                </div>
                <p class="name">{{ item.alias }}</p>
                </div>
            </div>
            </div>
            <!-- 最新音乐 -->
            <div class="news">
            <h3 class="title">
                经典电视剧
            </h3>
            <div class="items">
                <div class="item" v-for="(item, index) in songs" :key="index">
                <div class="img-wrap">
                    <!-- 封面 -->
                    <img :src="item.picUrl" alt="" />
                    <span @click="playMusic(item.id)" class="iconfont icon-play"></span>
                </div>
                <div class="song-wrap">
                    <!-- 歌名 -->
                    <div class="song-name">{{ item.name }}</div>
                    <!-- 歌手名 -->
                    <div class="singer">{{ item.song.artists[0].name }}</div>
                </div>
                </div>
            </div>
            </div>
            <!-- 推荐MV -->
            <div class="mvs">
            <h3 class="title">热门动漫</h3>
            <div class="items">
                <div class="item" v-for="(item,index) in mvs" :key="index">
                <div class="img-wrap" @click="toMv(item.id)">
                    <img :src="item.picUrl" alt="" />
                    <span class="iconfont icon-play"></span>
                    <div class="num-wrap">
                    <div class="iconfont icon-play"></div>
                    <!-- 播放次数 -->
                    <div class="num">{{ item.playCount }}</div>
                    </div>
                </div>
                <div class="info-wrap">
                    <!-- mv名 -->
                    <div class="name">{{ item.name }}</div>
                    <!-- 歌手名 -->
                    <div class="singer">{{ item.artistName }}</div>
                </div>
                </div>

            </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Ele8Homepage',

    data() {
        return {
            list:[],
        };
    },

    mounted() {
        
    },
    methods:{
        toView(id){
            console.log('id',id)
            this.$router.push(`/View?id=${id}`)
        }
    },
    created(){
        console.log('已调用created')
         const service = axios.create({
            //   baseURL: "http://192.168.101.161:8086/", // api的base_url
              baseURL: "http://172.22.217.134:8086", // api的base_url

            //   baseURL: "http://localhost:8086/", // api的base_url
                cache: false,
              timeout: 5000, // request timeout
            });
            //使用这个实例发送请求,返回一个promise对象
            var requestOne = service.request({
                // http://apiv2.vmovier.com/api/post/getPostInCate?cateid=0&p=1
                // https://api.wmdb.tv/api/v1/top?type=Imdb&skip=0&limit=10&lang=Cn
              url: "/topMovieApi/v1/top?type=Imdb&skip=0&limit=10&lang=Cn",
              method: "get",
              cache: false,
              params: {
                // formname:form.name,
                // formpw:form.password
                
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
            //   console.log('res',res.data)
            // console.log(res.data)
           this.list = res.data
              
            });
            requestOne.catch((err) => {
              console.log("请求错误", err);
              
            });


    //     axios({
    //     // url: 'https://www.bilibili.com/index/ding.json',
    //     // url:'http://apiv2.vmovier.com/api/post/getPostInCate?cateid=0&p=1',
    //     url: 'https://api.wmdb.tv/api/v1/top?type=Imdb&skip=0&limit=10&lang=Cn',
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