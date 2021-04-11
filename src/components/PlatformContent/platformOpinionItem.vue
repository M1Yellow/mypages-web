<template>
  <div v-if="opinionItem" class="platform_opinion_item">
    <vue3-markdown-it v-if="opinionItem.opinionContent" :source="opinionItem.opinionContent" class="markdown-body"/>
  </div>
</template>

<script>
import VueMarkdownIt from 'vue3-markdown-it';

export default {
  name: "platformOpinionItem",
  props: ['opinionItem', 'idx'],
  components: {
    VueMarkdownIt
  }
}
</script>

<style scoped>
.platform_opinion_item {
  padding: 5px;
  margin: 5px;
  background-color: #f5fafa;
  border-radius: 4px;
  cursor: pointer;
  width: fit-content;
}
.platform_opinion_item:hover {
  background-color: #ede4e4;
  -webkit-box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
}

.markdown-body {
  font-size: 14px;
}

</style>
