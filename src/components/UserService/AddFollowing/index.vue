<template>
  <div class="add_following">
    <el-dialog :title="getDialogTitle" v-model="getDialogVisible" :top="`7vh`"
               :before-close="beforeClose"
               :destroy-on-close="true">
      <el-form class="add_following_form" ref="addFollowingForm" :model="userFollowing" :rules="rules" label-position="right" label-width="auto">
        <!-- 编辑关注，不支持更改用户类型 -->
        <el-form-item class="add_following_form_item" label="是否为用户" v-if="!userFollowing.followingId">
          <el-radio-group v-model="userFollowing.isUser" :value="true" prop="isUser" v-on:change="isUserRadioChange">
            <el-radio :value="true">用户</el-radio>
            <el-radio :value="false">非用户</el-radio>
          </el-radio-group>
          <span class="add_following_desc"></span>
        </el-form-item>
        <el-form-item class="add_following_form_item" label="用户名" prop="name">
          <el-input class="add_following_name" maxlength="20" show-word-limit autosize
                    v-model="userFollowing.name" placeholder="momo" size="large"></el-input>
        </el-form-item>
        <el-form-item class="add_following_form_item" label="用户主页" prop="mainPage">
          <el-input class="add_following_homepage" maxlength="200" show-word-limit autosize
                    v-model="userFollowing.mainPage" size="large"></el-input>
        </el-form-item>
        <el-form-item class="add_following_form_item" label="个性签名" prop="signature" v-if="!userFollowing.isUser">
          <el-input type="textarea" maxlength="200" :autosize="{ minRows: 2, maxRows: 10 }" show-word-limit
                    v-model="userFollowing.signature" size="large"></el-input>
        </el-form-item>
        <el-form-item class="add_following_form_item" label="分组类型" v-if="isShowFollowingType">
          <el-select class="change_following_type_select change_following_type_list"
                     v-model="userFollowing.typeId" placeholder="-请选择-" size="large">
            <el-option v-for="typeItem in typeList" :label="typeItem.typeName" :value="typeItem.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="add_following_form_item" label="排序优先级" prop="sortNo">
          <!---
          <el-select class="add_following_sort" v-model="userFollowing.sortNo" placeholder="-请选择-" size="large">
            <el-option v-for="val in sortValues" :label="val" :value="val"></el-option>
          </el-select>
          -->
          <el-input class="add_following_sort" maxlength="3" show-word-limit autosize
                    v-model="userFollowing.sortNo" placeholder="0~100" size="large"></el-input>
          <span class="add_following_desc">（优先级由低到高：0~100）</span>
        </el-form-item>
        <el-form-item class="add_following_form_item add_following_remark_form_item" label="标签备注" v-model="userFollowing.remarkList">
          <el-tag
              :key="tag"
              size="large"
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
                maxlength="20"
                @keyup.enter="handleEditInputConfirm(tag)"
                @blur="handleEditInputConfirm(tag)"
            >
            </el-input>
          </el-tag>
          <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              maxlength="20"
              @keyup.enter="handleInputConfirm()"
              @blur="handleInputConfirm()"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新建</el-button>
        </el-form-item>
        <el-form-item class="add_following_form_item" label="用户头像" prop="profilePhoto" v-if="!userFollowing.isUser">
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
            <svg-icon v-else iconName="jia1" className="avatar-uploader-icon"></svg-icon>
          </el-upload>
          <span class="add_following_desc">（文件类型：jpg/jpeg/png/gif；文件大小：不超过 3M）</span>
        </el-form-item>
        <el-form-item class="add_following_form_item func_btn_area">
          <el-button type="primary" class="func_btn_submit" @click="onSubmit('addFollowingForm')">确认</el-button>
          <el-button class="func_btn_cancel" @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {addFollowing} from '@/api/user';
import {getUserFollowingTypeList} from '@/api/global';
import {getNewObjByJson} from '@/utils/index';
import {validateURL} from '@/utils/validate';
import {mapActions} from 'vuex';


export default {
  name: "AddFollowing",
  props: [],
  inject: ['reload'],
  data() {
    const validateUrl = (rule, value, callback) => {
      if (!value) {
        //callback(new Error('用户主页不能为空'));
        callback();
      } else {
        if (!validateURL(value)) {
          callback(new Error('请输入正确的网页地址'));
        }
        callback();
      }
    };
    const validateSortNo = (rule, value, callback) => {
      if (!value) {
        //callback(new Error('优先级不能为空'));
        callback();
      } else {
        const age= /^[0-9]*$/;
        if (!age.test(value) || value < 0 || value > 100) {
          callback(new Error('优先级范围：0~100'));
        }
        callback();
      }
    };
    return {
      // 用户信息封装对象
      userFollowing: {
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
        // 用户来源平台的id或标识
        userKey: null,
        // 用户名
        name: null,
        // 用户主页
        mainPage: null,
        // 头像文件路径
        profilePhoto: null,
        // 个性签名
        signature: null,
        // 是否为用户
        isUser: true,
        // 优先级由低到高：0~100，默认50
        sortNo: 50,
        // 是否删除，默认 false
        isDeleted: false,
        // 关联用户标签列表
        remarkList: [],
        // 关联用户标签列表json格式
        remarkListJson: null
      },
      // 是否显示分组类型
      isShowFollowingType: this.$store.state.userFollowing.isShowFollowingType,
      // 分类类型列表
      typeList: null,
      // 排序优先级，[1, 10] 优先级逐渐递增
      sortValues: [],
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
      baseApi: process.env.VUE_APP_IMAGE_SERVER_PATH.startsWith("http") ? process.env.VUE_APP_IMAGE_SERVER_PATH : (process.env.VUE_APP_SERVER_API + process.env.VUE_APP_IMAGE_SERVER_PATH),
      // 校验规则
      rules: {
        name: [
          //{required: true, message: '用户名称不能为空', trigger: 'blur'},
          {max: 20, message: '长度不能超过 20 个字符', trigger: 'blur'}
        ],
        mainPage: [
          {required: true, message: '用户主页不能为空', trigger: 'blur'},
          //{type: 'url', message: '请输入正确的网页地址', trigger: ['blur', 'change'] },
          //{max: 100, message: '长度不超过 100 个字符', trigger: 'blur'}
          // 使用自定义校验
          {validator: validateUrl, trigger: ['blur', 'change']}
        ],
        sortNo: [
          //{required: true, message: '优先级不能为空', trigger: 'blur'},
          {validator: validateSortNo, trigger: ['blur', 'change']}
        ]
      }
    }
  },
  created() {
    // 初始化一些数据
    // TODO 弹窗显示的时候，才加载
    if (this.getDialogVisible) {
      this.initData();
    }
  },
  // 属性计算
  // TODO 注意，这里面的方法会多次调用！！因为 v-mode 为双向绑定，方法内的属性变了，方法会再次执行，造成方法抖动现象
  computed: {
    getDialogVisible() {
      return this.$store.state.userFollowing.dialogVisible;
    },
    getDialogTitle() {
      return this.$store.state.userFollowing.dialogTitle;
    },
    getUserFollowing() {
      // TODO 注意，这里需要存的是 userFollowingItem，包含 userFollowing 和 userFollowingRemarkList
      if (this.$store.state.userFollowing.viewItem && this.$store.state.userFollowing.viewItem.userFollowing) {
        return this.$store.state.userFollowing.viewItem.userFollowing;
      }
      return null;
    },
    getSortValues() {
      return this.$store.state.globalProperties.sortValues;
    },
  },
  methods: {
    ...mapActions({ //一组方法，对应到状态存储 store 中 actions 定义的具体方法
      setDialogVisible: 'userFollowing/setDialogVisible',
      setIsShowFollowingType: 'userFollowing/setIsShowFollowingType',
      setViewItem: 'userFollowing/setViewItem'
    }),
    initData() {
      if (process.env.VUE_APP_ENV !== "prod") {
        console.log(">>>> userFollowing initData >>>>");
      }
      // 获取编辑数据
      let viewItem = this.getUserFollowing;
      if (viewItem) {
        // TODO 视图对象不为空，说明是编辑数据，复制一个编辑副本，避免修改还未提交，页面数据就已经动态改变了
        this.userFollowing = getNewObjByJson(viewItem);
      }
      // 设置 userId
      if (!this.userFollowing.userId) {
        this.userFollowing.userId = this.$store.state.userFollowing.instance.userId;
      }
      // 设置 platformId
      if (!this.userFollowing.platformId) {
        this.userFollowing.platformId = this.$store.state.userFollowing.instance.platformId;
      }
      // 设置 typeId
      if (!this.userFollowing.typeId) {
        this.userFollowing.typeId = this.$store.state.userFollowing.instance.typeId;
      }
      // 获取排序优先级
      this.sortValues = this.getSortValues;
      // 如果是平台添加关注，需要加载类型列表
      if (!this.userFollowing.typeId) {
        // 请求后端接口，获取数据
        // TODO 注意，[] 空数组校验为 true
        if (!this.typeList || this.typeList.length < 1) {
          this.initTypeList();
        }
      }

      /*
      // TODO 因为动态绑定的原因，getDialogVisible() 方法中获取了太多的变量，一旦有一个变化，方法会重新触发执行，导致刚填写的内容就被清空了
      // 新增操作，重置字段内容
      if (this.$store.state.userFollowing.dialogType === 0) {
        // TODO 将回调延迟到下次DOM更新循环之后执行。在修改数据之后立即使用它，然后等待DOM更新。
        this.$nextTick(() => {
          this.resetForm('addFollowingForm');
        });
      }
      */

      // 备份原来的标签，避免重复添加
      this.backRemarkList();

    },
    initTypeList() {
      this.typeList = getUserFollowingTypeList(this.userFollowing.userId, this.userFollowing.platformId);
    },
    isUserRadioChange: function (val) {
      //console.log(val);

    },
    beforeClose(done) {
      this.onCancel();
      done();
    },
    // 重置表单参数
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onSubmit: function (formName) {
      //console.log("formName:", formName);
      // 组件自带规则校验
      this.$refs[formName].validate((valid) => {
        //console.log("valid:", valid);
        if (!valid) return false; // TODO 这里有坑，校验不通过，竟然没返回，还继续往下执行！
      });

      // 校验必须参数
      if (!this.userFollowing.userId) {
        this.$message.error('用户id错误');
        return false;
      }
      if (!this.userFollowing.platformId) {
        this.$message.error('平台id错误');
        return false;
      }
      // 0表示默认分类
      if (this.userFollowing.typeId === null || this.userFollowing.typeId === undefined) {
        this.$message.error('类型id错误');
        return false;
      }
      if (!this.userFollowing.name) {
        //this.$message.error('用户名不能为空');
        //return false;
        // TODO 可以为空，会同步用户在对应平台的昵称
        this.userFollowing.name = "momo";
      }
      if (!this.userFollowing.mainPage) {
        //this.$message.error('用户主页不能为空');
        return false;
      }
      if (!validateURL(this.userFollowing.mainPage)) {
        //this.$message.error('请输入正确的网页地址');
        return false;
      }
      if (!this.userFollowing.sortNo) {
        //this.$message.error('优先级不能为空');
        //return false;
        this.userFollowing.sortNo = 50;
      }
      if (!/^[0-9]*$/.test(this.userFollowing.sortNo) || this.userFollowing.sortNo < 0 || this.userFollowing.sortNo > 100) {
        //this.$message.error('优先级范围：0~100');
        return false;
      }
      if (!this.userFollowing.isUser && !this.isFileSelected && !this.userFollowing.profilePhoto) {
        this.$message.error('非用户需要上传头像！');
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
      if (this.userFollowing.createTime)
        this.userFollowing.createTime = null;
      if (this.userFollowing.updateTime)
        this.userFollowing.updateTime = null;

      // 通过 FormData 对象上传文件及数据
      let formData = new FormData();
      // 用户信息对象
      for (let key in this.userFollowing) {
        if (this.userFollowing[key] === null) continue;
        // TODO list 参数请求到服务端解析转换失败，remarkList 不能直接赋值为 null，因为页面绑定了数据
        if (key === 'remarkList') {
          //formData.append(key, null);
          continue;
        } else {
          formData.append(key, this.userFollowing[key]);
        }
      }

      // 判断是否为非用户，只有非用户需要手动上传，用户会自动从主页获取
      //console.log(">>>> isUser:" + this.userFollowing.isUser);
      if (this.userFollowing.isUser) { // 用户只提交用户信息
        this.doAddFollowing(formData);
      } else { // 非用户除了提交用户信息，还要上传头像
        // TODO 如果文件提交方法没有执行，则执行信息保存方法
        if (this.isFileSelected) { // 有选择新文件，走文件提交方法
          this.submitUpload();
        } else { // 否则，走信息保存方法
          this.doAddFollowing(formData);
        }
      }

    },
    onCancel() {
      this.setDialog();
    },
    // 设置弹窗
    setDialog() {
      //this.$store.commit('SET_USER_FOLLOWING_DIALOG_VISIBLE', false);
      this.setDialogVisible(false);
      // 强制重新渲染当前组件
      //this.$forceUpdate(); // 没生效
      // 重置分组类型显示标识
      this.setIsShowFollowingType(false);
    },
    // 重置数据
    resetParams(formData) {
      // 重置表单数据
      this.setViewItem({}); // 指向空对象，指向 null 不生效
      // 文件提交后，将标识重置
      if (formData.get("profile")) {
        this.isFileSelected = false;
      }
      // 新增或编辑用户头像之后，重置头像文件，避免后面操作还看到之前选择的头像
      this.imageUrl = null;
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
      this.$confirm('确认移除【' + tag.labelName + '】标签？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        type: 'warning'
      }).then(() => {
        if (!this.userFollowing.remarkList) {
          this.userFollowing.remarkList = [];
          return;
        }
        if (this.userFollowing.remarkList.length < 1) {
          return;
        }
        this.userFollowing.remarkList.splice(this.userFollowing.remarkList.indexOf(tag), 1);
        //console.log(">>>> after remove:" + JSON.stringify(this.userFollowing.remarkList));
      });
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        //console.log(this.$refs.saveTagInput); // Proxy(Object) {input: RefImpl, 
        if (this.$refs.saveTagInput.$refs) this.$refs.saveTagInput.$refs.input.focus();
        else this.$refs.saveTagInput[0].$refs.input.focus();
      });
    },
    showEditInput(tag) {
      tag.inputEditVisible = true;
      this.inputEditValue = tag.labelName;
      this.$nextTick(() => {
        //this.$refs.saveEditTagInput.$refs.input.focus(); // saveEditTagInput.$refs undefined
        //console.log(this.$refs.saveEditTagInput); // [Proxy(Object)] 0 : Proxy(Object) {input: RefImpl,
        if (this.$refs.saveEditTagInput.$refs) this.$refs.saveEditTagInput.$refs.input.focus();
        else this.$refs.saveEditTagInput[0].$refs.input.focus();
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
            labelId = this.originalRemarkList[i].id;
            if (!labelId) continue;
            // 进一步判断 id 是否已存在于新编辑标签列表，如果在，则把新增标签的id去掉，避免id重复，导致最后保存结果不一致
            if (this.userFollowing.remarkList && this.userFollowing.remarkList.length > 0) {
              for (let j in this.userFollowing.remarkList) {
                if (labelId === this.userFollowing.remarkList[j].id) {
                  labelId = null;
                  break;
                }
              }
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
        if (key === 'remarkList') continue; // 不传 remarkList
        formData.append(key, this.userFollowing[key]);
      }
      // 头像文件
      formData.append("profile", params.file);

      this.doAddFollowing(formData);

    },
    doAddFollowing(formData) {
      // 发起请求
      if (process.env.VUE_APP_ENV !== "prod") {
        console.log(">>>> formData:\n");
        for (let key of formData.keys()) {
          console.log(key + " = " + formData.get(key));
        }
      }

      addFollowing(formData).then(res => {
        if (process.env.VUE_APP_ENV !== "prod") {
          console.log(">>>> Add following response:", JSON.stringify(res));
        }
        if (res.code === 200) {

          this.$message({
            type: "success",
            message: res.message
          });

          if (formData.get("followingId")) { // 有 followingId，说明是更新操作
            // TODO 将修改成功返回的用户对象，赋值给 store 中的 followingItem，因为它跟页面数据绑定了，修改之后，页面数据自动更新
            // 页面对象
            let pageItem = this.$store.state.userFollowing.viewItem;
            //console.log(">>>> pageItem:", JSON.stringify(pageItem));
            // 接口返回对象
            let returnItem = res.data;
            //console.log(">>>> returnItem:", JSON.stringify(returnItem));
            //pageItem = returnItem; // 这样不管用
            // 内部修改有效！亲自见证 vue 动态绑定的魅力！哈哈哈哈
            pageItem.userFollowing = returnItem.userFollowing;
            pageItem.userFollowingRemarkList = returnItem.userFollowingRemarkList;

          } else { // 新增关注，需要刷新页面，重新加载数据
            setTimeout(() => {
              this.reload();
            }, 2000);
          }

          // 隐藏弹窗
          this.setDialog();
          // 重置数据
          this.resetParams(formData);

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

.change_following_type_select {
  width: 150px;
}

.add_following_sort {
  width: 150px;
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
  /*margin-left: 5px;*/
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
  padding: 40px !important;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #d9d9d9;
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
