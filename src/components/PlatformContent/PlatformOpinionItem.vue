<template>
  <div v-if="opinionItem && opinionItem.opinionContent" class="platform_opinion_item" v-bind:class="itemStyle"
       v-on:focusin="changeClass(1)"
       v-on:focusout="changeClass(0)">
    <el-dropdown trigger="click" placement="bottom-end" visible-arrow="false">
      <div v-if="opinionItem.opinionContent" class="markdown-body" v-html="md.render(opinionItem.opinionContent)"/>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-on:click="editOpinion(opinionItem)">
            <svg-icon iconName="bianji"></svg-icon>编辑
          </el-dropdown-item>
          <el-dropdown-item v-on:click="removeOpinion(opinionItem)">
            <svg-icon iconName="shanchu"></svg-icon>移除
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import {removeOpinion} from '@/api/user';
import {mapActions} from 'vuex';

const markdown = require('markdown-it')()
            .use(require('markdown-it-mark'));


export default {
  name: "PlatformOpinionItem",
  props: ['opinionItem', 'idx'],
  inject: ['showUnfinishedDialog'],
  data() {
    return {
      itemStyle: {},
      md: markdown
    };
  },
  components: {
    //MarkdownIt
  },
  methods: {
    ...mapActions({
      // 新增或编辑观点
      setOpinionDialogVisible: 'userOpinion/setDialogVisible',
      setOpinionDialogType: 'userOpinion/setDialogType',
      setOpinionDialogTitle: 'userOpinion/setDialogTitle',
      setOpinionInstanceUserId: 'userOpinion/setInstanceUserId',
      setOpinionInstancePlatformId: 'userOpinion/setInstancePlatformId',
      setOpinionInstanceOpinionType: 'userOpinion/setInstanceOpinionType',
      setOpinionViewItem: 'userOpinion/setViewItem',

    }),
    changeClass(id) {
      //console.log("changeClass >> " + id);
      if (id === 1) {
        this.itemStyle = {platform_opinion_item_selected: true};
      } else {
        this.itemStyle = {platform_opinion_item_selected: false};
      }
    },
    beforeOperation(item) {
      // 保存原来页面对象
      //this.$store.commit('SET_USER_OPINION_VIEW_ITEM', item);
      this.setOpinionViewItem(item);
    },
    editOpinion(opinionItem) {
      this.beforeOperation(opinionItem);
      this.setOpinionDialogVisible(true);
      this.setOpinionDialogType(1);
      this.setOpinionDialogTitle('编辑观点');
    },
    removeOpinion(opinionItem) {

      if (!opinionItem || !opinionItem.opinionContent) {
        this.$message.error('观点数据错误');
        return false;
      }

      let content = opinionItem.opinionContent;
      let showLength = this.$GlobalConstant.MSG_CONTENT_LENGTH;
      if (content && content.length > showLength) {
        content = content.substring(0, showLength) + '...';
      }

      this.$confirm('<span><b>确认移除本条观点？</b></span><br><span>' + content + '</span>', '提示', {
        // TODO message 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 XSS 攻击。
        //  因此在 dangerouslyUseHTMLString 打开的情况下，请确保 message 的内容是可信的，永远不要将用户提交的内容赋值给 message 属性。
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        type: 'warning'
      }).then(() => {

        this.beforeOperation(opinionItem);

        // 封装参数
        let params = {
          userId: opinionItem.userId,
          id: opinionItem.id
        }
        if (process.env.VUE_APP_ENV !== "prod") {
          console.log(">>>> removeOpinion params:", JSON.stringify(params));
        }
        this.doRemoveOpinion(params);
      }).catch(() => {

      });
    },
    doRemoveOpinion(params) {
      removeOpinion(params).then(res => {
        if (process.env.VUE_APP_ENV !== "prod") {
          console.log(">>>> removeOpinion response:", JSON.stringify(res));
        }
        if (res.code === 200) {
          // 移除成功，直接替换绑定对象内容，动态更新
          // 页面对象
          let pageItem = this.$store.state.userOpinion.viewItem;
          //console.log(">>>> pageItem:", JSON.stringify(pageItem));
          pageItem.opinionContent = null;

          this.$message({
            type: "success",
            message: res.message
          });
          /*
          setTimeout(() => {
            this.reload();
          }, 2000);
          */
        } else {
          this.$message({
            type: "warning",
            message: res.message
          });
        }
      }).catch(e => {
        if (process.env.VUE_APP_ENV !== "prod") {
          console.log(e);
        }
      });
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
  background-color: unset !important;
}

</style>
