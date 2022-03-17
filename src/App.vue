 <template>
  <div id="app" :class="yangshi?'blackYs':'normal'">
    <!-- 顶部 -->
    <!-- <top @show="getshow" @changeYS="changeYs"/> -->
    <top  @show="getshow"/>

    <index v-if="show0"/>
    <videoindex v-if="show1"/>
  </div>
</template>

<script>
import top from './components/01.top.vue';
import index from './components/02.index.vue';
import Videoindex from './components/03.videoIndex.vue'
import heiseBJ from './assets/heiseBJ.scss'
import chushi from './assets/index.scss'

export default {
  name: 'app',
  components: {
    top,
    index,
    Videoindex
  },
  data(){
    return{
      show0:true,
      show1:false,
      yangshi:false
    }
  },
  mounted() {
    // document.getElementById('app').setAttribute('class', 'chushi')
},
//    mounted(){
//     let link = document.createElement('link'); 
//     link.type = 'text/css';
//     link.id = "theme";
//     link.rel = 'stylesheet';
//     link.href = '@assets/index.css';
//     document.getElementsByTagName("app")[0].appendChild(link);
//       console.log(document.getElementsByTagName("app"))

// },
  methods: {
    getshow(showid){
      console.log('showid',showid)
      if(showid==0){
        // console.log('音乐')
        this.show0=true,
        this.show1=false
      }
      else if(showid==1){
        // console.log('shipin')
        this.show0=false
        this.show1=true
      }
      else if(showid==2){
        // console.log('shipin')
        console.log(showid)
        this.yangshi=!this.yangshi
        console.log(yangshi)
        // yangshi=heiseBJ
      }
    },
    changeYS(changeid){
      if(changeid==1){
        // yangshi=true
        // yangshi=blackYs
      }
    }  
  },
 
};
</script>

<style lang="scss">
#app{
  // background-color: rgb(255, 0, 0);
}
</style>
