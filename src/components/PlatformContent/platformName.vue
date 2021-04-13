<template>
  <div v-if="platformBaseInfo" class="platform_name_area">
    <el-row>
      <el-col :span="23">
        <a v-if="platformBaseInfo.mainPage" v-bind:href="platformBaseInfo.mainPage" title="前往站点" target="_blank">
          <img v-if="platformBaseInfo.platformLogo" class="platform_logo" v-bind:src="baseApi + platformBaseInfo.platformLogo"/>
        </a>
        <span v-if="platformBaseInfo.name" class="platform_name" title="点我试试" v-on:click="platformNameShow = !platformNameShow">
          {{ platformBaseInfo.name }}
        </span>
      </el-col>
      <el-col :span="1" class="more_func">
        <el-dropdown v-if="platformNameShow">
          <i class="el-icon-setting more_func_btn"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-if="userFollowingTypeListSize && userFollowingTypeListSize > 0"><i class="el-icon-search"></i>批量查询更新</el-dropdown-item>
              <el-dropdown-item v-if="userFollowingTypeListSize && userFollowingTypeListSize > 0"><i class="el-icon-refresh"></i>批量同步信息</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-plus"></i>添加类型条目</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-plus"></i>添加平台观点</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-edit"></i>编辑平台信息</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-delete"></i>移除平台条目</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "platformName",
  data() {
    return {
      baseApi: process.env.VUE_APP_BASE_API,
      platformNameShow: false
    }
  },
  props: ['platformBaseInfo', 'userFollowingTypeListSize']
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
  cursor: pointer;
}
</style>
