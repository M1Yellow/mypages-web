<template>
  <div id="main">
    <!-- 左侧菜单导航区域 -->
    <div id="nav">
      <ul class="menu" id="menu">
        <!--
        v-if="platformList && platformList.length > 0" 表示变量使用之前，先判断和校验，避免出现 undefined 错误。
        当然，每次都判断嫌麻烦的话（会发现代码里面很多判断代码），也可以不判断，到时候报错再检查处理也行。
        -->
        <li v-if="platformList && platformList.length > 0" class="menu_item"
            v-for="(platformItem, idx) in platformList"
            v-bind:key="idx"
            v-bind:class="{ active: active === idx }"
            v-on:click="scrollToByTag(idx, platformItem.platformBaseInfo.name)"
        >
          <img v-if="platformItem && platformItem.platformBaseInfo && platformItem.platformBaseInfo.platformLongLogo"
               class="nav_img"
               v-bind:src="baseApi + platformItem.platformBaseInfo.platformLongLogo"/>
        </li>
        <!-- add platform -->
        <li v-if="addPlatformShow" id="add-platform">
          <i class="el-icon-circle-plus-outline add-platform-icon" title="新增" v-on:click="showUnfinishedDialog"></i>
        </li>
      </ul>
    </div>
    <!-- 主内容区域 -->
    <div class="content">
      <div v-if="platformList && platformList.length > 0" class="content_item">
        <platform-item v-for="platformItem in platformList" v-bind:platformItem="platformItem"></platform-item>
      </div>
    </div>
  </div>

  <!-- common view components 公共弹窗视图组件 -->
  <common-item></common-item>

  <!-- back to top 回到顶部 -->
  <base-back-top></base-back-top>

</template>

<script>
import {onScroll, scrollTo} from '@/utils/scroll-navigation';
import CommonItem from "@/components/Common/CommonItem";
import PlatformItem from "@/components/PlatformContent/PlatformItem";
import BaseBackTop from "@/components/BaseBackTop";
import {getJsonData, initAllData} from '@/api/home';

/*
定义常量、变量
const 声明一个只读的常量，常量的含义是指向的对象（引用地址）不能修改，但是可以修改对象中的属性。
var 是函数级作用域。
let 是块级作用域，函数内部使用 let 定义后，对函数外部无影响。
*/

//let navContents = document.querySelectorAll('.platform_item'); // 注意，此处此时的 document 还未加载完成，取不到元素
let navContents; // 获取所有锚点元素
let menuList; // 获取菜单元素列表
let menuItem; // 获取菜单元素
let navElem; // 获取导航栏元素

// 暴露默认方法，只能写一个默认方法
export default {
  components: {
    CommonItem,
    PlatformItem,
    BaseBackTop
  },
  name: 'navPos', // 导航栏滚动定位
  data() {
    return {
      userId: 1,
      baseApi: process.env.VUE_APP_BASE_API,
      active: 0, // 当前激活的导航索引
      addPlatformShow: false,
      platformList: null
    }
  },
  provide: function () {
    return {
      userId: this.userId,
      showUnfinishedDialog: this.showUnfinishedDialog
    }
  },
  beforeCreate() { // 实例创建之前，初始化事件和生命周期
  },
  created() { // 开始初始化 DOM 时，可以开始请求数据，注意，此时还不能操作 DOM 元素
    // 加载数据
    this.getData();
  },
  mounted() { // DOM 初始化完成，其中的方法只执行一次
    //console.log(process.env.NODE_ENV);
    //console.log(process.env.VUE_APP_BASE_API);
    //if (process.env.VUE_APP_MOCK) console.log("VUE_APP_MOCK=" + process.env.VUE_APP_MOCK);
    this.initScrollParams();
    // 监听滚动事件
    window.addEventListener('scroll', this.preOnScroll);
  },
  destroy() {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    window.removeEventListener('scroll', this.preOnScroll);
  },
  methods: {
    // 初始化滚动监听参数
    initScrollParams() {
      /* OnScroll() 事件频繁操作 DOM 获取的元素，将元素提取为变量，提升性能。不提取常量是因为常量定义为 [] 后不可再改变引用对象 */
      // 获取所有锚点元素
      navContents = document.querySelectorAll('.platform_item');
      // 获取菜单元素列表
      menuList = document.querySelectorAll(`.menu_item`);
      // 获取菜单元素
      //menuItem = document.querySelector(`.menu_item:nth-child(1)`);
      menuItem = menuItem = menuList[0];
      // 获取导航栏元素
      navElem = document.getElementById('nav');
    },
    // 滚动监听方法
    preOnScroll() {
      if (!navContents || navContents.length <= 0) navContents = document.querySelectorAll('.platform_item');
      if (!menuList || menuList.length <= 0) menuList = document.querySelectorAll(`.menu_item`);
      //if (!menuItem) menuItem = document.querySelector(`.menu_item:nth-child(1)`);
      if (!menuItem) menuItem = menuList[0];
      if (!navElem) navElem = document.getElementById('nav');
      // 调用 onScroll
      this.active = onScroll(navContents, navElem, menuItem);
      //console.log(this.active);
      //this.changeUrl();
      this.showAddPlatform();
    },
    // 跳转到指定索引的元素
    preScrollTo(index) {
      //console.log("index=" + index);
      this.active = index;
      // 获取目标的 offsetTop
      // css选择器是从 1 开始计数，index 下标是从 0 开始，所以要 +1
      const elem = document.querySelector(`.platform_item:nth-child(${index + 1})`);
      // 调用跳转
      scrollTo(elem); // 这种方式跳转很慢，内容长的要滚动很久！！
    },
    scrollToByTag(index, pName) {
      this.active = index;
      location.hash = pName;
      this.changeUrl();
      this.showAddPlatform();
    },
    showAddPlatform() { // 判断 add platform 按钮是否显示
      if (this.active === menuList.length - 1) {
        this.addPlatformShow = true;
      } else {
        this.addPlatformShow = false;
      }
    },
    changeUrl() { // 修复跳转地址栏
      let fromUrl = document.URL, // 获取当前页面的网址信息
          toUrl; // 最终修改的
      let num = fromUrl.indexOf('#'); //获取第一个 # 的位置信息
      if (num) {
        toUrl = fromUrl.substring(0, num); // 截取网址信息
        history.pushState(null, null, toUrl); // 重新设置地址栏网址
      }
    },
    getData() {
      let params = {
        userId: this.userId
      };
      //console.log(">>>> initAllData...");
      if (process.env.VUE_APP_MOCK === "true") {
        // 【本地环境】获取本地 json 文件数据
        console.log(">>>> homeApi.getJsonData");
        getJsonData("/json/home/platformList.json").then(response => {
          //console.log(response);
          this.platformList = response.data;
        }).catch(e => {
          console.log(e);
        });
      } else {
        // 【测试、开发、正式环境】请求接口数据
        //console.log(">>>> homeApi.initAllData");
        initAllData(params).then(response => {
          this.platformList = response.data;
        }).catch(e => {
          console.log(e);
        });
      }
    },
    showUnfinishedDialog() { // 全局提示 “功能未完成”
      //alert("非常抱歉！此功能暂未实现。\nSorry! Please wait some time.");
      this.$message({
        showClose: true,
        message: "非常抱歉！此功能暂未实现。\nSorry! Please wait some time."
      });
    }
  }
}
</script>

<style scoped>
/* 主内容区域 */
#main {
  /*max-width: 1200px;*/
  padding: 0 15% 0 25%;
}

/* 导航栏区域 */
#nav {
  position: fixed;
  float: left;
  margin-left: -8rem;
  width: max-content;
}

/* 内容区的样式 */
.content {

}

/* 导航栏每级菜单内图片 */
.nav_img {
  max-width: 80px;
}

.menu {

}

/* 导航栏每个菜单 */
.menu_item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 20px 5px 20px;
  font-size: 24px;
  cursor: pointer;
  line-height: 50px;
  height: 50px;
  font-weight: 600;
  color: #727475;
  background-color: #efefef;
  list-style: none;
  border-radius: 4px;
  box-shadow: 0 3px 10px 0 rgba(219, 219, 219, 0.62);
}

.menu_item:not(:last-child) {
  border-bottom: 1px solid #e0e0e0;
}

.menu_item:hover {
  /*
  -webkit-box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
  */
  background-color: #e2e2e2;
}

/* 当导航被点亮后改变颜色 */
.menu_item.active {
  color: #847ec3;
  background-color: #e2e2e2;
}

/* add platform */
#add-platform {
  /*background-color: #e4e7ed;*/
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 20px 5px 20px;
  font-size: 24px;
  line-height: 50px;
  height: 50px;
  font-weight: 600;
}

#add-platform > .add-platform-icon {
  font-size: 36px;
  color: #ccc;
  cursor: pointer;
}

#add-platform > .add-platform-icon:hover {
  color: #409eff;
}

</style>
