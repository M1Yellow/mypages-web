<template>
  <div v-if="userFollowingTypeList && userFollowingTypeList.length > 0" class="platform_type_item"
       v-for="typeItem in userFollowingTypeList">
    <platformTypeName v-if="typeItem && (typeItem.userOpinionList && typeItem.userOpinionList.length > 0
                        || typeItem.userFollowingList && typeItem.userFollowingList.length > 0)"
                      v-bind:userFollowingTypeInfo="typeItem.userFollowingTypeInfo"
                      v-bind:userFollowingListSize="typeItem.userFollowingList.length">
    </platformTypeName>
    <platformOpinion v-if="typeItem && typeItem.userOpinionList && typeItem.userOpinionList.length > 0"
                     v-bind:opinions="typeItem.userOpinionList">
    </platformOpinion>
    <platformFollowing v-if="typeItem && typeItem.userFollowingList && typeItem.userFollowingList.length > 0"
                       v-bind:followings="typeItem.userFollowingList">
    </platformFollowing>
  </div>
</template>

<script>
import platformTypeName from "@/components/PlatformContent/platformTypeName";
import platformOpinion from "@/components/PlatformContent/platformOpinion";
import platformFollowing from "@/components/PlatformContent/platformFollowing";

export default {
  name: "platformTypeItem",
  props: ['userFollowingTypeList'],
  components: {
    platformTypeName,
    platformOpinion,
    platformFollowing
  }
}
</script>

<style scoped>
.platform_type_item {
  margin: 20px 0px 0px 0px;
}
</style>
