<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuClick">
      <el-icon size="28px">
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumbs">面包屑</div>
      <div class="info"><HeaderInfo></HeaderInfo></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HeaderInfo from "./c-cpns/HeaderInfo.vue";

let isFold = ref(false);

// 0.内部自定义事件
const emit = defineEmits(["foldChange"]);

function handleMenuClick() {
  // 1.内部改变状态
  isFold.value = !isFold.value;
  emit("foldChange", isFold.value);
}
</script>

<style scoped lang="less">
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
