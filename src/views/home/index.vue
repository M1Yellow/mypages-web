<template>
  <div id="main">
    <!-- 左侧菜单导航区域 -->
    <div id="nav">
      <ul class="menu" id="menu">
        <!--
        v-if="platformList && platformList.length > 0" 表示变量使用之前，先判断和校验，避免出现 undefined 错误。
        TODO 关于变量用之前校验判断，每次都判断会发现代码里面很多判断代码，挺麻烦，且徒增工作量，也可以不判断，到时候报错再检查处理也行。
        -->
        <li v-if="platformList && platformList.length > 0" class="menu_item" v-for="(platformItem, idx) in platformList"
          v-bind:key="idx" v-bind:class="{ active: active === idx }"
          v-on:click="scrollToByTag(idx, platformItem.platformBaseInfo.name)">
          <img v-if="platformItem && platformItem.platformBaseInfo && platformItem.platformBaseInfo.platformLongLogo"
            class="nav_img" v-bind:src="baseApi + platformItem.platformBaseInfo.platformLongLogo" />
        </li>
        <!-- add platform -->
        <li v-if="addPlatformShow" id="add-platform">
          <i title="新增">
            <svg-icon iconName="jia0" className="add-platform-icon" v-on:click="showUnfinishedDialog"></svg-icon>
          </i>
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
import { onScroll, scrollTo } from '@/utils/scroll-navigation';
import CommonItem from "@/components/Common/CommonItem";
import PlatformItem from "@/components/PlatformContent/PlatformItem";
import BaseBackTop from "@/components/BaseBackTop";
import { getJsonData, initAllData, initDefaultData } from '@/api/home';
import { checkToken, getUserId } from '@/utils/auth'
import { doAdjustView, getUserFollowingTypeList, getUserPlatformList } from "@/api/global";

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
      userId: null,
      // TODO 完整 url 便于直接从 OSS 加载图片
      baseApi: process.env.VUE_APP_IMAGE_SERVER_PATH.startsWith("http") ? process.env.VUE_APP_IMAGE_SERVER_PATH : (process.env.VUE_APP_SERVER_API + process.env.VUE_APP_IMAGE_SERVER_PATH),
      active: 0, // 当前激活的导航索引
      addPlatformShow: false,
      platformList: null
    }
  },
  // 注入页面属性
  provide: function () {
    return {
      isNeedLogin: this.isNeedLogin,
      userId: this.userId ? this.userId : getUserId(),
      showUnfinishedDialog: this.showUnfinishedDialog
    }
  },
  created() { // 开始初始化 DOM 时，可以开始请求数据，注意，此时还不能操作 DOM 元素
    // 加载数据
    this.getData();
  },
  mounted() { // DOM 初始化完成，其中的方法只执行一次
    //console.log(process.env.NODE_ENV);
    //console.log(process.env.VUE_APP_SERVER_API);
    // 根据页面缩放比例，调整视图内容
    doAdjustView();
    // 监听页面缩放
    window.addEventListener('resize', doAdjustView);
    // 初始化滚出监听参数
    this.initScrollParams();
    // 监听滚动事件
    window.addEventListener('scroll', this.preOnScroll);
  },
  destroy() {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    window.removeEventListener('scroll', this.preOnScroll);
    window.removeEventListener('resize', doAdjustView);
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
      //alert(">>>> this.active:" + this.active);
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
    isNeedLogin() {
      // 校验是否需要登录
      return !checkToken();
    },
    getData() {
      // TODO 获取缓存的用户id
      if (!this.userId) {
        this.userId = getUserId();
      }
      // 延迟加载用户平台、类型列表数据，供修改分类使用
      if (!this.isNeedLogin() && this.userId) {
        setTimeout(() => {
          if (process.env.VUE_APP_ENV !== "prod") {
            console.log(">>>> get platform list of user delay.");
          }
          let platformList = getUserPlatformList(this.userId);
          if (platformList && platformList.length > 0) {
            setTimeout(() => {
              for (let i = 0; i < platformList.length; i++) {
                if (!platformList[i]) continue;
                if (process.env.VUE_APP_ENV !== "prod") {
                  console.log(">>>> get following type list of user delay.");
                }
                getUserFollowingTypeList(this.userId, platformList[i].platformId);
              }
            }, 10000);
          }
        }, 10000);
      }
      // 加载首页数据
      let params = {
        userId: this.userId
      };

      if (process.env.VUE_APP_ENV !== "prod") {
        console.log(">>>> initAllData params:", JSON.stringify(params));
      }
      if (!this.isNeedLogin() && this.userId) { // 用户id不为空，加载对应用户数据
        initAllData(params).then(res => {
          this.platformList = res.data;
        }).catch(e => {
          if (process.env.VUE_APP_ENV !== "prod") {
            console.log(e);
          }
        });
      } else { // 没有用户id，则加载默认内容
        initDefaultData(params).then(res => {
          this.platformList = res.data;
        }).catch(e => {
          if (process.env.VUE_APP_ENV !== "prod") {
            console.log(e);
          }
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
.content {}

/* 导航栏每级菜单内图片 */
.nav_img {
  max-width: 80px;
}

.menu {}

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

#add-platform>i {
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.add-platform-icon {
  font-size: 36px;
  color: #bfbfbf;
  fill: #bfbfbf;
  cursor: pointer;
}

.add-platform-icon:hover {
  color: #409eff;
  fill: #409eff;
}
</style>
