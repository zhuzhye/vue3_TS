<template>
  <div>
    <el-form :model="formLabelAlign" label-width="60px" :label-position="labelPosition">
      <el-form-item label="账号" required>
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="密码" required>
        <el-input v-model="formLabelAlign.region" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";

type DirectType = "right" | "top" | "left";
const labelPosition = ref<DirectType>("right");

const formLabelAlign = reactive({
  name: "",
  region: "",
  type: ""
});
</script>
