<template>
  <div>
    <el-form
      :model="account"
      label-width="60px"
      :rules="accountRules"
      :label-position="labelPosition"
      status-icon
      ref="accountFormRef"
    >
      <el-form-item label="帐号" required prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" required prop="password">
        <el-input v-model="account.password" :show-password="true" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { DirectType } from "../types";
import { ElMessage } from "element-plus";
import type { FormRules, ElForm } from "element-plus";
import useLoginStore from "@/store/login/login";
import type { IAccount } from "@/types";
import { localCache } from "@/utils/cache";
const labelPosition = ref<DirectType>("right");
// 1.定义account数据

const account = reactive<IAccount>({
  name: localCache.getChache("name") ?? "",
  password: localCache.getChache("password") ?? ""
});

// 2.定义校验规则
const accountRules: FormRules<IAccount> = {
  name: [
    { message: "请输入帐号", required: true, trigger: "blur" },
    { pattern: /^[a-z0-9]{6,20}$/, message: "必须3~5位", trigger: "blur" }
  ],
  password: [
    { message: "请输入密码", required: true, trigger: "blur" },
    { pattern: /^[a-z0-9]{6,20}$/, message: "必须3~5位", trigger: "change" }
  ]
};

// const accountFormRef = ref<FormInstance>();
const accountFormRef = ref<InstanceType<typeof ElForm>>();
const loginStore = useLoginStore();
// 3.执行账号的登录逻辑
function loginAction(isRemPwd) {
  accountFormRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的账号和密码
      const { name, password } = account;
      // 2.执行登录逻辑
      loginStore.loginAccountAction({ name, password }).then(() => {
        if (isRemPwd) {
          localCache.setChche("name", name);
          localCache.setChche("password", password);
        } else {
          localCache.removeCache("name");
          localCache.removeCache("password");
        }
      });
    } else {
      ElMessage.error("验证失败");
    }
  });
}

defineExpose({
  loginAction
});
</script>
