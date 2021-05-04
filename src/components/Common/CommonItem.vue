<template>
  <div id="global_common_components" class="global_common_components">
    <!-- 添加关注用户的弹窗 -->
    <add-following></add-following>
    <!-- 修改关注用户类型的弹窗 -->
    <change-following-type></change-following-type>
  </div>
</template>

<script>
import AddFollowing from "@/components/UserService/AddFollowing/index";
import ChangeFollowingType from "@/components/UserService/ChangeFollowingType";

export default {
  name: "CommonItem",
  components: {
    AddFollowing,
    ChangeFollowingType
  }
}
</script>

<style scoped>

</style>
