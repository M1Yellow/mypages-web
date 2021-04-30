<template>
  <div id="global_common_components" class="global_common_components">
    <!-- 添加关注用户的弹窗 -->
    <add-following></add-following>
  </div>
</template>

<script>
import AddFollowing from "@/components/UserService/AddFollowing/index";

export default {
  name: "CommonItem",
  components: {
    AddFollowing
  }
}
</script>

<style scoped>

</style>
