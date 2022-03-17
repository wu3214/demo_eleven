import Vue from 'vue'
import App from './App.vue'

// 导入 Element_ui
import ElementUI from 'element-ui'
// 导入 Element-ui 样式
import 'element-ui/lib/theme-chalk/index.css'
// 插件 Element-ui
Vue.use(ElementUI)

// 导入全局初始化样式 
import './assets/index.scss'
// import './assets/heiseBJ.scss'

// 路由整合
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

// 导入对应的路由
import discovery from './views/01.discovery.vue'
import playlists from './views/02.playlists.vue'
import songs from './views/03.songs.vue'
import mvs from './views/04.mvs.vue'
import result from './views/05.result.vue'
import playlist from './views/06.playlist.vue'
import mv from './views/07.mv.vue'

import videoIndex from '@/components/03.videoIndex.vue'
import homePage from'./viewsVideo/homePage.vue'
import films from './viewsVideo/films.vue'
import animes from './viewsVideo/animes.vue'
import varietys from './viewsVideo/varietys.vue'
import television from './viewsVideo/television.vue'
import View from './viewsVideo/View.vue'
import playVideo from './viewsVideo/playVideo.vue'
import login from './views/login.vue'
import register from './views/register.vue'
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/discovery'
    },
    {
      // 发现音乐
      path: '/discovery',
      component: discovery
    },
    {
      // 推荐歌单
      path: '/playlists',
      component: playlists
    },
    {
      // 推荐歌单
      path: '/playlist',
      component: playlist
    },
    {
      // 最新音乐
      path: '/songs',
      component: songs
    },
    {
      // 最新音乐
      path: '/mvs',
      component: mvs
    },
    // mv详情
    {
      path: '/mv',
      component: mv
    },
    // 搜索结果页
    {
      path: '/result',
      component: result
    },
    // 视频首页
    {
      path: '/videoIndex',
      component: videoIndex
    },
    // 首页
    {
      path: '/homePage',
      component: homePage
    },
    // 电影
    {
      path: '/films',
      component: films
    },
    // 电视
    {
      path: '/television',
      component: television
    },
    // 动漫
    {
      path: '/animes',
      component: animes
    },
    // 综艺
    {
      path: '/varietys',
      component: varietys
    },
    // 电影电视、综艺描述详情
    {
      path: '/View',
      component: View
    },
    // 播放界面
    {
      path: '/playVideo',
      component: playVideo
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/register',
      component: register
    },
  ]
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载到Vue示例上
  router
}).$mount('#app')
