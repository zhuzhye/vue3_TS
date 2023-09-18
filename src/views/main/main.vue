<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '50px' : '210px'">
        <MainMenu v-model:isFold="isCollapse"></MainMenu>
      </el-aside>
      <el-container>
        <el-header>
          <MainHeader @foldChange="foldChange"></MainHeader>
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from "@/components/main-menu/MainMemu.vue";
import MainHeader from "@/components/main-header/MainHeader.vue";
import { ref } from "vue";
//处理main-header折叠的变化
let isCollapse = ref(false);
function foldChange(isFold: boolean) {
  isCollapse.value = isFold;
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transition: width 0.5s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
