<template>
  <div v-if="platformItem && platformItem.platformBaseInfo" class="platform_item" v-bind:id="platformItem.platformBaseInfo.name">
    <platform-name v-if="platformItem.platformBaseInfo"
                   v-bind:platformBaseInfo="platformItem.platformBaseInfo"
                   v-bind:userFollowingTypeListSize="platformItem.userFollowingTypeList === null ? 0 : platformItem.userFollowingTypeList.length">
    </platform-name>
    <platform-opinion v-if="platformItem.platformOpinionList && platformItem.platformOpinionList.length > 0"
                     v-bind:opinions="platformItem.platformOpinionList">
    </platform-opinion>
    <platform-type-item v-if="platformItem.userFollowingTypeList && platformItem.userFollowingTypeList.length > 0"
                      v-bind:userFollowingTypeList="platformItem.userFollowingTypeList">
    </platform-type-item>
  </div>
</template>

<script>
import PlatformName from "@/components/PlatformContent/PlatformName";
import PlatformOpinion from "@/components/PlatformContent/PlatformOpinion";
import PlatformTypeItem from "@/components/PlatformContent/PlatformTypeItem";

export default {
  /*
  props 接收静态数据用 this.*
  动态数据用 watch

  vue依赖注入provide - inject实现子组件调用父组件的方法：
  父组件提供provide，允许我们指定我们想要提供给后代组件的数据/方法
  provide: function () {
    return {
       getMap: this.getMap
    }
  }
  子组件使用 inject 选项来接收指定的我们想要添加在这个实例上的属性
  inject: ['getMap']

  缺陷：
  然而，依赖注入还是有负面影响的。它将你应用程序中的组件与它们当前的组织方式耦合起来，使重构变得更加困难。同时所提供的属性是非响应式的。
  这是出于设计的考虑，因为使用它们来创建一个中心化规模化的数据跟使用 $root做这件事都是不够好的。如果你想要共享的这个属性是你的应用特有的，
  而不是通用化的，或者如果你想在祖先组件中更新所提供的数据，那么这意味着你可能需要换用一个像 Vuex 这样真正的状态管理方案了。
  */
  name: "PlatformItem",
  props: ['platformItem'],
  provide() {
    return {
      platformId: this.platformItem.platformBaseInfo.id
    }
  },
  components: {
    PlatformName,
    PlatformOpinion,
    PlatformTypeItem
  },
  methods: {

  },
  watch: {
    /*
    platformItem : function(newData, oldData){
      console.log(newData);
      this.platformId = newData.platformBaseInfo.id;
    }
    */
  }
}
</script>

<style scoped>
/* 每个内容子项目区域 */
.platform_item {
  min-height: 600px;
  margin: 10px;
  background: #fff;
  box-shadow: 0 3px 10px 0 rgba(219, 219, 219, 0.5);
  border-radius: 6px;
}

.platform_item:not(:last-child) {
  /*margin-bottom: 2px;*/
}

.platform_item:last-child {
  margin-bottom: 100px; /* 为了最后一个菜单锚点能定位 */
}

</style>
