<template>
  <div v-if="platformBaseInfo" class="platform_name_area">
    <a v-if="platformBaseInfo.mainPage" v-bind:href="platformBaseInfo.mainPage" title="前往站点" target="_blank">
      <img v-if="platformBaseInfo.platformLogo" class="platform_logo" v-bind:src="baseApi + platformBaseInfo.platformLogo"/>
    </a>
    <span v-if="platformBaseInfo.name" class="platform_name">{{ platformBaseInfo.name }}</span>
  </div>
</template>

<script>
export default {
  name: "platformName",
  data() {
    return {
      baseApi: this.$global.OSS_URL
    }
  },
  props: ['platformBaseInfo']
}
</script>

<style scoped>
.platform_name_area {
  text-align: left;
  font-size: 30px;
  font-weight: bold;
  padding: 10px 15px 10px 15px;
}

.platform_logo {
  /*display: flex;
  justify-content: center;
  align-items: center;*/
  max-width: 30px;
  vertical-align: middle;
}

.platform_name {
  padding-left: 10px;
  vertical-align: middle;
}
</style>
