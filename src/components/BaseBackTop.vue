<template>
  <el-backtop class="back-to-top" :right="163" :bottom="100">
    <i class="el-icon-top"></i>
  </el-backtop>
</template>

<script>
export default {
  name: "BaseBackTop"
}
</script>

<style scoped>
.back-to-top {
  display: flex; /* 弹性布局 */
  justify-content: center; /* 内容调整 */
  align-items: center; /* 居中 */
  font-size: 27px;
  /*color: #909399;*/
  /*background-color: #f2f5f6;*/
  border-radius: unset;
  box-shadow: 0 0 6px rgba(0,0,0,.12);
  line-height: 40px;
}
.back-to-top:hover {
  background-color: unset;
}

</style>
