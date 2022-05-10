<template>
  <div class="home">
    <!-- 头部 -->
    <div class="headers">
      <div class="headers-main">
        <Header></Header>
        <ly-tab
            v-model="selectedId"
            :items="items"
            :options="options"
            @change="changeTab"
            >
        </ly-tab>
      </div>
    </div>
    <!-- 中间内容部分 -->
    <!-- 小 -->
    <section ref="wrapper">
      <!-- 大 -->
      <div>
        <div v-for="(item, index) in newData" :key="index">
          <!-- {{items.data}} -->
          <Swiper v-if='item.type == "swiperList"' :swiperList='item.data'></Swiper>
          <Icons  v-if='item.type == "iconsList"' :iconsList='item.data'></Icons>
          <Recommend v-if="item.type == 'recommendList'" :recommendList='item.data'></Recommend>
          <Ad v-if="item.type == 'adList'" :adList='item.data'></Ad>
          <Like v-if="item.type == 'likeList'" :likeList='item.data'></Like>
        </div>
      </div>
    </section>
    <!-- 底部 -->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/home/Header.vue'
import Swiper from '@/components/home/Swiper.vue'
import Icons from '@/components/home/Icons.vue'
import Recommend from '@/components/home/Recommend.vue'
import Tabbar from '@/components/common/Tabbar.vue'
import Ad from '@/components/home/Ad.vue'
import Like from '@/components/home/Like.vue'


//引入插件
import BetterScroll from 'better-scroll'
// import axios from 'axios'
import http from '@/common/api/request.js'

export default {
  name: "Home",
  data () {
    return {
      //ly-tab
      selectedId: 0,
      //滑动的组件
      items: [],
      //数据
      newData: [],
      //$nextTick
      aBetterScroll:'',
      //$nextTick
      bBetterScroll:'',
      options: {
        activeColor: '#b0352f'
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await http.$axios({
        url:'/api/index_list/0/data/1'
      });
      this.items = Object.freeze(res.topBar);
      this.newData = Object.freeze(res.data);

      //dom都加载完了再去执行插件
      this.$nextTick(()=> {
        this.aBetterScroll = new BetterScroll(this.$refs.wrapper, {
          movable: true,
          zoom: true,
          click:true
        })
      })
    },

    //ly-tab的数据请求  //首页中不同的页面信息
    async addData(index) {
      let res = await http.$axios({
        url:'/api/index_list/'+index+'/data/1'
      });
      if(res.constructor != Array){
        this.newData = res.data;
      } else {
        this.newData = res;
      }

      //dom都加载完了再去执行插件
      this.$nextTick(()=> {
        this.bBetterScroll = new BetterScroll(this.$refs.wrapper, {
          movable: true,
          zoom: true,
          click:true
        })
      })
    },

    changeTab(item, index){
      this.addData(index);
    }
  },
  components: {
    Header,
    Swiper,
    Icons,
    Recommend,
    Tabbar,
    Like,
    Ad
  }
};
</script>

<style scoped>
/* .ly-tab{
	position: fixed;
	top:1.6rem;
	left:0;
} */
.home {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.headers {
  width: 100%;
  height: 3rem;
}
.headers-main {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
.ly-tab {
  display: relative;
  top: 3.24375rem;
}

section {
  flex: 1;
  overflow: hidden;
}

::v-deep .ly-tabbar{
	box-shadow:none;
	border-bottom:none;
}

.ly-tab-list {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    flex-shrink: 0;
    padding: 10px 10px;
    min-width: 100%;
}
</style>

