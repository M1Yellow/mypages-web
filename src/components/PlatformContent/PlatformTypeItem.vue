<template>
  <!-- 没观点、也没有关注用户的类型，不显示 -->
  <div v-if="typeItem && ((typeItem.userOpinionList && typeItem.userOpinionList.length > 0)
                        || (currentFollowingList && currentFollowingList.length > 0)
                        || (typeItem.userFollowingListPage && typeItem.userFollowingListPage.records
                        && typeItem.userFollowingListPage.records.length > 0))"
       class="platform_type_item">
    <platform-type-name v-if="typeItem.userFollowingTypeInfo"
                        v-bind:userFollowingTypeInfo="typeItem.userFollowingTypeInfo"
                        v-bind:userOpinionListSize="typeItem.userOpinionList === null ? 0 : typeItem.userOpinionList.length"
                        v-bind:userFollowingListSize="typeItem.userFollowingList === null ? 0 : typeItem.userFollowingList.length">
    </platform-type-name>
    <platform-opinion v-if="typeItem.userOpinionList && typeItem.userOpinionList.length > 0"
                      v-bind:opinions="typeItem.userOpinionList"
                      v-bind:userOpinionListSize="typeItem.userOpinionList.length">
    </platform-opinion>
    <platform-following v-if="needLogin"
                        v-bind:followings="typeItem.userFollowingListPage.records">
    </platform-following>
    <platform-following v-else-if="currentFollowingList && currentFollowingList.length > 0"
                        v-bind:followings="currentFollowingList">
    </platform-following>
    <!-- 分页 -->
    <paging ref="typeFollowingPaging" :pageNo="params.pageNo" :pageSize="params.pageSize" :total="total" :small="false"
            @sizeChange="sizeChange" @currentChange="currentChange">
    </paging>

  </div>
</template>

<script>
import PlatformTypeName from "@/components/PlatformContent/PlatformTypeName";
import PlatformOpinion from "@/components/PlatformContent/PlatformOpinion";
import PlatformFollowing from "@/components/PlatformContent/PlatformFollowing";
import Paging from "@/components/Common/Paging";
import {getUserFollowingListPage} from "@/api/user";

export default {
  name: "PlatformTypeItem",
  props: ['typeItem'],
  inject: ['isNeedLogin'],
  components: {
    PlatformTypeName,
    PlatformOpinion,
    PlatformFollowing,
    Paging,
  },
  data() {
    return {
      needLogin: true,
      total: 0,
      currentFollowingList: [], // 当前关注用户数据列表
      params: {
        pageNo: 1,
        pageSize: 10
      }
    }
  },
  created() {
    // 校验是否需要登录
    this.needLogin = this.isNeedLogin();
    if (!this.needLogin) { // 登录之后，才加载关注用户数据
      this.getFollowingPage();
    }
  },
  methods: {
    // 获取关注用户分页数据
    getFollowingPage() {
      let params = {
        userId: this.typeItem.userFollowingTypeInfo.userId,
        platformId: this.typeItem.userFollowingTypeInfo.platformId,
        typeId: this.typeItem.userFollowingTypeInfo.id,
        pageNo: this.params.pageNo,
        pageSize: this.params.pageSize
      };
      if (process.env.VUE_APP_ENV !== "prod") {
        console.log(">>>> getFollowingPage params:", JSON.stringify(params));
      }
      getUserFollowingListPage(params).then(res => {
        if (process.env.VUE_APP_ENV !== "prod") {
          //console.log(">>>> getFollowingPage response:", JSON.stringify(res));
        }
        if (res.code === 200) {
          if (!res.data) return;
          this.currentFollowingList = res.data.records;
          this.total = res.data.total;
          this.params.pageNo = res.data.current;
          this.params.pageSize = res.data.size;
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
    },
    // 上一页下一页按钮
    currentChange(val) {
      this.params.pageNo = val;
      this.getFollowingPage();
      this.toTypeAreaStart();
    },
    // 每页显示几条数据按钮
    sizeChange(val) {
      this.params.pageSize = val;
      this.getFollowingPage();
      this.toTypeAreaStart();
    },
    // 跳转到类型开头区域，便于内容查看
    toTypeAreaStart() {
      // 获取关注用户显示区域 item 元素，获取文档中 class="following_item" 的第一个元素，item 元素可能随着内容撑开，高度各部相同
      //let followingItem = document.querySelector(`.following_item`);
      //let followingItemHeight = followingItem.offsetHeight;
      //console.log(">>>> followingItemHeight:", followingItemHeight);
      // 当前类型的分页器距离顶部距离
      let currentPagingElement = this.$refs['typeFollowingPaging'].$el;
      let currentPagingOffsetTop = currentPagingElement.offsetTop;
      //console.log(">>>> currentPagingOffsetTop:", currentPagingOffsetTop);
      let currentPagingOffsetHeight = currentPagingElement.offsetHeight;
      //console.log(">>>> currentPagingOffsetHeight:", currentPagingOffsetHeight);
      // 获取当前分页器父元素 platform_type_item，父元素包含了分页器元素
      let currentPagingElementParent = currentPagingElement.parentNode;
      let currentPagingElementParentHeight = currentPagingElementParent.offsetHeight;
      // 当前页面滚动距离，当前距离会变，
      //let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      //console.log(">>>> toTypeAreaStart scrollTop:", scrollTop);

      // TODO 移动到类型内容开头，便于查看。当前分页器顶部距离 - 类型 item 区域高度(分页器父元素高度 - 分页器自身的高度)
      window.scrollTo(0, currentPagingOffsetTop - (currentPagingElementParentHeight - currentPagingOffsetHeight));
    },
  }
}
</script>

<style scoped>
.platform_type_item {
  margin: 20px 0px 0px 0px;
}
</style>
