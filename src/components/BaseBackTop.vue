<template>
  <el-backtop id="back_to_top" :class="itemStyle">
    <svg-icon iconName="arrow-top4" color="#409eff"></svg-icon>
  </el-backtop>
</template>

<script>
import {doAdjustView} from "@/api/global";
import GlobalConstant from '@/constant/GlobalConstant';

export default {
  name: "BaseBackTop",
  data() {
    return {
      itemStyle: {back_to_top: true}
    }
  },
  mounted() {
    // 根据页面缩放比例，调整视图内容
    this.doNewAdjustView();
    // 监听页面缩放
    window.addEventListener('resize', this.doNewAdjustView);
  },
  destroy() {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    window.removeEventListener('resize', this.doNewAdjustView);
  },
  methods: {
    doNewAdjustView() {
      this.initItemClass();
    },
    initItemClass() {
      if (GlobalConstant.isShowH5()) {
        this.itemStyle = {
          back_to_top_h5: true,
        }
      } else {
        this.itemStyle = {
          back_to_top: true,
        }
      }
    },
  },
}
</script>

<style scoped>

</style>
