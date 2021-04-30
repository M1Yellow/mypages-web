<template>
  <div v-if="followings && followings.length > 0" class="platform_following">
    <user-following-item v-for="(followingItem, idx) in followings" v-bind:followingItem="followingItem"></user-following-item>
  </div>
</template>

<script>
import UserFollowingItem from "@/components/PlatformContent/UserFollowingItem";

export default {
  name: "PlatformFollowing",
  props: ['followings'],
  components: {
    UserFollowingItem
  }
}
</script>

<style scoped>
.platform_following {
  padding: 10px 0px 20px 0px;
}

</style>
