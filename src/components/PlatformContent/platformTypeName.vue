<template>
  <div v-if="userFollowingTypeInfo" class="platform_type_name_area">
    <el-row>
      <el-col :span="23">
        <span v-if="userFollowingTypeInfo.typeName" class="platform_type_name" title="点我试试" v-on:click="typeSettingShow = !typeSettingShow">
          {{ userFollowingTypeInfo.typeName }}
        </span>
      </el-col>
      <el-col :span="1" class="more_func">
        <el-dropdown v-if="typeSettingShow">
          <i class="el-icon-setting more_func_btn"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-if="userFollowingListSize && userFollowingListSize > 0"><i class="el-icon-search"></i>批量查询更新</el-dropdown-item>
              <el-dropdown-item v-if="userFollowingListSize && userFollowingListSize > 0"><i class="el-icon-refresh"></i>批量同步信息</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-plus"></i>添加关注用户</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-plus"></i>添加类型观点</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-edit"></i>编辑类型信息</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-delete"></i>移除类型条目</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "platformTypeName",
  props: ['userFollowingTypeInfo', 'userFollowingListSize'],
  data () {
    return {
      typeSettingShow: false
    };
  }
}
</script>

<style scoped>
.platform_type_name_area {
  text-align: left;
  font-size: 24px;
  font-weight: bold;
  padding: 5px 15px 5px 15px;
}

.platform_type_name {
  vertical-align: middle;
  cursor: pointer;
}
</style>
