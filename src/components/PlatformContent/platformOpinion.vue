<template>
  <div v-if="isShow && opinions && opinions.length > 0" class="platform_opinion">
    <platformOpinionItem v-for="(opinionItem, idx) in opinions" v-bind:opinionItem="opinionItem" v-bind:idx="idx"></platformOpinionItem>
  </div>
  <div v-if="isShow" class="opinion_up_down"><i class="el-icon-d-arrow-right opinion_up" title="收起" v-on:click="opinionToggle"></i></div>
  <div v-if="!isShow" class="opinion_up_down"><i class="el-icon-d-arrow-left opinion_down" title="展开" v-on:click="opinionToggle"></i></div>
</template>

<script>
import platformOpinionItem from "@/components/PlatformContent/platformOpinionItem";

export default {
  name: "platformOpinion",
  data() {
    return {
      isShow: true // 是否展开显示，默认是
    };
  },
  props: ['opinions'],
  components: {
    platformOpinionItem
  },
  methods: {
    opinionToggle(e) {
      //console.log(e.target.parentNode.parentNode);
      this.isShow = !this.isShow;
      if (this.isShow) { // 展开
        //e.target.parentNode.parentNode.visible = true; // 无效
      } else { // 收起
        //e.target.parentNode.parentNode.visible = false;
      }
    }
  }
}
</script>

<style scoped>
.platform_opinion {
  padding: 5px 10px 5px 10px;
}

.opinion_up_down {
  text-align: center;
}

.opinion_up, .opinion_down {
  cursor: pointer;
  /*padding: 5px;*/
  color: #ccc;
  transform: rotate(-90deg); /* 逆时针旋转90° */
}

</style>
