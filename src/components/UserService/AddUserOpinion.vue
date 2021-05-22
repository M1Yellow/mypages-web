<template>
  <div class="add_opinion">
    <el-dialog :title="getDialogTitle" width="40%" v-model="getDialogVisible" :top="`7vh`"
               :before-close="beforeClose"
               :destroy-on-close="true">
      <el-form ref="addOpinionForm" :model="userOpinion" :rules="rules" label-width="100px">
        <el-form-item label="观点内容">
          <el-input class="add_opinion_content" type="textarea" :autosize="{ minRows: 2, maxRows: 10 }" maxlength="500"
                    show-word-limit
                    prop="opinionContent" v-model="userOpinion.opinionContent"></el-input>
        </el-form-item>
        <el-form-item label="排序优先级">
          <el-select class="add_opinion_select add_opinion_sort"
                     v-model="userOpinion.sortNo" placeholder="-请选择-">
            <el-option v-for="val in sortValues" :label="val" :value="val"></el-option>
          </el-select>
          <span class="add_opinion_desc">（决定类型的显示顺序，10：优先级最高）</span>
        </el-form-item>
        <el-form-item class="func_btn_area">
          <el-button type="primary" class="func_btn_submit" @click="onSubmit('addOpinionForm')">确认</el-button>
          <el-button class="func_btn_cancel" @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {addOpinion} from '@/api/user';
import {getNewObjByJson} from "@/utils";
import {mapActions} from 'vuex';

export default {
  name: "AddUserOpinion",
  inject: ['userId', 'reload'],
  data() {
    return {
      // 用户与关注用户的关联
      userOpinion: {
        // 用户关系表id
        id: null,
        // 用户id
        userId: null,
        // 平台id
        platformId: null,
        // 观点类型id
        opinionType: null,
        // 观点内容
        opinionContent: null,
        // 页面显示优先级，由低到高：1-10，默认5
        sortNo: 5,
      },
      // 平台列表
      platformList: [],
      // 分类类型列表
      typeList: [],
      // 排序优先级，[1, 10] 优先级逐渐递增
      sortValues: [],
      // 校验规则
      rules: {
        opinionContent: [
          {required: true, message: '观点内容不能为空', trigger: 'blur'},
          {max: 500, message: '观点内容不能超过 500 个字符', trigger: 'blur'}
        ]
      },
    }
  },
  created() { // DOM 初始化的时候，可以拿到 provide 的变量

  },
  mounted() {

  },
  computed: {
    getDialogVisible() {
      if (this.$store.state.userOpinion.dialogVisible) { // 为 true，即显示弹窗时，才初始数据
        // 初始化一些数据
        this.initData();
      }
      return this.$store.state.userOpinion.dialogVisible;
    },
    getDialogTitle() {
      return this.$store.state.userOpinion.dialogTitle;
    },
    getUserOpinion() {
      if (this.$store.state.userOpinion.viewItem) {
        return this.$store.state.userOpinion.viewItem;
      }
      return null;
    },
    getSortValues() {
      return this.$store.state.globalProperties.sortValues;
    },
  },
  methods: {
    ...mapActions({
      setDialogVisible: 'userOpinion/setDialogVisible',
      setViewItem: 'userOpinion/setViewItem'
    }),
    initData() {
      // 获取编辑数据
      let viewItem = this.getUserOpinion;
      if (viewItem) {
        // TODO 视图对象不为空，说明是编辑数据，复制一个编辑副本，避免修改还未提交，页面数据就已经动态改变了
        this.userOpinion = getNewObjByJson(viewItem);
      }
      // 设置 userId
      if (!this.userOpinion.userId) {
        this.userOpinion.userId = this.$store.state.userOpinion.instance.userId;
      }
      // 设置 platformId
      if (!this.userOpinion.platformId) {
        this.userOpinion.platformId = this.$store.state.userOpinion.instance.platformId;
      }
      // 设置 opinionType，注意，opinionType 为 0，表示是平台的观点
      if (this.userOpinion.opinionType === null || this.userOpinion.opinionType === undefined) {
        this.userOpinion.opinionType = this.$store.state.userOpinion.instance.opinionType;
      }

      // 获取排序优先级
      this.sortValues = this.getSortValues;

      // 新增操作，重置字段内容
      if (this.$store.state.userOpinion.dialogType === 0) {
        this.$nextTick(() => {
          this.resetForm('addOpinionForm');
        });
      }

    },
    beforeClose(done) {
      this.onCancel();
      done();
    },
    onCancel() {
      this.setDialog();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onSubmit: function (formName) {

      // 校验必须参数
      if (!this.userOpinion.userId) {
        this.$message.error('用户id错误');
        return false;
      }
      if (!this.userOpinion.platformId) {
        this.$message.error('平台id错误');
        return false;
      }
      if (this.userOpinion.opinionType === null || this.userOpinion.opinionType === undefined || this.userOpinion.opinionType < 0) {
        this.$message.error('类型id错误');
        return false;
      }
      if (!this.userOpinion.opinionContent) {
        this.$message.error('观点内容不能为空');
        return false;
      }

      // 处理不需要的参数
      if (this.userOpinion.createTime)
        this.userOpinion.createTime = null;
      if (this.userOpinion.updateTime)
        this.userOpinion.updateTime = null;

      // 封装参数
      let formData = new FormData();
      // 用户信息对象
      for (let key in this.userOpinion) {
        if (this.userOpinion[key] === null) continue;
        formData.append(key, this.userOpinion[key]);
      }

      // 调试，不请求接口
      //if (process.env.VUE_APP_MOCK === "false") return;
      this.doAddOpinion(formData);

    },
    doAddOpinion(formData) {
      // 发起请求
      if (process.env.VUE_APP_ENV !== "prod") {
        console.log(">>>> formData:\n");
        for (let key of formData.keys()) {
          console.log(key + " = " + formData.get(key));
        }
      }

      addOpinion(formData).then(res => {
        if (process.env.VUE_APP_ENV !== "prod") {
          console.log(">>>> addOpinion response:", JSON.stringify(res));
        }
        if (res.code === 200) {

          this.$message({
            type: "success",
            message: res.message
          });

          if (formData.get("id")) { // 有 id，说明是更新操作
            // 页面对象
            let pageItem = this.$store.state.userOpinion.viewItem;
            //console.log(">>>> pageItem:", JSON.stringify(pageItem));
            // 接口返回对象
            let returnItem = res.data;
            //console.log(">>>> returnItem:", JSON.stringify(returnItem));
            //pageItem = returnItem; // 这样无效
            pageItem.opinionContent = returnItem.opinionContent;
            pageItem.sortNo = returnItem.sortNo;

          } else { // 新增记录，需要刷新页面，重新加载数据
            setTimeout(() => {
              this.reload();
            }, 2000);
          }

          // 隐藏弹窗
          this.setDialog();
          // 重置数据
          this.resetParams();

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
    },
    // 设置弹窗
    setDialog() {
      //this.$store.commit('SET_USER_OPINION_DIALOG_VISIBLE', false);
      this.setDialogVisible(false);
    },
    // 重置数据
    resetParams() {
      // 重置表单数据
      this.setViewItem({}); // 指向空对象，指向 null 不生效
    },

  }
}
</script>

<style scoped>
.add_opinion_name {
  width: max-content;
}

.add_opinion_select {
  width: 120px;
}

/* 补充说明样式 */
.add_opinion_desc {
  margin-left: 10px;
  color: #cccccc;
  font-size: 13px;
}

</style>
