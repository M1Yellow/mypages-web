<template>
  <div v-if="followingItem.userFollowing" class="following_item">
    <el-row>
      <el-col :span="3" class="following_item_photo_area">
        <a v-if="followingItem.userFollowing.mainPage" v-bind:href="followingItem.userFollowing.mainPage" title="进入主页"
           target="_blank">
          <el-avatar v-if="followingItem.userFollowing.profilePhoto" class="following_item_photo" :shape="circle"
                     :size="64" :fit="contain" @error="errorHandler">
            <img :src="baseApi + followingItem.userFollowing.profilePhoto"/>
          </el-avatar>
        </a>
      </el-col>
      <el-col :span="20" class="following_item_desc_area">
        <div v-if="followingItem.userFollowing.name" class="following_item_name_area">
          <span class="following_item_name">{{ followingItem.userFollowing.name }}</span>
        </div>
        <div v-if="followingItem.userFollowing.signature" class="following_item_signature_area">
          <span class="following_item_signature" :title="followingItem.userFollowing.signature">{{ followingItem.userFollowing.signature }}</span>
        </div>
        <div v-if="followingItem.userFollowingRemarkList && followingItem.userFollowingRemarkList.length > 0"
             class="following_item_remark_area">
          <userFollowingRemarkItem v-for="(followingRemarkItem) in followingItem.userFollowingRemarkList"
                                   v-bind:followingRemarkItem="followingRemarkItem"></userFollowingRemarkItem>
        </div>
      </el-col>
      <el-col :span="1" class="more_func">
        <el-popover
            placement="left-start"
            :width="205"
            trigger="click"
            v-model:visible="visible"
        >
          <div style="text-align: left; margin: 0">
            <el-button type="primary" plain size="small" icon="el-icon-search" @click="visible = false">查询更新</el-button>
            <el-button type="primary" plain size="small" icon="el-icon-refresh" @click="visible = false">同步信息</el-button>
          </div>
          <template #reference>
            <i class="el-icon-more more_func_btn" title="更多操作"></i>
          </template>
        </el-popover>
        <!--
        <el-dropdown>
          <i class="el-icon-more more_func_btn" title="更多操作"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item><i class="el-icon-search"></i>查询更新</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-refresh"></i>同步信息</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userFollowingRemarkItem from "@/components/PlatformContent/userFollowingRemarkItem";

export default {
  name: "userFollowingItem",
  props: ['followingItem'],
  data() {
    return {
      baseApi: this.$global.OSS_URL,
      visible: false,
    };
  },
  components: {
    userFollowingRemarkItem
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
.following_item_photo_area>a {
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

.more_func {
  display: flex; /* 弹性布局 */
  justify-content: center; /* 内容调整 */
  align-items: center; /* 居中 */
}

.more_func_btn {
  cursor: pointer;
  color: #ccc;
  transform: rotate(90deg); /* 顺时针旋转90° */
}

</style>
