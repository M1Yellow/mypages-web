<template>
  <div class="mypages_login_dialog">
    <el-dialog v-model="getDialogVisible" :top="`7vh`"
               :show-close="false"
               :before-close="beforeClose"
               :destroy-on-close="true">
      <el-form class="mypages_login_form" ref="loginForm" :model="userLogin">
        <div class="login_title">
          <span class="login_title_item">用</span>
          <span class="login_title_item">户</span>
          <span class="login_title_item">登</span>
          <span class="login_title_item">录</span>
        </div>
        <el-input class="login_input mypages_login_username" ref="loginNameAutoFocusInput" v-model="userLogin.userName" placeholder="请输入用户名"
                  maxlength="50" v-focus v-on:input="loginNameChange" size="large"><!-- autofocus 不起作用，使用自定义指令 v-focus -->
          <template #prefix>
            <svg-icon iconName="yonghu"></svg-icon>
          </template>
        </el-input>
        <el-input class="login_input mypages_login_password" v-model="userLogin.password" placeholder="请输入密码"
                  show-password
                  maxlength="100" v-on:input="loginPwdChange" @keyup.enter="onSubmit('loginForm')" size="large">
          <template #prefix>
            <svg-icon iconName="mima"></svg-icon>
          </template>
        </el-input>
        <el-button type="primary" :class="loginBtnStyle" :disabled="loginBtnDisabled" @click="onSubmit('loginForm')" size="large">登&nbsp;&nbsp;录</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {login} from '@/api/user';
import localStorageUtil from '@/utils/localStorageUtil';
import {getUserId} from '@/utils/auth';
import {getUserInfoDetail} from '@/api/global';


export default {
  name: "Login",
  inject: ['userId', 'reload'],
  data() {
    return {
      // 用户与关注用户的关联
      userLogin: {
        // 用户id
        userId: null,
        // 用户名
        userName: '',
        // 用户密码
        password: '',
        // 图形验证码
        code: '',
      },
      // 登录按钮变化样式
      loginBtnStyle: 'login_btn_submit_disabled',
      loginBtnDisabled: true
    }
  },
  computed: {
    getDialogVisible() {
      if (this.$store.state.userLogin.dialogVisible) { // 为 true，即显示弹窗时，才初始数据
        // 初始化一些数据
        this.initData();
      }
      return this.$store.state.userLogin.dialogVisible;
    },
  },
  directives: {
    // 自定义指令 v-focus
    // https://blog.csdn.net/qinglingls/article/details/117536589
    focus: {
      //inserted: function(el) {
      mounted(el) {
        //console.log(el); // el-input -> el-input__wrapper -> el-input__inner
        if (!el) return;
        let elInputWrapper = el.children[0];
        //console.log(elInputWrapper);
        if (!elInputWrapper) return;
        let elInputInner = elInputWrapper.querySelector(".el-input__inner");
        //console.log(elInputInner);
        if (!elInputInner) return;
        setTimeout(function () { // 在登录框显示了之后再聚焦
          elInputInner.focus();
        }, 100);
      }
    }
  },
  methods: {
    initData() {

    },
    beforeClose(done) {
      this.onCancel();
      done();
    },
    loginNameChange(value) {
      if (this.userLogin.userName && this.userLogin.password) {
        this.loginBtnStyle = "login_btn_submit";
        this.loginBtnDisabled = false;
      } else {
        this.loginBtnStyle = "login_btn_submit_disabled";
        this.loginBtnDisabled = true;
      }
    },
    loginPwdChange(value) {
      if (this.userLogin.userName && this.userLogin.password) {
        this.loginBtnStyle = "login_btn_submit";
        this.loginBtnDisabled = false;
      } else {
        this.loginBtnStyle = "login_btn_submit_disabled";
        this.loginBtnDisabled = true;
      }
    },
    onCancel() {
      this.setDialog();
    },
    onSubmit: function (formName) {

      // 校验必须参数
      if (!this.userLogin.userName) {
        this.$message.error('用户名不能为空');
        return false;
      }
      if (!this.userLogin.password) {
        this.$message.error('登录密码不能为空');
        return false;
      }

      // 封装参数
      let formData = new FormData();
      // 用户信息对象
      for (let key in this.userLogin) {
        if (this.userLogin[key] === null) continue;
        /*
        if (process.env.VUE_APP_IS_CLOUD === 'false' && key === 'password') { // TODO 密码加密，微服务版本使用了 oauth 认证，在服务端加密
          formData.append(key, this.$md5(this.userLogin[key])); // 注意，append 方法 key 相同，会往后追加内容，而不是覆盖，导致内容错误
        } else {
        }
        */
        formData.append(key, this.userLogin[key]);
      }

      this.doLogin(formData);
    },
    doLogin(formData) {
      // 发起请求
      if (process.env.VUE_APP_ENV !== "prod") {
        console.log(">>>> formData:\n");
        for (let key of formData.keys()) {
          console.log(key + " = " + formData.get(key));
        }
      }

      login(formData).then(res => {
        if (process.env.VUE_APP_ENV !== "prod") {
          console.log(">>>> login response:", JSON.stringify(res));
        }
        if (res.code === 200) {
          // 成功之后，先隐藏弹窗，因为下方的保存和加载用户信息有点耗时，避免用户误以为没反应，重复点击，提交表单
          this.setDialog();

          // 登录成功，保存用户基本信息数据
          let rsCode = this.saveUserBaseData(res.data);
          if (process.env.VUE_APP_ENV !== "prod") {
            console.log(">>>> saveUserBaseData status:", rsCode);
          }
          if (rsCode !== 0) {
            this.$message({
              type: "warning",
              message: process.env.VUE_APP_ERROR_USER_DATA_MSG
            });
            return;
          }

          // 获取用户id
          this.userLogin.userId = getUserId();
          // 异步加载用户详细信息
          getUserInfoDetail(this.userLogin.userId, this.userLogin.userName);
          /*
          let userInfoDetail = getUserInfoDetail();
          if (!userInfoDetail) {
            this.$message({
              type: "warning",
              message: process.env.VUE_APP_ERROR_USER_INFO_DETAIL_MSG
            });
            return;
          }
          */

          // 操作成功才重置数据
          this.resetParams();

          // 跳转首页，加载对应用户数据
          //this.$router.push('/'); // vue-router同路由$router.push不跳转
          // 新用户登录，强制刷新整个页面。（新用户：之前没登陆，没有token；或者用户id不是首页默认显示数据的用户）
          let checkUserId = getUserId();
          if (!checkUserId || checkUserId !== 1) {
            //window.location.reload(true); // 强制刷新还没有 vue 的重新渲染好用
            this.reload();
          } else {
            this.reload();
          }
          /*
          setTimeout(() => {
            //this.reload(); // vue 重新渲染
            // 强制刷新整个页面
            window.location.reload(true);
          }, 100);
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
    },
    // 设置弹窗
    setDialog() {
      //this.$store.commit('SET_USER_LOGIN_DIALOG_VISIBLE', false);
      this.$store.dispatch('userLogin/setDialogVisible', false);
    },
    // 重置数据
    resetParams() {
      // 重置表单数据

      // 解除页面滚动条锁定，针对有两个弹窗会导致登录之后页面锁定的问题
      // document.documentElement.style.overflowY = 'hidden'; // 这是隐藏滚动条
      if (document.documentElement.style.overflowY !== 'scroll') {
        //console.log(">>>> 滚动条状态：", document.documentElement.style.overflowY); // 结果为 " "
        document.documentElement.style.overflowY = 'scroll';
      }

    },
    // 保存用户基本信息数据
    saveUserBaseData(data) {
      if (!data) {
        return 1; // data 错误
      }
      let tokenStr = data.token;
      if (!tokenStr) {
        return 2; // token 内容错误
      }
      // 解密token
      let tokenArr = tokenStr.split(".");
      if (tokenArr === null || !tokenArr.length || tokenArr.length !== 3) {
        return 3; // token 解析错误
      }
      let payloadStr = this.$base64.decode(tokenArr[1]); // JWT 格式 xxx.xxx.xxx 第二部分为返回的数据
      let payload = JSON.parse(payloadStr);
      if (!payload) {
        return 4; // token 获取用户信息错误
      }
      let jwtData = {
        tokenHeader: data.tokenHeader,
        tokenStart: data.tokenStart,
        token: data.token,
        created: payload.iat, // token 认证时间，单位：秒
        expired: payload.exp, // token 过期时间，单位：秒 TODO JWT 过期时间不要设置太长，半小时或一小时到期，但可以使用续签多次，防止泄露
        userBaseInfo: {
          userId: payload.sub ? payload.sub : payload.userId, // 兼容微服务版本
          userName: payload.username,
        }
      }
      if (!jwtData) {
        return 5; // JWT 数据封装错误
      }
      if (process.env.VUE_APP_ENV !== "prod") {
        console.log(">>>> jwtData:", JSON.stringify(jwtData));
      }
      let cacheKey = this.$GlobalConstant.USER_LOGIN_SUCCESS_CACHE_DATA_KEY;
      localStorageUtil.set(cacheKey, jwtData);
      return 0;
    },
  }
}
</script>

<style scoped>
.mypages_login_form {
  width: 220px;
  margin-top: -50px;
  padding: 17px;
}

.login_title {
  text-align: center;
  font-size: 24px;
  color: mediumseagreen; /*darkkhaki*/
  font-weight: bold;
  padding: 0 0 20px 0;
}

.login_title_item:first-child {
  /*margin-right: 25px;*/
}

/*.login_input:nth-of-type(1) {
.login_input:first-of-type {*/
.mypages_login_username {
  margin-top: 5px;
}

.login_input {
  margin-bottom: 15px;
}

/* 加上 ::v-deep 才能修改成功 */
::v-deep(.login_input>.el-input__wrapper) {
  padding: 2px 10px !important;
}

::v-deep(.login_input>.el-input__wrapper>.el-input__prefix>.el-input__prefix-inner>:last-child) {
  margin-right: 5px !important;
}

.login_btn_submit {
  width: 100%;
  margin-top: 20px;
}

.login_btn_submit_disabled {
  width: 100%;
  margin-top: 20px;
  cursor: unset;
  background-color: #f5f5f5;
  color: #cccccc;
  border-color: transparent;
}

</style>
