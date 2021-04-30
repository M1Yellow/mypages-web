<template>
  <div v-if="userFollowingTypeList && userFollowingTypeList.length > 0" class="platform_type_item"
       v-for="typeItem in userFollowingTypeList">
    <platform-type-name v-if="typeItem && (typeItem.userOpinionList && typeItem.userOpinionList.length > 0
                        || typeItem.userFollowingList && typeItem.userFollowingList.length > 0)"
                      v-bind:userFollowingTypeInfo="typeItem.userFollowingTypeInfo"
                      v-bind:userFollowingListSize="typeItem.userFollowingList.length">
    </platform-type-name>
    <platform-opinion v-if="typeItem && typeItem.userOpinionList && typeItem.userOpinionList.length > 0"
                     v-bind:opinions="typeItem.userOpinionList">
    </platform-opinion>
    <platform-following v-if="typeItem && typeItem.userFollowingList && typeItem.userFollowingList.length > 0"
                       v-bind:followings="typeItem.userFollowingList">
    </platform-following>
  </div>
</template>

<script>
import PlatformTypeName from "@/components/PlatformContent/PlatformTypeName";
import PlatformOpinion from "@/components/PlatformContent/PlatformOpinion";
import PlatformFollowing from "@/components/PlatformContent/PlatformFollowing";

export default {
  name: "PlatformTypeItem",
  props: ['userFollowingTypeList'],
  components: {
    PlatformTypeName,
    PlatformOpinion,
    PlatformFollowing
  }
}
</script>

<style scoped>
.platform_type_item {
  margin: 20px 0px 0px 0px;
}
</style>
