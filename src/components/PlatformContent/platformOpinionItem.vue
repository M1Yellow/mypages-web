<template>
  <div v-if="opinionItem" class="platform_opinion_item" v-bind:class="itemStyle" v-on:focusin="changeClass(1)" v-on:focusout="changeClass(0)">
    <el-dropdown trigger="click" placement="bottom-end" visible-arrow="false">
      <VueMarkdownIt v-if="opinionItem.opinionContent" :source="opinionItem.opinionContent" class="markdown-body"/>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item><i class="el-icon-edit"></i>编辑</el-dropdown-item>
          <el-dropdown-item><i class="el-icon-delete"></i>移除</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import VueMarkdownIt from 'vue3-markdown-it';

export default {
  name: "platformOpinionItem",
  props: ['opinionItem', 'idx'],
  data() {
    return {
      itemStyle: {}
    };
  },
  components: {
    VueMarkdownIt
  },
  methods: {
    changeClass(id) {
      //console.log("changeClass >> " + id);
      if (id === 1) {
        /*
        this.itemStyle.backgroundColor = '#f5fafa';
        this.itemStyle.boxShadow = '1px 1px 2px 1px rgba(0, 0, 0, 0.2)';
        */
        // TODO 曲线救国，绑定的 class 只取了对象的 key，结果刚好达到添加、移除 class 的效果。
        this.itemStyle = {platform_opinion_item_selected: 'inherit'};
      } else {
        /*
        this.itemStyle.backgroundColor = 'inherit';
        this.itemStyle.boxShadow = 'inherit';
        */
        this.itemStyle = {};
      }
    }
  }
}
</script>

<style scoped>
.platform_opinion_item {
  padding: 5px;
  margin: 5px;
  /*
  background-color: #f5fafa;
  border-radius: 4px;
  */
  cursor: pointer;
  width: fit-content;
}
.platform_opinion_item:hover {
  border-radius: 2px;
  background-color: #f5fafa;
  /*
  -webkit-box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
  */
}
.platform_opinion_item_selected {
  border-radius: 2px;
  background-color: #f5fafa;
  /*
  -webkit-box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
  */
}

.markdown-body {
  font-size: 15px;
}

</style>
