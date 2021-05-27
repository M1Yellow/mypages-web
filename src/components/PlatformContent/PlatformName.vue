<template>
  <div v-if="platformBaseInfo && platformBaseInfo.name" class="platform_name_area">
    <el-row>
      <el-col :span="23">
        <!-- 默认平台-头像显示 -->
        <span v-if="platformBaseInfo.platformId === defaultPlatformId">
          <!-- 需要登录 -->
          <span v-if="needLogin">
            <a v-on:click="showLogin()" title="请登录">
              <img v-if="platformBaseInfo.platformLogo" class="platform_logo"
                   v-bind:src="baseApi + platformBaseInfo.platformLogo"/>
            </a>
          </span>
          <!-- 已经登录 -->
          <span v-else class="user_profile_area">
            <a v-if="platformBaseInfo.mainPage" v-bind:href="platformBaseInfo.mainPage" target="_self">
              <el-avatar v-if="userInfo && userInfo.profilePhoto" :size="50" :shape="circle" :fit="fill">
                <img class="user_profile" v-bind:src="baseApi + userInfo.profilePhoto"/>
              </el-avatar>
            </a>
          </span>
        </span>
        <!-- 后续添加的平台-头像显示 -->
        <span v-else>
          <a v-if="platformBaseInfo.mainPage" v-bind:href="platformBaseInfo.mainPage" title="前往站点" target="_blank">
            <img v-if="platformBaseInfo.platformLogo" class="platform_logo"
                 v-bind:src="baseApi + platformBaseInfo.platformLogo"/>
          </a>
        </span>

        <!-- 默认平台-名称显示 -->
        <span v-if="platformBaseInfo.platformId === defaultPlatformId"
              class="platform_name"
              :id="needLogin ? 'platform_name_need_login' : 'platform_name_after_login'"
              :title="needLogin ? '登录' : '点我试试'"
              v-on:click="showLogin()">
          {{ needLogin ? '请登录' : (userInfo.userName ? userInfo.userName : platformBaseInfo.name) }}
        </span>
        <!-- 后续添加的平台-名称显示 -->
        <span v-else-if="platformBaseInfo.name" class="platform_name" title="点我试试"
              v-on:click="platformNameShow = !platformNameShow">
          {{ platformBaseInfo.name }}
        </span>
      </el-col>
      <el-col :span="1" class="more_func">
        <el-dropdown v-if="platformNameShow">
          <i v-if="platformBaseInfo.platformId === defaultPlatformId" class="el-icon-setting more_func_btn" id="my_func_btn"></i>
          <i v-else class="el-icon-setting more_func_btn"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                  v-if="platformBaseInfo.platformId !== defaultPlatformId && userFollowingTypeListSize && userFollowingTypeListSize > 0"
                  v-on:click="showUnfinishedDialog">
                <i class="el-icon-search"></i>批量查询更新
              </el-dropdown-item>
              <el-dropdown-item
                  v-if="platformBaseInfo.platformId !== defaultPlatformId && userFollowingTypeListSize && userFollowingTypeListSize > 0"
                  v-on:click="showUnfinishedDialog">
                <i class="el-icon-refresh"></i>批量同步信息
              </el-dropdown-item>
              <el-dropdown-item v-if="platformBaseInfo.platformId !== defaultPlatformId"
                                v-on:click="addFollowing(platformBaseInfo.userId, platformBaseInfo.platformId, 0)">
                <i class="el-icon-plus"></i>添加关注用户
              </el-dropdown-item>
              <el-dropdown-item v-if="platformBaseInfo.platformId !== defaultPlatformId"
                                v-on:click="addType(platformBaseInfo.userId, platformBaseInfo.platformId)">
                <i class="el-icon-plus"></i>添加类型条目
              </el-dropdown-item>
              <el-dropdown-item v-on:click="addOpinion(platformBaseInfo.userId, platformBaseInfo.platformId, 0)">
                <i class="el-icon-plus"></i>添加平台观点
              </el-dropdown-item>
              <el-dropdown-item v-if="platformBaseInfo.platformId !== defaultPlatformId"
                                v-on:click="showUnfinishedDialog">
                <i class="el-icon-edit"></i>编辑平台信息
              </el-dropdown-item>
              <el-dropdown-item v-if="platformBaseInfo.platformId !== defaultPlatformId"
                                v-on:click="showUnfinishedDialog">
                <i class="el-icon-delete"></i>移除平台条目
              </el-dropdown-item>
              <el-dropdown-item v-if="platformBaseInfo.platformId === defaultPlatformId"
                                v-on:click="doLogout()">
                <i class="el-icon-switch-button"></i>退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import store from "@/store";
import {getUserInfoDetail, logout} from "@/api/global";


export default {
  name: "PlatformName",
  props: ['platformBaseInfo', 'platformOpinionListSize', 'userFollowingTypeListSize'],
  inject: ['isNeedLogin', 'userId', 'showUnfinishedDialog'],
  data() {
    return {
      needLogin: true,
      baseApi: process.env.VUE_APP_SERVER_API,
      platformNameShow: false,
      maxOpinionNum: this.$GlobalConstant.MAX_OPINION_NUM,
      defaultPlatformId: this.$GlobalConstant.USER_DEFAULT_PLATFORM_ID,
      userInfo: {
        id: null, // 也就是 userId
        userName: null,
        mobile: null, // 脱敏
        email: null, // 脱敏
        profilePhoto: null, // 头像地址
        gender: 1, // 性别，默认男
        lockTime: null, // 锁定时间
      }
    }
  },
  created() {
    // 校验是否需要登录
    this.needLogin = this.isNeedLogin();
    // 加载用户详细信息
    if (!this.needLogin && this.platformBaseInfo && this.platformBaseInfo.platformId === this.defaultPlatformId) {
      let userInfoTmp = getUserInfoDetail(this.userId, null);
      if (userInfoTmp) {
        this.userInfo = userInfoTmp;
      }
    }
  },
  methods: {

    /*
    // TODO mapActions 使用样例
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),
    */

    ...mapActions({
      // 新增或编辑类型
      setTypeDialogVisible: 'userFollowingType/setDialogVisible',
      setTypeDialogType: 'userFollowingType/setDialogType',
      setTypeDialogTitle: 'userFollowingType/setDialogTitle',
      setTypeInstanceUserId: 'userFollowingType/setInstanceUserId',
      setTypeInstancePlatformId: 'userFollowingType/setInstancePlatformId',
      setTypeViewItem: 'userFollowingType/setViewItem',

      // 新增或编辑关注用户
      setFollowingDialogVisible: 'userFollowing/setDialogVisible',
      setFollowingDialogType: 'userFollowing/setDialogType',
      setFollowingDialogTitle: 'userFollowing/setDialogTitle',
      setFollowingIsShowFollowingType: 'userFollowing/setIsShowFollowingType',
      setFollowingInstanceUserId: 'userFollowing/setInstanceUserId',
      setFollowingInstancePlatformId: 'userFollowing/setInstancePlatformId',
      setFollowingInstanceTypeId: 'userFollowing/setInstanceTypeId',
      setFollowingViewItem: 'userFollowing/setViewItem',

      // 新增或编辑观点
      setOpinionDialogVisible: 'userOpinion/setDialogVisible',
      setOpinionDialogType: 'userOpinion/setDialogType',
      setOpinionDialogTitle: 'userOpinion/setDialogTitle',
      setOpinionInstanceUserId: 'userOpinion/setInstanceUserId',
      setOpinionInstancePlatformId: 'userOpinion/setInstancePlatformId',
      setOpinionInstanceOpinionType: 'userOpinion/setInstanceOpinionType',
      setOpinionViewItem: 'userOpinion/setViewItem',

    }),
    // 显示登录弹窗
    showLogin() {
      if (this.needLogin) {
        store.dispatch('userLogin/setDialogVisible', true);
      } else {
        this.platformNameShow = !this.platformNameShow;
      }
    },
    // 退出登录
    doLogout() {
      this.$confirm('确认退出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        type: 'warning'
      }).then(() => {
        logout();
        window.location.reload(false);
      });
    },
    addFollowing(userId, platformId, typeId) {
      this.setFollowingDialogVisible(true);
      this.setFollowingDialogType(0);
      this.setFollowingDialogTitle('添加关注');
      this.setFollowingIsShowFollowingType(true);
      this.setFollowingInstanceUserId(userId);
      this.setFollowingInstancePlatformId(platformId);
      this.setFollowingInstanceTypeId(typeId);
      this.setFollowingViewItem({}); // 指向空对象，指向 null 不生效
      // TODO 调用改变组件 key 值的方法，使组件重新渲染
      let changeAddFollowingDialogKey = this.$store.state.userFollowing.changeAddFollowingDialogKey;
      changeAddFollowingDialogKey();
    },
    addOpinion(userId, platformId, typeId) {
      if (this.platformOpinionListSize && this.platformOpinionListSize >= this.maxOpinionNum) {
        this.$message.info('添加观点不能超过 ' + this.maxOpinionNum + ' 个！');
        return false;
      }
      this.setOpinionDialogVisible(true);
      this.setOpinionDialogType(0);
      this.setOpinionDialogTitle('新增观点');
      this.setOpinionInstanceUserId(userId);
      this.setOpinionInstancePlatformId(platformId);
      this.setOpinionInstanceOpinionType(typeId);
      this.setOpinionViewItem({}); // 指向空对象，指向 null 不生效
    },
    addType(userId, platformId) {
      this.setTypeDialogVisible(true);
      this.setTypeDialogType(0);
      this.setTypeDialogTitle('新增类型');
      this.setTypeInstanceUserId(userId);
      this.setTypeInstancePlatformId(platformId);
      this.setTypeViewItem({});
    },
  }
}
</script>

<style scoped>
.platform_name_area {
  text-align: left;
  font-size: 30px;
  font-weight: bold;
  padding: 10px 15px 10px 15px;
}

.platform_logo {
  /*display: flex;
  justify-content: center;
  align-items: center;*/
  max-width: 30px;
  vertical-align: middle;
}

.platform_name {
  padding-left: 10px;
  vertical-align: middle;
  cursor: pointer;
}

#platform_name_after_login {
  display: inline-block;
  margin-top: 15px;
  font-size: 20px;
  font-weight: bold;
  padding-left: 10px;
  vertical-align: top;
  cursor: pointer;
}

#platform_name_need_login {
  font-size: 20px;
  font-weight: bold;
  padding-left: 10px;
  vertical-align: middle;
  cursor: pointer;
}

/* 用户登录后，头像显示样式 */
.user_profile_area {

}
.user_profile {

}

#my_func_btn {
  margin-top: -20px;
  float: left;
}


</style>
