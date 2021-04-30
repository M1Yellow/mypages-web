<template>
  <div v-if="followingItem.userFollowing" class="following_item">
    <el-row>
      <!-- Property "circle" was accessed during render but is not defined on instance. -->
      <!-- webpack 在开发环境热更新时会出现这个问题，很耗系统性能，配置文件修改 NODE_ENV=production -->
      <el-col :span="3" class="following_item_photo_area">
        <a v-if="followingItem.userFollowing.mainPage" v-bind:href="followingItem.userFollowing.mainPage" title="进入主页"
           target="_blank">
          <el-avatar v-if="followingItem.userFollowing.profilePhoto" class="following_item_photo" :shape="circle"
                     :size="64" :fit="fill" @error="errorHandler">
            <img :src="baseApi + followingItem.userFollowing.profilePhoto"/>
          </el-avatar>
        </a>
      </el-col>
      <el-col :span="20" class="following_item_desc_area">
        <div v-if="followingItem.userFollowing.name" class="following_item_name_area">
          <a v-if="followingItem.userFollowing.mainPage" v-bind:href="followingItem.userFollowing.mainPage"
             target="_blank">
            <span class="following_item_name">{{ followingItem.userFollowing.name }}</span>
          </a>
        </div>
        <div v-if="followingItem.userFollowing.signature" class="following_item_signature_area">
          <span class="following_item_signature"
                :title="followingItem.userFollowing.signature">{{ followingItem.userFollowing.signature }}</span>
        </div>
        <div v-if="followingItem.userFollowingRemarkList && followingItem.userFollowingRemarkList.length > 0"
             class="following_item_remark_area">
          <user-following-remark-item v-for="(followingRemarkItem) in followingItem.userFollowingRemarkList"
                                      v-bind:followingRemarkItem="followingRemarkItem"></user-following-remark-item>
        </div>
      </el-col>
      <el-col :span="1" class="more_func">
        <el-dropdown>
          <i class="el-icon-more more_func_btn" :id="'following_item_' + followingItem.userFollowing.id"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-if="followingItem.userFollowing.isUser" v-on:click="showUnfinishedDialog">
                <i class="el-icon-search"></i>查询更新
              </el-dropdown-item>
              <el-dropdown-item v-if="followingItem.userFollowing.isUser"
                                v-on:click="syncFollowingInfo(followingItem, followingItem.userFollowing.userId, followingItem.userFollowing.followingId, followingItem.userFollowing.name)">
                <i class="el-icon-refresh"></i>同步信息
              </el-dropdown-item>
              <el-dropdown-item v-on:click="editFollowing(followingItem)">
                <i class="el-icon-edit"></i>编辑关注
              </el-dropdown-item>
              <el-dropdown-item
                  v-on:click="removeFollowing(followingItem, followingItem.userFollowing.userId, followingItem.userFollowing.followingId, followingItem.userFollowing.name)">
                <i class="el-icon-delete"></i>移除关注
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UserFollowingRemarkItem from "@/components/PlatformContent/UserFollowingRemarkItem";
import {removeFollowing, syncFollowingInfo} from '@/api/user';
import {getNewObjByJson, getRandomNum} from '@/utils/index';

export default {
  name: "UserFollowingItem",
  props: ['followingItem'],
  inject: ['showUnfinishedDialog', 'reload'],
  data() {
    return {
      baseApi: process.env.VUE_APP_BASE_API,
      visible: false,
    };
  },
  components: {
    UserFollowingRemarkItem
  },
  methods: {
    // 增、删、改操作之前
    beforeOperation(followingItem) {
      // 保存一份页面数据对象的引用
      this.$store.commit('SET_USER_FOLLOWING_VIEW_ITEM', followingItem);
    },
    // 更新用户信息
    syncFollowingInfo(followingItem, userId, fuid, name) {
      //console.log(fuid, name);
      this.beforeOperation(followingItem);
      this.$confirm('确认同步用户【' + name + '】的信息？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        type: 'warning'
      }).then(() => {
        // 封装参数
        let params = {
          userId: userId,
          fuid: fuid
        }
        // 执行同步
        this.doSyncFollowingInfo(params);
      }).catch(() => {

      });
    },
    doSyncFollowingInfo(params) {
      syncFollowingInfo(params).then(res => {
        //console.log(">>>> syncFollowingInfo response:", res);
        if (res.code === 200) {
          // 更新成功，直接替换绑定对象内容，动态更新
          // 页面对象
          let pageFollowingItem = this.$store.state.userFollowing.followingItem;
          //console.log(">>>> pageFollowingItem: ", JSON.stringify(pageFollowingItem));
          // 接口返回对象
          let returnFollowingItem = res.data;
          //console.log(">>>> returnFollowingItem: ", JSON.stringify(returnFollowingItem));
          pageFollowingItem.userFollowing = returnFollowingItem.userFollowing;
          // 没有同步标签，这一步不用管
          //pageFollowingItem.userFollowingRemarkList = returnFollowingItem.userFollowingRemarkList;
          // 进一步处理头像文件，在文件后面添加随机参数（?v=随机数）即可。如果文件路径没有变动，是不会触发页面更新的，这里需要重新加载用户头像文件，
          // 因为原来的文件可能不存在，同步之后文件又有了，必须触发动态加载
          if (pageFollowingItem.userFollowing.profilePhoto) {
            let randomNum = getRandomNum(100000, 999999);
            let param = '?v=' + randomNum;
            pageFollowingItem.userFollowing.profilePhoto = pageFollowingItem.userFollowing.profilePhoto + param;
          }
          //console.log(">>>> pageFollowingItem: ", JSON.stringify(pageFollowingItem));

          this.$message({
            type: "success",
            message: res.message
          });
          /*
          setTimeout(() => {
            this.reload();
          }, 2000);
          */
        } else {
          this.$message({
            type: "warning",
            message: res.message
          });
        }
      }).catch(e => {
        console.log(e);
      });
    },
    removeFollowing(followingItem, userId, followingId, name) {
      this.beforeOperation(followingItem);
      this.$confirm('确认移除关注用户【' + name + '】？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        type: 'warning'
      }).then(() => {
        // 封装参数
        let params = {
          userId: userId,
          followingId: followingId
        }
        this.doRemoveFollowing(params);
      }).catch(() => {

      });
    },
    doRemoveFollowing(params) {
      removeFollowing(params).then(res => {
        //console.log(">>>> removeFollowing response:", res);
        if (res.code === 200) {
          // 移除成功，直接替换绑定对象内容，动态更新
          // 页面对象
          let pageFollowingItem = this.$store.state.userFollowing.followingItem;
          //console.log(">>>> pageFollowingItem: ", JSON.stringify(pageFollowingItem));
          // 接口返回对象
          //let returnFollowingItem = res.data;
          //console.log(">>>> returnFollowingItem: ", JSON.stringify(returnFollowingItem));
          pageFollowingItem.userFollowing = null;
          pageFollowingItem.userFollowingRemarkList = null;

          this.$message({
            type: "success",
            message: res.message
          });
          /*
          setTimeout(() => {
            this.reload();
          }, 2000);
          */
        } else {
          this.$message({
            type: "warning",
            message: res.message
          });
        }
      }).catch(e => {
        console.log(e);
      });
    },
    editFollowing(followingItem) {
      //console.log(JSON.stringify(followingItem));
      this.beforeOperation(followingItem);
      this.setUserFollowing(followingItem);

    },
    setUserFollowing(followingItem) { // followingItem:{userFollowing:{}, userFollowingRemarkList:{}}
      //let following = followingItem; // 地址引用，后续的修改，会影响原始数据
      let following = getNewObjByJson(followingItem); // json 先序列化，再反序列化为对象
      if (following.userFollowingRemarkList != null && following.userFollowingRemarkList.length > 0) {
        // 给每个标签添加一个属性，用于控制编辑标签时，是否显示输入框
        for (let i in following.userFollowingRemarkList) {
          //this.$set(remark, 'inputEditVisible', false); // this.$set is not a function
          following.userFollowingRemarkList[i] = Object.assign({}, following.userFollowingRemarkList[i], {inputEditVisible: false});
        }
        following.userFollowing.remarkList = following.userFollowingRemarkList;
      } else {
        following.userFollowing.remarkList = [];
      }
      if (following.userFollowing) {
        // 设置用户编辑信息
        this.$store.commit('SET_USER_FOLLOWING_DIALOG_VISIBLE', true);
        this.$store.commit('SET_USER_FOLLOWING_DIALOG_TYPE', 1);
        this.$store.commit('SET_USER_FOLLOWING_DIALOG_TITLE', '编辑关注');
        this.$store.commit('SET_USER_FOLLOWING_VIEW_EDIT', following.userFollowing);
        this.$store.commit('SET_USER_FOLLOWING_NEW_BACK', getNewObjByJson(this.$store.state.userFollowing.newFollowing));
      }
      //console.log(JSON.stringify(this.$store.state.userFollowing.userFollowingEdit));
    }
  }
}
</script>

<style scoped>
.following_item {
  margin: 0px 15px 10px 15px;
  border-bottom: 1px solid rgba(224, 230, 237, 0.62);
  vertical-align: middle;
}

.following_item_photo_area {
  display: flex; /* 弹性布局 */
  justify-content: center; /* 内容调整 */
  align-items: center; /* 居中 */
}

.following_item_photo_area > a {
  margin: 10px;
}

.following_item_photo {
  /*max-width: 64px;*/
  background: #f3f3f3;
  /*border: 2px solid hsla(0, 0%, 100%, .4);*/
}

.following_item_desc_area {
  padding: 5px 5px 5px 15px;
  vertical-align: middle;
}

.following_item_name_area {
  padding-bottom: 5px;
}

.following_item_name {
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  vertical-align: middle;
}

.following_item_signature_area {

}

.following_item_signature {
  display: inline-block;
  font-size: 13px;
  color: #666;
  line-height: 28px;
  vertical-align: middle;
  width: -webkit-fill-available;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

</style>
