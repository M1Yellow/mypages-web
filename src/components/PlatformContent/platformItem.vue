<template>
  <div v-if="platformItem && platformItem.platformBaseInfo" class="platform_item" v-bind:id="platformItem.platformBaseInfo.name">
    <platformName v-if="platformItem.platformBaseInfo"
                  v-bind:platformBaseInfo="platformItem.platformBaseInfo"
                  v-bind:userFollowingTypeListSize="platformItem.userFollowingTypeList === null ? 0 : platformItem.userFollowingTypeList.length">
    </platformName>
    <platformOpinion v-if="platformItem.platformOpinionList && platformItem.platformOpinionList.length > 0"
                     v-bind:opinions="platformItem.platformOpinionList">
    </platformOpinion>
    <platformTypeItem v-if="platformItem.userFollowingTypeList && platformItem.userFollowingTypeList.length > 0"
                      v-bind:userFollowingTypeList="platformItem.userFollowingTypeList">
    </platformTypeItem>
  </div>
</template>

<script>
import platformName from "@/components/PlatformContent/platformName";
import platformOpinion from "@/components/PlatformContent/platformOpinion";
import platformTypeItem from "@/components/PlatformContent/platformTypeItem";

export default {
  name: "platformItem",
  props: ['platformItem'],
  components: {
    platformName,
    platformOpinion,
    platformTypeItem
  }
}
</script>

<style scoped>
/* 每个内容子项目区域 */
.platform_item {
  min-height: 600px;
  margin: 10px;
  background: #fff;
  box-shadow: 0 3px 10px 0 rgba(219, 219, 219, 0.5);
  border-radius: 6px;
}

.platform_item:not(:last-child) {
  /*margin-bottom: 2px;*/
}

.platform_item:last-child {
  margin-bottom: 100px; /* 为了最后一个菜单锚点能定位 */
}

</style>
