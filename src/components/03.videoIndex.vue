<template>
    <div>
    <div class="index-container">
    <!-- 导航区域 -->
    <div class="nav" >
      <ul>
        <li>
          <router-link to="/homePage">
            <span class="iconfont icon-mv"></span>
            首页
          </router-link>
        </li>
        <li>
          <router-link to="/films">
            <span class="iconfont icon-mv"></span>
            电影
          </router-link>
        </li>
        <li>
          <router-link to="/television">
            <span class="iconfont icon-mv"></span>
            电视
          </router-link>
        </li>
        <li>
          <router-link to="/animes">
            <span class="iconfont icon-mv"></span>
            动漫
          </router-link>
        </li>
        <li>
          <router-link to="/varietys">
            <span class="iconfont icon-mv"></span>
            综艺
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 主体区域 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- 播放标签 -->
  </div>
  </div>
</template>

<script>
export default {
    name: 'Videoindex',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style>

</style>