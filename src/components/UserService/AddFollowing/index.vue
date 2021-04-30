<template>
  <div class="add_following">
    <el-dialog :title="getDialogTitle" v-model="getDialogVisible" :top="`7vh`"
               :before-close="beforeClose"
               :destroy-on-close="true">
      <el-form ref="addFollowingForm" :model="userFollowing" :rules="rules" label-width="100px">
        <el-form-item label="是否为用户">
          <el-radio-group v-model="userFollowing.isUser" :value="true" prop="isUser" v-on:change="isUserRadioChange">
            <el-radio :label="true">用户</el-radio>
            <el-radio :label="false">非用户</el-radio>
          </el-radio-group>
          <span class="add_following_desc">（非用户须手动录入信息，注意别都选用户）</span>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input class="add_following_name" maxlength="20" show-word-limit autosize
                    v-model="userFollowing.name"></el-input>
        </el-form-item>
        <el-form-item label="用户主页" prop="mainPage">
          <el-input class="add_following_homepage" maxlength="100" show-word-limit autosize
                    v-model="userFollowing.mainPage"></el-input>
        </el-form-item>
        <el-form-item label="个性签名" prop="signature" v-if="!userFollowing.isUser">
          <el-input type="textarea" maxlength="200" show-word-limit v-model="userFollowing.signature"></el-input>
        </el-form-item>
        <el-form-item label="排序优先级" prop="sortNo">
          <el-select class="add_following_sort" v-model="userFollowing.sortNo" placeholder="-请选择-">
            <el-option v-for="val in addFollowingSortValues" :label="val" :value="val"></el-option>
          </el-select>
          <span class="add_following_desc">（决定用户的显示顺序，10：优先级最高）</span>
        </el-form-item>
        <el-form-item label="标签备注" v-model="userFollowing.remarkList">
          <el-tag
              :key="tag"
              v-for="tag in userFollowing.remarkList"
              closable
              :disable-transitions="false"
              @click="showEditInput(tag)"
              @close="handleClose(tag)">
            <span v-if="!tag.inputEditVisible">{{ tag.labelName }}</span>
            <el-input
                class="input-edit-tag"
                v-if="tag.inputEditVisible"
                v-model="inputEditValue"
                ref="saveEditTagInput"
                size="small"
                maxlength="20"
                @keyup.enter.native="handleEditInputConfirm(tag)"
                @blur="handleEditInputConfirm(tag)"
            >
            </el-input>
          </el-tag>
          <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              maxlength="20"
              @keyup.enter.native="handleInputConfirm()"
              @blur="handleInputConfirm()"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新建</el-button>
        </el-form-item>
        <el-form-item label="用户头像" prop="profilePhoto" v-if="!userFollowing.isUser">
          <el-upload
              class="avatar-uploader"
              ref="upload"
              accept="image/jpeg,image/png,image/gif"
              :show-file-list="false"
              :auto-upload="false"
              :http-request="handUpload"
              :before-upload="beforeUpload"
              :on-exceed="handleExceed"
              :on-change="onFileStateChange"
              :on-success="handleAvatarSuccess"
          >
            <img v-if="imageUrl || userFollowing.profilePhoto"
                 :src="imageUrl ? imageUrl : baseApi + userFollowing.profilePhoto" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span class="add_following_desc">（文件类型：jpg/jpeg/png/gif；文件大小：不超过 3M）</span>
          <!--
          <el-upload
              class="add_following_profile"
              action="https://jsonplaceholder.typicode.com/posts/"
              accept="image/jpeg,image/png,image/gif"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :before-upload="beforeUpload"
              :auto-upload="false"
              :limit="1"
              :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <template #tip>
              <div class="el-upload__tip">文件类型：jpg/jpeg/png/gif；文件大小：不超过 3M</div>
            </template>
          </el-upload>
          -->
        </el-form-item>
        <el-form-item class="func_btn_area">
          <el-button type="primary" class="func_btn_submit" @click="onSubmit('addFollowingForm')">确认</el-button>
          <el-button class="func_btn_cancel" @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {addFollowing} from '@/api/user';
import {getNewObjByJson} from '@/utils/index';
import {validateURL} from '@/utils/validate';

export default {
  name: "AddFollowing",
  props: [],
  inject: ['reload'],
  data() {
    let validateUrl = (rule, value, callback) => {
      if (value.trim() === '') {
        //callback(new Error('用户主页不能为空'));
      } else {
        if (!validateURL(value)) {
          callback(new Error('请输入正确的网页地址'));
        }
        callback();
      }
    };
    return {
      // 用户信息封装对象
      userFollowing: null,
      // 头像文件
      //profile: null,
      // 标签列表（临时存储）
      //remarks: this.userFollowing.remarkList,
      // 排序值
      addFollowingSortValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      // 新增标签
      inputVisible: false,
      inputValue: '',
      inputEditValue: '',
      // 原始标签备份，用于控制不重复添加标签
      originalRemarkList: [],
      // 文件上传
      fileList: [],
      imageUrl: '',
      // 用于判断文件提交方法是否执行完成
      isFileSelected: false,
      // 跨域请求地址前缀
      baseApi: process.env.VUE_APP_BASE_API,
      // 校验规则
      rules: {
        name: [
          {required: true, message: '用户名称不能为空', trigger: 'blur'},
          {max: 20, message: '长度不能超过 20 个字符', trigger: 'blur'}
        ],
        mainPage: [
          {required: true, message: '用户主页不能为空', trigger: 'blur'},
          //{type: 'url', message: '请输入正确的网页地址', trigger: ['blur', 'change'] },
          //{max: 100, message: '长度不超过 100 个字符', trigger: 'blur'}
          // 使用自定义校验
          {validator: validateUrl, trigger: ['blur', 'change']}
        ]
      }
    }
  },
  // 属性计算
  computed: { // TODO 注意，这里面的方法会多次调用！！因为 v-mode 为双向绑定，方法内的属性变了，方法会再次执行
    getDialogVisible() {
      if (this.$store.state.userFollowing.dialogVisible) { // 为 true，即显示弹窗时，才初始数据
        // 初始化一些数据
        this.initData();
      }
      return this.$store.state.userFollowing.dialogVisible;
    },
    getDialogTitle() {
      return this.$store.state.userFollowing.dialogTitle;
    },
    getUserFollowing() {
      if (!this.$store.state.userFollowing.userFollowingEdit) { // userFollowingEdit 为 null
        return this.$store.state.userFollowing.newFollowing;
      }
      return this.$store.state.userFollowing.userFollowingEdit;
    }
  },
  methods: {
    initData() {
      // 获取编辑用户数据
      this.userFollowing = this.getUserFollowing;
      // 备份原来的标签，避免重复添加
      this.backRemarkList();
      //console.log(">>>> isFileSelected: ", this.isFileSelected);
    },
    isUserRadioChange: function (val) {
      //console.log(val);

    },
    beforeClose(done) {
      this.onCancel();
      done();
    },
    onSubmit: function (formName) {
      //console.log("formName: ", formName);
      // 组件自带规则校验
      this.$refs[formName].validate((valid) => {
        //console.log("valid: ", valid);
        if (!valid) return false; // TODO 这里有坑，校验不通过，竟然没返回，还继续往下执行！
      });

      // 校验必须参数
      if (!this.userFollowing.userId) {
        this.$message.error('用户类型错误');
        return false;
      }
      if (!this.userFollowing.platformId) {
        this.$message.error('平台类型错误');
        return false;
      }
      if (!this.userFollowing.typeId) {
        this.$message.error('关注用户类型错误');
        return false;
      }
      if (!this.userFollowing.name) {
        //this.$message.error('用户名不能为空');
        return false;
      }
      if (!this.userFollowing.mainPage) {
        //this.$message.error('用户主页不能为空');
        return false;
      }
      if (!validateURL(this.userFollowing.mainPage)) {
        //this.$message.error('请输入正确的网页地址');
        return false;
      }

      // 封装标签列表
      if (this.userFollowing && this.userFollowing.remarkList && this.userFollowing.remarkList.length > 0) {
        for (let i = 0; i < this.userFollowing.remarkList.length; i++) {
          // this.userFollowing.remarkList[i].id // 有则更新，无则新增
          if (!this.userFollowing.remarkList[i].userId) {
            this.userFollowing.remarkList[i].userId = this.userFollowing.userId;
          }
          if (!this.userFollowing.remarkList[i].followingId) {
            this.userFollowing.remarkList[i].followingId = this.userFollowing.followingId;
          }
          // 标签顺序，按编辑列表从左到右顺序
          this.userFollowing.remarkList[i].sortNo = this.userFollowing.remarkList.length - i;
          this.userFollowing.remarkList[i].createTime = null;
          this.userFollowing.remarkList[i].updateTime = null;
        }
        this.userFollowing.remarkListJson = JSON.stringify(this.userFollowing.remarkList);
      }

      // 清空不需要的字段值
      this.userFollowing.createTime = null;
      this.userFollowing.updateTime = null;
      this.userFollowing.remarkList = null;

      // 通过 FormData 对象上传文件及数据
      let formData = new FormData();
      // 用户信息对象
      for (let key in this.userFollowing) {
        if (this.userFollowing[key] === null) continue;
        formData.append(key, this.userFollowing[key]);
      }

      // 判断是否为非用户，只有非用户需要手动上传，用户会自动从主页获取
      //console.log(">>>> isUser:" + this.userFollowing.isUser);
      if (this.userFollowing.isUser) { // 用户只提交用户信息
        // 调试，不请求接口
        //if (process.env.VUE_APP_MOCK === "false") return;
        this.doAddFollowing(formData);

      } else { // 非用户除了提交用户信息，还要上传头像
        // TODO 如果文件提交方法没有执行，则执行信息保存方法
        if (this.isFileSelected) { // 有选择新文件，走文件提交方法
          this.submitUpload();
        } else { // 否则，走信息保存方法
          this.doAddFollowing(formData);
        }
      }

      this.setDialog();
    },
    onCancel() {
      this.setDialog();
    },
    // 设置弹窗
    setDialog() {
      this.$store.commit('SET_USER_FOLLOWING_DIALOG_VISIBLE', false);
    },

    /* 标签操作 */
    backRemarkList() {
      if (this.userFollowing && this.userFollowing.remarkList) {
        // 备份标签
        if (this.originalRemarkList && this.originalRemarkList.length > 0) {
          return;
        }
        this.originalRemarkList = getNewObjByJson(this.userFollowing.remarkList);
        //console.log(JSON.stringify(this.userFollowing.remarkList));
      }
    },
    handleClose(tag) {
      //console.log(">>>> before remove:" + JSON.stringify(this.userFollowing.remarkList));
      if (this.userFollowing.remarkList === null) {
        this.userFollowing.remarkList = [];
      }
      if (this.userFollowing.remarkList.length < 1) {
        return;
      }
      this.userFollowing.remarkList.splice(this.userFollowing.remarkList.indexOf(tag), 1);
      //console.log(">>>> after remove:" + JSON.stringify(this.userFollowing.remarkList));
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    showEditInput(tag) {
      tag.inputEditVisible = true;
      this.inputEditValue = tag.labelName;
      this.$nextTick(_ => {
        this.$refs.saveEditTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      if (this.inputValue) {
        this.inputValue = this.inputValue.trim();
        // TODO 新增标签，因为删除和编辑在一个地方，先把标签全删了，再新建几个一样名称的标签，得考虑这种情况的处理
        // 判断标签是否已存在于当前编辑标签列表
        for (let i in this.userFollowing.remarkList) {
          if (this.inputValue === this.userFollowing.remarkList[i].labelName.trim()) {
            this.$message({
              type: "warning",
              message: '标签【' + this.inputValue + '】已存在！'
            });
            return;
          }
        }
        // 判断标签是否已存在原始标签列表，存在则取用原id，避免重复新增
        let labelId = null;
        //console.log(">>>> originalRemarkList: " + JSON.stringify(this.originalRemarkList));
        for (let i in this.originalRemarkList) {
          if (this.inputValue === this.originalRemarkList[i].labelName.trim()) {
            //console.log("已存在原始标签：" + this.originalRemarkList[i].labelName.trim());
            // 进一步判断 id 是否已存在于新编辑标签列表，避免id重复，导致最后保存结果不一致
            if (this.userFollowing.remarkList && this.userFollowing.remarkList.length > 0) {
              for (let j in this.userFollowing.remarkList) {
                if (this.originalRemarkList[i].id === this.userFollowing.remarkList[j].id) {
                  break;
                }
                labelId = this.originalRemarkList[i].id;
              }
            } else {
              labelId = this.originalRemarkList[i].id;
            }
          }
        }
        // 新建标签
        let newRemark = {
          id: labelId,
          labelName: this.inputValue,
          inputEditVisible: false
        };
        if (this.userFollowing.remarkList === null) {
          this.userFollowing.remarkList = [];
        }
        this.userFollowing.remarkList.push(newRemark);
        //console.log(JSON.stringify(this.userFollowing.remarkList));
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    handleEditInputConfirm(tag) {
      if (this.inputEditValue && this.inputEditValue.trim()) {
        this.inputEditValue = this.inputEditValue.trim();
        // 判断标签是否已存在于当前编辑标签列表
        for (let i in this.userFollowing.remarkList) {
          if (Number(i) === this.userFollowing.remarkList.indexOf(tag)) continue;
          if (this.inputEditValue === this.userFollowing.remarkList[i].labelName.trim()) {
            this.$message({
              type: "warning",
              message: '标签【' + this.inputEditValue + '】已存在！'
            });
            return;
          }
        }
        // 设置标签
        tag.labelName = this.inputEditValue;
      }
      tag.inputEditVisible = false;
      this.inputEditValue = '';
    },

    /* 文件上传 */
    handleRemove(file, fileList) {
      //console.log(file, fileList);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handlePreview(file) {
      //console.log(file);
    },
    handleExceed(files, fileList) {
      //console.log(files, fileList);
    },
    onFileStateChange(file, fileList) {
      //console.log(fileList.length);
      this.isFileSelected = true;
      if (fileList.length === 2) {
        fileList.splice(0, 1); // 移除下标为 0 的图片文件
      }
      this.imagePreview(file);
    },
    beforeUpload(file) {
      const isIMAGE = file.type === 'image/jpg' || 'image/jpeg' || 'image/png' || 'image/gif';
      const isLt3M = file.size / 1024 / 1024 < 3;

      if (!isIMAGE) {
        this.$message.error('上传头像图片只能是 JPG/JPEG/PNG/GIF 格式!');
      }
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!');
      }

      //console.log(">>>> beforeUpload:" + (isIMAGE && isLt3M));
      return isIMAGE && isLt3M;
    },
    submitUpload() {
      // TODO 注意，如果文件没有变动，是不会触发这个方法的！
      this.$refs.upload.submit(); // 组件会调用配置的 handUpload 方法
    },
    handUpload(params) { // 覆盖默认的上传行为，自定义上传。
      //console.log(">>>> uploadParams:", params);
      // 通过 FormData 对象上传文件及数据
      let formData = new FormData();
      // 用户信息对象
      for (let key in this.userFollowing) {
        if (this.userFollowing[key] === null) continue;
        formData.append(key, this.userFollowing[key]);
      }
      // 头像文件
      formData.append("profile", params.file);

      // 调试，不请求接口
      //if (process.env.VUE_APP_MOCK === "false") return;
      this.doAddFollowing(formData);

    },
    doAddFollowing(formData) {

      // 发起请求
      console.log(">>>> formData:\n");
      for (let key of formData.keys()) {
        console.log(key + " = " + formData.get(key));
      }

      addFollowing(formData).then(res => {
        console.log(">>>> Add following response:", res);
        if (res.code === 200) {

          this.$message({
            type: "success",
            message: res.message
          });

          // 文件提交后，将标识重置
          if (formData.get("profile")) {
            this.isFileSelected = false;
          }
          // 新增或修改用户完成后，重置用户信息封装对象，避免老数据遗留
          this.userFollowing = this.$store.state.userFollowing.newFollowingBack;
          // 新增或编辑用户头像之后，重置头像文件，避免后面操作还看到之前选择的头像
          this.imageUrl = null;

          if (formData.get("followingId")) { // 有 followingId，说明是更新操作
            // TODO 将修改成功返回的用户对象，赋值给 store 中的 followingItem，因为它跟页面数据绑定了，修改之后，页面数据自动更新
            // 页面对象
            let pageFollowingItem = this.$store.state.userFollowing.followingItem;
            //console.log(">>>> pageFollowingItem: ", JSON.stringify(pageFollowingItem));
            // 接口返回对象
            let returnFollowingItem = res.data;
            //console.log(">>>> returnFollowingItem: ", JSON.stringify(returnFollowingItem));
            //pageFollowingItem = returnFollowingItem; // 这样不管用
            // 内部修改有效！亲自见证 vue 动态绑定的魅力！哈哈哈哈
            pageFollowingItem.userFollowing = returnFollowingItem.userFollowing;
            pageFollowingItem.userFollowingRemarkList = returnFollowingItem.userFollowingRemarkList;

          } else { // 新增关注，需要刷新页面，重新加载数据
            setTimeout(() => {
              this.reload();
            }, 2000);
          }
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
    imagePreview(file) { // 显示图片预览
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess(res, file) {
      //this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 操作成功之后，重置一些通用全局参数变量
    resetAfterSuccess() {

    }

  }
}
</script>

<style scoped>
.add_following_name {
  width: 60%;
}

.add_following_homepage {
  width: 80%;
}

.add_following_sort {
  width: 100px;
}

/* 单选 */
.el-radio {
  /*margin-right: 20px;*/
}

.el-radio__label {
  padding-left: 5px;
}

/* 标签样式 */
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-edit-tag {
  width: 90px;
  margin-left: -10px;
  vertical-align: bottom;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

/* 补充说明样式 */
.add_following_desc {
  margin-left: 10px;
  color: #cccccc;
  font-size: 13px;
}

.no_space {
  margin-left: 0px;
}

/* 头像上传 */
.avatar-uploader {
  display: inline-block;
  line-height: 0px;
  border-radius: 4px;
  overflow: hidden;
}

.avatar-uploader-icon {
  font-size: 16px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  /*border-radius: 50%;*/
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}

.avatar-uploader-icon:hover {
  border-color: #409EFF;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}

</style>
