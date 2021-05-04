<template>
  <div v-if="userFollowingTypeInfo" class="platform_type_name_area">
    <el-row>
      <el-col :span="23">
        <span v-if="userFollowingTypeInfo.typeName" class="platform_type_name" title="点我试试"
              v-on:click="typeSettingShow = !typeSettingShow">
          {{ userFollowingTypeInfo.typeName }}
        </span>
      </el-col>
      <el-col :span="1" class="more_func">
        <el-dropdown v-if="typeSettingShow">
          <i class="el-icon-setting more_func_btn"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-if="userFollowingListSize && userFollowingListSize > 0"
                                v-on:click="showUnfinishedDialog">
                <i class="el-icon-search"></i>批量查询更新
              </el-dropdown-item>
              <el-dropdown-item v-if="userFollowingListSize && userFollowingListSize > 0"
                                v-on:click="showUnfinishedDialog">
                <i class="el-icon-refresh"></i>批量同步信息
              </el-dropdown-item>
              <el-dropdown-item
                  v-on:click="addFollowing(userFollowingTypeInfo.userId, platformId, userFollowingTypeInfo.id)">
                <i class="el-icon-plus"></i>添加关注用户
              </el-dropdown-item>
              <el-dropdown-item v-on:click="showUnfinishedDialog">
                <i class="el-icon-plus"></i>添加类型观点
              </el-dropdown-item>
              <el-dropdown-item v-on:click="showUnfinishedDialog">
                <i class="el-icon-edit"></i>编辑类型信息
              </el-dropdown-item>
              <el-dropdown-item v-on:click="showUnfinishedDialog">
                <i class="el-icon-delete"></i>移除类型条目
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getNewObjByJson} from '@/utils/index';

export default {
  name: "PlatformTypeName",
  props: ['userFollowingTypeInfo', 'userFollowingListSize'],
  inject: ['platformId', 'showUnfinishedDialog', 'userId'],
  data() {
    return {
      typeSettingShow: false
    };
  },
  components: {},
  methods: {
    addFollowing(userId, platformId, typeId) {
      this.$store.commit('SET_USER_FOLLOWING_DIALOG_VISIBLE', true);
      this.$store.commit('SET_USER_FOLLOWING_DIALOG_TYPE', 1);
      this.$store.commit('SET_USER_FOLLOWING_DIALOG_TITLE', '添加关注');
      this.$store.commit('SET_USER_FOLLOWING_VIEW_EDIT', this.$store.state.userFollowing.newFollowing);
      this.$store.commit('SET_USER_FOLLOWING_NEW_BACK', getNewObjByJson(this.$store.state.userFollowing.newFollowing));
      this.$store.commit('SET_USER_FOLLOWING_NEW_USER_ID', userId);
      this.$store.commit('SET_USER_FOLLOWING_NEW_PLATFORM_ID', platformId);
      this.$store.commit('SET_USER_FOLLOWING_NEW_TYPE_ID', typeId);
    }
  }
}
</script>

<style scoped>
.platform_type_name_area {
  text-align: left;
  font-size: 24px;
  font-weight: bold;
  padding: 5px 15px 5px 15px;
}

.platform_type_name {
  vertical-align: middle;
  cursor: pointer;
}
</style>
