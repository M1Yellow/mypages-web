<template>
  <div class="change_following_type">
    <el-dialog title="变更分组" width="40%" v-model="getDialogVisible" :top="`7vh`"
               :before-close="beforeClose"
               :destroy-on-close="true">
      <el-form ref="changeFollowingTypeForm" :model="userFollowingRelation" :rules="rules" label-width="100px">
        <el-form-item label="用户名">
          <el-input class="change_following_type_name" maxlength="20" show-word-limit autosize disabled
                    v-model="userFollowingRelation.name"></el-input>
        </el-form-item>
        <el-form-item label="平台">
          <el-select class="change_following_type_select change_following_type_platform_list"
                     v-model="userFollowingRelation.platformId"
                     placeholder="-请选择-" disabled>
            <el-option v-for="platformItem in platformList" :label="platformItem.name"
                       :value="platformItem.id"></el-option>
          </el-select>
          <span class="change_following_type_desc">（暂不支持修改）</span>
        </el-form-item>
        <el-form-item label="类型">
          <el-select class="change_following_type_select change_following_type_list"
                     v-model="userFollowingRelation.typeId" placeholder="-请选择-">
            <el-option v-for="typeItem in typeList" :label="typeItem.typeName" :value="typeItem.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序优先级">
          <el-select class="change_following_type_select change_following_type_sort"
                     v-model="userFollowingRelation.sortNo" placeholder="-请选择-">
            <el-option v-for="val in sortValues" :label="val" :value="val"></el-option>
          </el-select>
          <span class="change_following_type_desc">（决定类型的显示顺序，10：优先级最高）</span>
        </el-form-item>
        <el-form-item class="func_btn_area">
          <el-button type="primary" class="func_btn_submit" @click="onSubmit('changeFollowingTypeForm')">确认</el-button>
          <el-button class="func_btn_cancel" @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {changType, getPlatformList, getTypeList} from '@/api/user';

export default {
  name: "ChangeFollowingType",
  inject: ['userId', 'reload'],
  data() {
    return {
      // 用户与关注用户的关联
      userFollowingRelation: null,
      // 平台列表
      platformList: [],
      // 分类类型列表
      typeList: [],
      // 排序优先级，[1, 10] 优先级逐渐递增
      sortValues: [],
    }
  },
  created() { // DOM 初始化的时候，可以拿到 provide 的变量

  },
  mounted() {

  },
  computed: {
    getDialogVisible() {
      if (this.$store.state.userFollowingRelation.dialogVisible) { // 为 true，即显示弹窗时，才初始数据
        // 初始化一些数据
        this.initData();
      }
      return this.$store.state.userFollowingRelation.dialogVisible;
    },
    getUserFollowingRelation() {
      if (this.$store.state.userFollowingRelation.userFollowingRelationEdit) {
        return this.$store.state.userFollowingRelation.userFollowingRelationEdit;
      }
      return this.$store.state.userFollowingRelation.newFollowingRelation;
    },
    getSortValues() {
      return this.$store.state.globalProperties.sortValues;
    },
  },
  methods: {
    initData() {
      // 获取编辑数据
      this.userFollowingRelation = this.getUserFollowingRelation;
      // 获取排序优先级
      this.sortValues = this.getSortValues;
      // 加载数据
      this.getData();
    },
    getData() {
      // 请求后端接口，获取数据
      if (this.platformList === null || this.platformList.length < 1) {
        this.initPlatformList();
      }
      if (this.typeList === null || this.typeList.length < 1) {
        this.initTypeList();
      }
    },
    initPlatformList() {
      let params = {
        userId: this.userId
      }
      if (process.env.VUE_APP_ENV !== "prod") {
        console.log(">>>> getPlatformList params: ", JSON.stringify(params));
      }
      getPlatformList(params).then(res => {
        if (process.env.VUE_APP_ENV !== "prod") {
          console.log(">>>> getPlatformList response: ", JSON.stringify(res));
        }
        if (res.code === 200) {

          this.platformList = res.data;
        }
      }).catch(e => {
        console.log(e);
      });
    },
    initTypeList() {
      let params = {
        userId: this.userId
      }
      if (process.env.VUE_APP_ENV !== "prod") {
        console.log(">>>> getTypeList params: ", JSON.stringify(params));
      }
      getTypeList(params).then(res => {
        if (process.env.VUE_APP_ENV !== "prod") {
          console.log(">>>> getTypeList response: ", JSON.stringify(res));
        }
        if (res.code === 200) {

          this.typeList = res.data;
        }
      }).catch(e => {
        console.log(e);
      });
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
      if (!this.userFollowingRelation.id) {
        this.$message.error('记录id错误');
        return false;
      }
      if (!this.userFollowingRelation.userId) {
        this.$message.error('用户id错误');
        return false;
      }
      if (!this.userFollowingRelation.platformId) {
        this.$message.error('平台id错误');
        return false;
      }
      if (!this.userFollowingRelation.typeId) {
        this.$message.error('类型id错误');
        return false;
      }

      // 清空不需要的字段值
      this.userFollowingRelation.createTime = null;
      this.userFollowingRelation.updateTime = null;

      // 封装参数
      let formData = new FormData();
      // 用户信息对象
      for (let key in this.userFollowingRelation) {
        if (this.userFollowingRelation[key] === null) continue;
        formData.append(key, this.userFollowingRelation[key]);
      }

      // 调试，不请求接口
      //if (process.env.VUE_APP_MOCK === "false") return;
      this.doChangeType(formData);

      this.setDialog();
    },
    doChangeType(formData) {
      // 发起请求
      if (process.env.VUE_APP_ENV !== "prod") {
        console.log(">>>> formData:\n");
        for (let key of formData.keys()) {
          console.log(key + " = " + formData.get(key));
        }
      }

      changType(formData).then(res => {
        if (process.env.VUE_APP_ENV !== "prod") {
          console.log(">>>> changType response:", JSON.stringify(res));
        }
        if (res.code === 200) {

          this.$message({
            type: "success",
            message: res.message
          });
          // 修改分类需要刷新页面
          setTimeout(() => {
            this.reload();
          }, 2000);
        } else {
          this.$message({
            type: "warning",
            message: res.message
          });
        }
      }).catch(e => {
        console.log(e);
      });
    },
    // 设置弹窗
    setDialog() {
      this.$store.commit('SET_USER_FOLLOWING_RELATION_DIALOG_VISIBLE', false);
    },
  }
}
</script>

<style scoped>
.change_following_type_name {
  width: max-content;
}

.change_following_type_select {
  width: 120px;
}

/* 补充说明样式 */
.change_following_type_desc {
  margin-left: 10px;
  color: #cccccc;
  font-size: 13px;
}

</style>
