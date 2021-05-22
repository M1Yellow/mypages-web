<template>
  <div v-if="userFollowingTypeInfo && userFollowingTypeInfo.typeName" class="platform_type_name_area">
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
                  v-on:click="addFollowing(userFollowingTypeInfo.userId, userFollowingTypeInfo.platformId, userFollowingTypeInfo.id)">
                <i class="el-icon-plus"></i>添加关注用户
              </el-dropdown-item>
              <el-dropdown-item
                  v-on:click="addOpinion(userFollowingTypeInfo.userId, userFollowingTypeInfo.platformId, userFollowingTypeInfo.id)">
                <i class="el-icon-plus"></i>添加类型观点
              </el-dropdown-item>
              <el-dropdown-item v-if="userFollowingTypeInfo.typeName !== '默认分类'"
                                v-on:click="editType(userFollowingTypeInfo.userId, userFollowingTypeInfo.platformId, userFollowingTypeInfo)">
                <i class="el-icon-edit"></i>编辑类型信息
              </el-dropdown-item>
              <el-dropdown-item v-on:click="removeType(userFollowingTypeInfo)">
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
import {removeType} from "@/api/user";
import {mapActions} from 'vuex';
import sessionStorageUtil from "@/utils/sessionStorageUtil";

export default {
  name: "PlatformTypeName",
  props: ['userFollowingTypeInfo', 'userFollowingListSize', 'userOpinionListSize'],
  inject: ['platformId', 'showUnfinishedDialog', 'userId', 'reload'],
  data() {
    return {
      typeSettingShow: false,
      maxOpinionNum: this.$GlobalConstant.MAX_OPINION_NUM,
    };
  },
  components: {},
  methods: {
    ...mapActions({
      // 新增或编辑类型
      setTypeDialogVisible: 'userFollowingType/setDialogVisible',
      setTypeDialogType: 'userFollowingType/setDialogType',
      setTypeDialogTitle: 'userFollowingType/setDialogTitle',
      setTypeInstanceUserId: 'userFollowingType/setInstanceUserId',
      setTypeInstancePlatformId: 'userFollowingType/setInstancePlatformId',
      setTypeViewItem: 'userFollowingType/setViewItem',

      // 新增或编辑观点
      setOpinionDialogVisible: 'userOpinion/setDialogVisible',
      setOpinionDialogType: 'userOpinion/setDialogType',
      setOpinionDialogTitle: 'userOpinion/setDialogTitle',
      setOpinionInstanceUserId: 'userOpinion/setInstanceUserId',
      setOpinionInstancePlatformId: 'userOpinion/setInstancePlatformId',
      setOpinionInstanceOpinionType: 'userOpinion/setInstanceOpinionType',
      setOpinionViewItem: 'userOpinion/setViewItem',

      // 新增或编辑关注用户
      setFollowingDialogVisible: 'userFollowing/setDialogVisible',
      setFollowingDialogType: 'userFollowing/setDialogType',
      setFollowingDialogTitle: 'userFollowing/setDialogTitle',
      setFollowingInstanceUserId: 'userFollowing/setInstanceUserId',
      setFollowingInstancePlatformId: 'userFollowing/setInstancePlatformId',
      setFollowingInstanceTypeId: 'userFollowing/setInstanceTypeId',
      setFollowingViewItem: 'userFollowing/setViewItem',

    }),
    beforeOperation(item) {
      // 保存原来页面对象
      //this.$store.commit('SET_USER_FOLLOWING_TYPE_VIEW_ITEM', item);
      this.setTypeViewItem(item);
    },
    addFollowing(userId, platformId, typeId) {
      this.setFollowingDialogVisible(true);
      this.setFollowingDialogType(0);
      this.setFollowingDialogTitle('添加关注');
      this.setFollowingInstanceUserId(userId);
      this.setFollowingInstancePlatformId(platformId);
      this.setFollowingInstanceTypeId(typeId);
      this.setFollowingViewItem({}); // 指向空对象，指向 null 不生效
      // TODO 调用改变组件 key 值的方法，使组件重新渲染
      let changeAddFollowingDialogKey = this.$store.state.userFollowing.changeAddFollowingDialogKey;
      changeAddFollowingDialogKey();
    },
    addOpinion(userId, platformId, typeId) {
      if (this.userOpinionListSize && this.userOpinionListSize >= this.maxOpinionNum) {
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
    editType(userId, platformId, userFollowingTypeInfo) {
      // 默认类型不支持编辑
      if (!userFollowingTypeInfo || !userFollowingTypeInfo.typeName) {
        this.$message.error('类型数据错误');
        return false;
      }
      if (userFollowingTypeInfo.typeName === '默认分类') {
        this.$message.error('默认类型不支持改动');
        return false;
      }

      this.beforeOperation(userFollowingTypeInfo);
      this.setTypeDialogVisible(true);
      this.setTypeDialogType(1);
      this.setTypeDialogTitle('编辑类型');
    },
    removeType(item) {
      if (!item) {
        this.$message.error('类型数据错误');
        return false;
      }

      if (item.id === 0 && item.typeName.indexOf("默认分类") > -1) {
        this.$message.error('默认分类不能删除');
        return false;
      }

      this.$confirm('<span>确认移除【' + item.typeName + '】类型？</span><br><span style="color: red;">注意！确认移除后，各平台对应类型下的关注用户都将会变更到<b> 默认分类 </b>！</span>', '提示', {
        // TODO message 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 XSS 攻击。
        //  因此在 dangerouslyUseHTMLString 打开的情况下，请确保 message 的内容是可信的，永远不要将用户提交的内容赋值给 message 属性。
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        type: 'warning'
      }).then(() => {

        // 备份记录引用，以便后续操作页面数据对象。当然，直接用 item 操作也行
        this.beforeOperation(item);

        // 封装参数
        let params = {
          userId: item.userId,
          platformId: item.platformId,
          typeId: item.id
        }
        if (process.env.VUE_APP_ENV !== "prod") {
          console.log(">>>> removeType params:", JSON.stringify(params));
        }
        this.doRemoveType(params);
      }).catch(() => {

      });
    },
    doRemoveType(params) {
      removeType(params).then(res => {
        if (process.env.VUE_APP_ENV !== "prod") {
          console.log(">>>> removeType response:", JSON.stringify(res));
        }
        if (res.code === 200) {
          // 移除成功，直接替换绑定对象内容，动态更新
          // 页面对象
          //let pageItem = this.$store.state.userFollowingType.viewItem;
          //pageItem.typeName = null; // 因为是动态绑定，并且用 v-if 判断为 null 后，元素不显示，达到不刷新页面删除的效果
          // 清除类型缓存
          let cacheKey = this.$GlobalConstant.USER_TYPE_LIST_CACHE_KEY + params.userId + "_" + params.platformId;
          sessionStorageUtil.del(cacheKey);

          this.$message({
            type: "success",
            message: res.message
          });
          setTimeout(() => {
            this.reload();
          }, 200);
        } else {
          this.$message({
            type: "warning",
            message: res.message
          });
        }
      }).catch(e => {
        if (process.env.VUE_APP_ENV !== "prod") {
          console.log(e);
        }
      });
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
