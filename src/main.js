import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
// 导入 Element_ui
import ElementUI from 'element-ui'
// 导入 Element-ui 样式
import 'element-ui/lib/theme-chalk/index.css'
// 插件 Element-ui
Vue.use(ElementUI)
// ElementUI.Message.error('后台异常，请刷新或确认后台是否正常启动')
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
      redirect: '/login'
    },
    {
      // 发现音乐
      path: '/discovery',
      component: discovery,
      meta: {
        isLogin: true
      },
    },
    {
      // 推荐歌单
      path: '/playlists',
      component: playlists,
      meta: {
        isLogin: true
      },
    },
    {
      // 推荐歌单
      path: '/playlist',
      component: playlist,
      meta: {
        isLogin: true
      },
    },
    {
      // 最新音乐
      path: '/songs',
      component: songs,
      meta: {
        isLogin: true
      },
    },
    {
      // 最新音乐
      path: '/mvs',
      component: mvs,
      meta: {
        isLogin: true
      },
    },
    // mv详情
    {
      path: '/mv',
      component: mv,
      meta: {
        isLogin: true
      },
    },
    // 搜索结果页
    {
      path: '/result',
      component: result,
      meta: {
        isLogin: true
      },
    },
    // 视频首页
    {
      path: '/videoIndex',
      component: videoIndex,
      meta: {
        isLogin: true
      },
    },
    // 首页
    {
      path: '/homePage',
      component: homePage,
      meta: {
        isLogin: true
      },
    },
    // 电影
    {
      path: '/films',
      component: films,
      meta: {
        isLogin: true
      },
    },
    // 电视
    {
      path: '/television',
      component: television,
      meta: {
        isLogin: true
      },
    },
    // 动漫
    {
      path: '/animes',
      component: animes,
      meta: {
        isLogin: true
      },
    },
    // 综艺
    {
      path: '/varietys',
      component: varietys,
      meta: {
        isLogin: true
      },
    },
    // 电影电视、综艺描述详情
    {
      path: '/View',
      component: View,
      meta: {
        isLogin: true
      },
    },
    // 播放界面
    {
      path: '/playVideo',
      component: playVideo,
      meta: {
        isLogin: true
      },
    },
    {
      path: '/login',
      component: login,
      meta: {
        isLogin: false
      }
    },
    {
      path: '/register',
      component: register,
      meta: {
    isLogin: false
  }
    },
  ]
})

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {

  //获取用户登录成功后储存的登录标志
  let getFlag = localStorage.getItem("Flag");

  //如果登录标志存在且为isLogin，即用户已登录
  if(getFlag === "isLogin"){
    //设置vuex登录状态为已登录
    store.state.isLogin = true
    next()
    //如果已登录，还想想进入登录注册界面，则定向回首页
    if (!to.meta.isLogin) {
      // this.$message.error("请先退出登录");
      ElementUI.Message.error('请先退出登录')
      next({
        path: '/discovery'
      })
    }
  //如果登录标志不存在，即未登录
  }else{
    //用户想进入需要登录的页面，则定向回登录界面
    if(to.meta.isLogin){
      next({
        path: '/login',
      })
      // this.$message.error("请先登录");
      ElementUI.Message.error('请先登录')
    //用户进入无需登录的界面，则跳转继续
    }else{
      next()
    }
  }
});

router.afterEach(route => {
  window.scroll(0, 0);
});


new Vue({
  render: h => h(App),
  // 挂载到Vue示例上
  router,
  store,
}).$mount('#app')
