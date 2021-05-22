<template>
  <div id="global_common_components" class="global_common_components">
    <!-- 用户登录全局弹窗 -->
    <user-login></user-login>
    <!-- 添加关注用户的弹窗 -->
    <!-- TODO 更改 key 以强制重新渲染组件 -->
    <add-following :key="addFollowingDialogKey"></add-following>
    <!-- 新增关注用户类型的弹窗 -->
    <add-user-following-type></add-user-following-type>
    <!-- 修改关注用户类型的弹窗 -->
    <change-following-type></change-following-type>
    <!-- 添加用户观点的弹窗 -->
    <add-user-opinion></add-user-opinion>
  </div>
</template>

<script>
import UserLogin from "@/components/UserService/Login";
import AddFollowing from "@/components/UserService/AddFollowing/index";
import AddUserFollowingType from "@/components/UserService/AddUserFollowingType";
import ChangeFollowingType from "@/components/UserService/ChangeFollowingType";
import AddUserOpinion from "@/components/UserService/AddUserOpinion";

export default {
  name: "CommonItem",
  components: {
    UserLogin,
    AddFollowing,
    AddUserFollowingType,
    ChangeFollowingType,
    AddUserOpinion
  },
  data() {
    return {
      addFollowingDialogKey: 1
    }
  },
  created() {
    // TODO 更改 key 以强制重新渲染组件，将改变 key 值的方法，存入 store 中，供子组件调用，达到重新渲染页面的目的，亲测有效
    this.$store.dispatch('userFollowing/setChangeAddFollowingDialogKey', this.changeAddFollowingDialogKey);
  },
  methods: {
    changeAddFollowingDialogKey() {
      this.addFollowingDialogKey += 1;
      if (this.addFollowingDialogKey >= 10000000) {
        this.addFollowingDialogKey = 1;
      }
      if (process.env.VUE_APP_ENV !== "prod") {
        console.log(">>>> addFollowingDialogKey:", this.addFollowingDialogKey);
      }
    }
  },
}
</script>

<style scoped>

</style>
