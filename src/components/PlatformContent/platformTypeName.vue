<template>
  <div v-if="userFollowingTypeInfo" class="platform_type_name">
    <span v-if="userFollowingTypeInfo.typeName" class="platform_type_name_area">{{ userFollowingTypeInfo.typeName }}</span>
  </div>
</template>

<script>
export default {
  name: "platformTypeName",
  props: ['userFollowingTypeInfo']
}
</script>

<style scoped>
.platform_type_name {
  text-align: left;
  font-size: 24px;
  font-weight: bold;
  padding: 5px 15px 5px 15px;
}

.platform_type_name_area {
  vertical-align: middle;
}
</style>
