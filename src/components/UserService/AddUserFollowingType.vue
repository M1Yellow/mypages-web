<template>
  <div class="add_following_type">
    <el-dialog :title="getDialogTitle" v-model="getDialogVisible" :top="`7vh`"
               :before-close="beforeClose"
               :destroy-on-close="true">
      <el-form ref="addFollowingTypeForm" :model="userFollowingType" :rules="rules">
        <el-form-item label="类型名称">
          <el-input class="add_following_type_name" maxlength="20" show-word-limit autosize
                    v-model="userFollowingType.typeName"></el-input>
        </el-form-item>
        <el-form-item label="排序优先级">
          <el-select class="add_following_type_select add_following_type_sort"
                     v-model="userFollowingType.sortNo" placeholder="-请选择-">
            <el-option v-for="val in sortValues" :label="val" :value="val"></el-option>
          </el-select>
          <span class="add_following_type_desc">（决定类型的显示顺序，10：优先级最高）</span>
        </el-form-item>
        <el-form-item class="func_btn_area">
          <el-button type="primary" class="func_btn_submit" @click="onSubmit('addFollowingTypeForm')">确认</el-button>
          <el-button class="func_btn_cancel" @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {addType} from '@/api/user';
import {getNewObjByJson} from "@/utils";
import {mapActions} from 'vuex';
import localStorageUtil from "@/utils/localStorageUtil";

export default {
  name: "AddFollowingType",
  inject: ['userId', 'reload'],
  data() {
    return {
      // 用户与关注用户的关联
      userFollowingType: {
        // 类型id
        id: null,
        // 用户id
        userId: null,
        // 关联平台id
        platformId: null,
        // 类型名称
        typeName: '',
        // 排序优先级
        sortNo: 5
      },
      // 排序优先级，[1, 10] 优先级逐渐递增
      sortValues: [],
    }
  },
  created() { // DOM 初始化的时候，可以拿到 provide 的变量

  },
  mounted() {

  },
  activated() { // 缓存组件被重新调用
    //console.log(">>>> activated() >>>>");
  },
  computed: {
    getDialogVisible() {
      if (this.$store.state.userFollowingType.dialogVisible) { // 为 true，即显示弹窗时，才初始数据
        // 初始化一些数据
        this.initData();
      }
      return this.$store.state.userFollowingType.dialogVisible;
    },
    getDialogTitle() {
      return this.$store.state.userFollowingType.dialogTitle;
    },
    getUserFollowingType() {
      if (this.$store.state.userFollowingType.viewItem) {
        return this.$store.state.userFollowingType.viewItem;
      }
      return null;
    },
    getSortValues() {
      return this.$store.state.globalProperties.sortValues;
    },
  },
  methods: {
    ...mapActions({
      setDialogVisible: 'userFollowingType/setDialogVisible',
      setViewItem: 'userFollowingType/setViewItem'
    }),
    initData() {
      //console.log(">>>> initData() >>>>");
      // 获取编辑数据
      let viewItem = this.getUserFollowingType;
      if (viewItem) {
        // TODO 视图对象不为空，说明是编辑数据，复制一个编辑副本，避免修改还未提交，页面数据就已经动态改变了
        this.userFollowingType = getNewObjByJson(viewItem);
      }
      // 设置 userId
      if (!this.userFollowingType.userId) {
        this.userFollowingType.userId = this.$store.state.userFollowingType.instance.userId;
      }
      // 设置 platformId
      if (!this.userFollowingType.platformId) {
        this.userFollowingType.platformId = this.$store.state.userFollowingType.instance.platformId;
      }
      // 获取排序优先级
      this.sortValues = this.getSortValues;
    },
    beforeClose(done) {
      this.onCancel();
      done();
    },
    onCancel() {
      this.setDialog();
    },
    onSubmit: function (formName) {
      // 校验必须参数
      if (!this.userFollowingType.userId) {
        this.$message.error('用户id错误');
        return false;
      }
      if (!this.userFollowingType.typeName) {
        this.$message.error('类型名称不能为空');
        return false;
      }
      // 用户自己不能添加【默认分类】
      this.userFollowingType.typeName = this.userFollowingType.typeName.trim();
      if (this.userFollowingType.typeName.indexOf("默认分类") > -1) {
        this.$message.error('【默认分类】不支持手动添加');
        return false;
      }

      // 处理不需要的参数
      if (this.userFollowingType.createTime)
        this.userFollowingType.createTime = null;
      if (this.userFollowingType.updateTime)
        this.userFollowingType.updateTime = null;

      // 封装参数
      let formData = new FormData();
      // 用户信息对象
      for (let key in this.userFollowingType) {
        if (this.userFollowingType[key] === null) continue;
        formData.append(key, this.userFollowingType[key]);
      }

      // 调试，不请求接口
      //if (process.env.VUE_APP_MOCK === "false") return;
      this.doAddType(formData);

    },
    doAddType(formData) {
      // 发起请求
      if (process.env.VUE_APP_ENV !== "prod") {
        console.log(">>>> formData:\n");
        for (let key of formData.keys()) {
          console.log(key + " = " + formData.get(key));
        }
      }

      addType(formData).then(res => {
        if (process.env.VUE_APP_ENV !== "prod") {
          console.log(">>>> changType response:", JSON.stringify(res));
        }
        if (res.code === 200) {

          this.$message({
            type: "success",
            //message: res.message
            message: process.env.VUE_APP_FOLLOWING_TYPE_ADD_SUCCESS_MSG
          });

          // TODO 新增或修改类型后清空缓存，后续使用的时候，重新加载数据后再写入缓存
          let cacheKey = this.$GlobalConstant.USER_TYPE_LIST_CACHE_KEY + this.userFollowingType.userId
              + "_" + this.userFollowingType.platformId;
          localStorageUtil.del(cacheKey);

          if (formData.get("id")) { // 有 id，说明是更新操作
            // 页面对象
            let pageItem = this.$store.state.userFollowingType.viewItem;
            //console.log(">>>> pageItem:", JSON.stringify(pageItem));
            // 接口返回对象
            let returnItem = res.data;
            //console.log(">>>> returnItem:", JSON.stringify(returnItem));
            //pageItem = returnItem; // 这样无效
            pageItem.typeName = returnItem.typeName;
            pageItem.sortNo = returnItem.sortNo; // 排序需要刷新后才会改变

          } else { // 新增记录，需要刷新页面，重新加载数据
            setTimeout(() => {
              this.reload();
            }, 2000);
          }

          // 操作成功，隐藏弹窗
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
      //this.$store.commit('SET_USER_FOLLOWING_TYPE_DIALOG_VISIBLE', false);
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
.add_following_type_name {
  width: max-content;
}

.add_following_type_select {
  width: 120px;
}

/* 补充说明样式 */
.add_following_type_desc {
  margin-left: 10px;
  color: #cccccc;
  font-size: 13px;
}

</style>
