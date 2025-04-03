<template>
  <div class="change_following_type">
    <el-dialog title="变更分组" v-model="getDialogVisible" :top="`7vh`"
               :before-close="beforeClose"
               :destroy-on-close="true">
      <el-form ref="changeFollowingTypeForm" :model="userFollowingRelation" label-position="right" label-width="auto">
        <el-form-item label="用户名">
          <el-input class="change_following_type_name" maxlength="20" show-word-limit autosize disabled
                    v-model="userFollowingRelation.name" size="large"></el-input>
        </el-form-item>
        <el-form-item label="平台">
          <el-select class="change_following_type_select change_following_type_platform_list"
                     v-model="userFollowingRelation.platformId"
                     placeholder="-请选择-" size="large" disabled>
            <el-option v-for="platformItem in platformList" :label="platformItem.name"
                       :value="platformItem.platformId"></el-option>
          </el-select>
          <span class="change_following_type_desc">（暂不支持修改）</span>
        </el-form-item>
        <el-form-item label="类型">
          <el-select class="change_following_type_select change_following_type_list"
                     v-model="userFollowingRelation.typeId" placeholder="-请选择-" size="large">
            <el-option v-for="typeItem in typeList" :label="typeItem.typeName" :value="typeItem.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序优先级">
          <!--
          <el-select class="change_following_type_select change_following_type_sort"
                     v-model="userFollowingRelation.sortNo" placeholder="-请选择-">
            <el-option v-for="val in sortValues" :label="val" :value="val"></el-option>
          </el-select>
          -->
          <el-input class="change_following_type_select change_following_type_sort" maxlength="3" show-word-limit autosize
                    v-model="userFollowingRelation.sortNo" placeholder="0~100" size="large"></el-input>
          <span class="change_following_type_desc">（优先级由低到高：0~100）</span>
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
import {changType} from '@/api/user';
import {getUserFollowingTypeList, getUserPlatformList} from '@/api/global';
import {mapActions} from "vuex";
import {getNewObjByJson} from "@/utils";

export default {
  name: "ChangeFollowingType",
  inject: ['userId', 'reload'],
  data() {
    return {
      // 当前弹窗显示状态
      currentDialogVisible: false,
      // 用户与关注用户的关联
      userFollowingRelation: {
        // 用户关系表id
        id: null,
        // 用户id
        userId: null,
        // 关注用户表id
        followingId: null,
        // 平台id
        platformId: null,
        // 类型id
        typeId: null,
        // 页面显示优先级，由低到高：1-10，默认5
        sortNo: 5,
      },
      // 原始类型id，用于变更分组后续操作
      oldTypeId: null,
      // 平台列表
      platformList: null,
      // 分类类型列表
      typeList: null,
      // 排序优先级，[1, 10] 优先级逐渐递增
      sortValues: [],
    }
  },
  created() { // DOM 初始化的时候，可以拿到 provide 的变量

  },
  mounted() {

  },
  computed: {
    // 新增一个 currentDialogVisible 变量，防止 v-model="getDialogVisible" 触发多次，
    // 为什么会触发多次？可能因为 getDialogVisible() 方法中计算的属性太多了，只要其中有属性值变化，就会触发方法执行
    getDialogVisible() {
      if (!this.currentDialogVisible && this.$store.state.userFollowingRelation.dialogVisible) { // 为 true，即显示弹窗时，才初始数据
        // 初始化一些数据
        this.initData();
        this.currentDialogVisible = true;
      }
      return this.$store.state.userFollowingRelation.dialogVisible;
    },
    getUserFollowingRelation() {
      if (this.$store.state.userFollowingRelation.viewItem) {
        return this.$store.state.userFollowingRelation.viewItem;
      }
      return null;
    },
    getSortValues() {
      return this.$store.state.globalProperties.sortValues;
    },
  },
  methods: {
    ...mapActions({
      setDialogVisible: 'userFollowingRelation/setDialogVisible',
      setViewItem: 'userFollowingRelation/setViewItem'
    }),
    initData() {
      // 获取编辑数据
      let viewItem = this.getUserFollowingRelation;
      if (viewItem) {
        // TODO 视图对象不为空，说明是编辑数据，复制一个编辑副本，避免修改还未提交，页面数据就已经动态改变了
        this.userFollowingRelation = getNewObjByJson(viewItem);
      }
      // 设置 userId
      if (!this.userFollowingRelation.userId) {
        this.userFollowingRelation.userId = this.$store.state.userFollowingRelation.instance.userId;
      }
      // 设置 platformId
      if (!this.userFollowingRelation.platformId) {
        this.userFollowingRelation.platformId = this.$store.state.userFollowingRelation.instance.platformId;
      }
      // 设置 followingId
      if (!this.userFollowingRelation.followingId) {
        this.userFollowingRelation.followingId = this.$store.state.userFollowingRelation.instance.followingId;
      }
      // 设置原始类型id
      if (this.userFollowingRelation.typeId) {
        this.oldTypeId = this.userFollowingRelation.typeId;
      }

      // 获取排序优先级
      this.sortValues = this.getSortValues;
      // 加载数据
      this.getData();
    },
    getData() {
      // 请求后端接口，获取数据
      // TODO 注意，[] 空数组校验为 true
      if (!this.platformList || this.platformList.length < 1) {
        this.initPlatformList();
      }
      if (!this.typeList || this.typeList.length < 1) {
        this.initTypeList();
      }
    },
    initPlatformList() {
      this.platformList = getUserPlatformList(this.userFollowingRelation.userId);
    },
    initTypeList() {
      this.typeList = getUserFollowingTypeList(this.userFollowingRelation.userId, this.userFollowingRelation.platformId);
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
      if (!this.userFollowingRelation.sortNo) {
        //this.$message.error('优先级不能为空');
        //return false;
        this.userFollowingRelation.sortNo = 50;
      }
      if (!/^[0-9]*$/.test(this.userFollowingRelation.sortNo) || this.userFollowingRelation.sortNo < 0 || this.userFollowingRelation.sortNo > 100) {
        this.$message.error('优先级范围：0~100');
        return false;
      }

      // 清空不需要的字段值
      if (this.userFollowingRelation.createTime)
        this.userFollowingRelation.createTime = null;
      if (this.userFollowingRelation.updateTime)
        this.userFollowingRelation.updateTime = null;

      // 封装参数
      let formData = new FormData();
      // 用户信息对象
      for (let key in this.userFollowingRelation) {
        if (this.userFollowingRelation[key] === null) continue;
        formData.append(key, this.userFollowingRelation[key]);
      }

      // 补充原始类型id
      if (this.oldTypeId) {
        formData.append("oldTypeId", this.oldTypeId);
      }

      this.doChangeType(formData);

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
      //this.$store.commit('SET_USER_FOLLOWING_RELATION_DIALOG_VISIBLE', false);
      this.setDialogVisible(false);
      // 重置弹窗标识
      this.currentDialogVisible = false;
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
.change_following_type_name {
  width: max-content;
}

.change_following_type_select {
  width: 120px;
}

/* 补充说明样式 */
.change_following_type_desc {
  /*margin-left: 10px;*/
  color: #cccccc;
  font-size: 13px;
}

</style>
