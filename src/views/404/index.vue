<template>
  <div class="not_found_404">
    <span class="search_code_404">404</span>
    <span class="search_content_area_404">
      <input class="search_input_404" :disabled="true" :placeholder="searchContent" v-model="searchContent"/>
      <span class="search_result_404">not found</span>
    </span>
    <span class="search_btn_area_404">
      <button class="search_btn_404"><i class="el-icon-search"></i>&nbsp;搜索</button>
    </span>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      searchContent: 'easy things',
      searchResult: '404 not found'
    }
  }
}
</script>

<style scoped>
.not_found_404 {
  /*text-align: center;*/
  width: max-content;
  height: 100%;
  margin: 8% auto;
}

.search_code_404 {
  display: block;
  font-size: 100px;
  font-weight: bold;
  color: darkblue;
  margin-bottom: 20px;
  text-align: center;
}
.search_content_area_404 {
  display: inline-block;
  position: relative;
  width: 546px;
  height: 100px;
  padding: 0px 16px;
  zoom: 1;
  background: 0 0;
  vertical-align: top;
  border-radius: 6px 0 0 6px;
  /*border: 2px solid #c4c7ce;*/
  border: 2px solid #4e6ef2;
  background: #fff;
  color: #222;
  overflow: hidden;
  box-sizing: content-box;
}
.search_input_404 {
  width: 100%;
  height: 16px;
  padding: 12px 0px;
  font-size: 16px;
  background: #fff;
  color: #222;
  margin: 0;
  vertical-align: top;
  outline: 0;
  box-shadow: none;
  border-bottom: 1px solid #ccc;
}

.search_result_404 {
  display: inline-block;
  color: #4171f2;
  line-height: 28px;
  margin-top: 10px;
}

.search_btn_area_404 {
  display: inline-block;
  width: 108px;
  height: 44px;
  position: relative;
  z-index: 2;
  zoom: 1;
  background: 0 0;
  vertical-align: top;
}
.search_btn_404 {
  cursor: pointer;
  width: 108px;
  height: 44px;
  line-height: 45px;
  padding: 0;
  background-color: #4e6ef2;
  border-radius: 0 6px 6px 0;
  font-size: 17px;
  color: #fff;
  box-shadow: none;
  font-weight: 400;
  border: none;
  outline: 0;
}
.search_btn_404:hover {
  background-color: #4662d9;
}

</style>
