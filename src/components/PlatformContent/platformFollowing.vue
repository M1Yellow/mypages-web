<template>
  <div v-if="followings && followings.length > 0" class="platform_following">
    <userFollowingItem v-for="(followingItem, idx) in followings" v-bind:followingItem="followingItem"></userFollowingItem>
  </div>
</template>

<script>
import userFollowingItem from "@/components/PlatformContent/userFollowingItem";

export default {
  name: "platformFollowing",
  props: ['followings'],
  components: {
    userFollowingItem
  }
}
</script>

<style scoped>
.platform_following {
  padding: 10px 0px 20px 0px;
}

</style>
