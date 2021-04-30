<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      /*
      // 保存当前页面浏览位置
      // 获取当前 offsetTop
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      //console.log("scrollTop=" + scrollTop);
      if (window.sessionStorage && scrollTop) { // 浏览器支持 sessionStorage，并且获取的高度有值
        sessionStorage.setItem("mypages_homepage_scrollTop", scrollTop);
      }
      */

      // 注意，需要再重新加载之前获取数据！！
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
        setTimeout(function () { // 需要等待页面 DOM 加载完成
          // this.scrollPos(null); // 页面刷新后，函数还未加载，使用不了外部函数
          window.scrollTo(0, scrollTop);
        }, 800); // 延迟时间逐个实验，跟页面请求接口数量和速度有关。200ms 不行；400ms 也不行；500ms 不稳定；600ms 不稳定；800ms ；1s 时间可能长了，但挺稳定
      });
    },
    scrollPos(high) {
      // 跳转位置
      if (window.sessionStorage) {
        let scrollTop = sessionStorage.getItem("mypages_homepage_scrollTop") || 0;
        if (scrollTop) {
          // 跳转之前的位置
          //console.log("scroll to:" + scrollTop);
          window.scrollTo(0, scrollTop);
          //document.body.scrollTop = scrollTop;
          //document.documentElement.scrollTop = scrollTop;
          //document.getElementById("following_item_64").scrollIntoView();
          // 跳转之后，清理
          sessionStorage.removeItem("mypages_homepage_scrollTop");
        }
      }
    }
  }
}
</script>

<style>

</style>
