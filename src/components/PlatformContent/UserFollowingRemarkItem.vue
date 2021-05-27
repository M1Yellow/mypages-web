<template>
  <span v-if="followingRemarkItem" class="following_remark_item">{{ followingRemarkItem.labelName }}</span>
</template>

<script>
export default {
  name: "UserFollowingRemarkItem",
  props: ['followingRemarkItem']
}
</script>

<style scoped>
.following_remark_item {
  float: left !important;
  margin: 3px 7px 3px 0px;
  padding: 3px 5px;
  font-size: 13px;
  color: ghostwhite;
  background-color: skyblue;
  /*border-radius: 4px;*/
}

</style>
