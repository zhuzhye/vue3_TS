<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 1.账号登录的Pane -->
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><User /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <PanelAccount ref="accountRef"></PanelAccount>
        </el-tab-pane>

        <!-- 2.手机登录的Pane -->
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <PanePhone></PanePhone>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="default" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" size="large" @click="loginBtnClick">
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import PanelAccount from "./PanelAccount.vue";
import PanePhone from "./PanePhone.vue";
import { localCache } from "@/utils/cache";

let isRemPwd = ref<boolean>(localCache.getChache("isRemPwd") ?? false);
let activeName = ref("account");
const accountRef = ref<InstanceType<typeof PanelAccount>>();
watch(isRemPwd, (newValue) => {
  localCache.setChche("isRemPwd", newValue);
});
function loginBtnClick() {
  if (activeName.value === "account") {
    // 获取子组件实例
    accountRef.value?.loginAction(isRemPwd);
  } else {
    console.log("手机登录");
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
