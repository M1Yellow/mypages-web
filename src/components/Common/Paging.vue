<template>
  <div class="pagination">
    <el-pagination @size-change="sizeChange" @current-change="currentChange" :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
      layout="prev, pager, next" :current-page="pageNo" :page-size="pageSize" :total="total" :small="small"
      :background="true" :hide-on-single-page="true">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Paging",
  // 子组件接收父组件的值
  props: {
    'total': {   // 总条目数
      required: false, // 是否必须
      default: 0 // 默认值
    },
    'pageNo': {
      required: false, // 是否必须
      default: 1 // 默认值第一页
    },
    'pageSize': {
      required: false, // 是否必须
      default: 10 // 默认值（默认显示10条）
    },
    'small': { // 是否使用小型分页样式
      required: false, // 是否必须
      type: Boolean, // 类型
      default: false // 默认值
    }
  },
  methods: {
    // 当前页变化
    currentChange(val) {
      // console.log(val);
      // 子组件向父组件传值
      this.$emit('currentChange', val);
    },
    // size变化
    sizeChange(val) {
      // console.log(val);
      // 子组件向父组件传值
      this.$emit("sizeChange", val);
    },
  }
}
</script>

<style scoped>
.pagination {
  padding: 0 0 20px 0;
  text-align: center;
}

/* 居中显示 */
.el-pagination {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
}

/* 页码按钮背景颜色 使用组件穿透（深度修改css） */
::v-deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
  background-color: mediumseagreen;
  color: #fff;
}

::v-deep(.el-pagination.is-background .el-pager li:not(.disabled, .active):hover) {
  background-color: mediumseagreen;
  color: #fff;
}

::v-deep(.el-pagination.is-background .el-pager li.is-active) {
    background-color: mediumseagreen;
    color: #fff;
}
</style>
