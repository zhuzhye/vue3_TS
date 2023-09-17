<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside width="200px">
        <MainMenu></MainMenu>
      </el-aside>
      <el-container>
        <el-header>
          <MainHeader></MainHeader>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
// import { localCache } from "@/utils/cache";
// import { useRouter } from "vue-router";
// const router = useRouter();
// function handleExitClick() {
//   // 1.删除token
//   localCache.removeCache("token");
//   // 2.跳回登陆页面
//   router.push("/login");
// }
import MainMenu from "@/components/main-menu/MainMemu.vue";
import MainHeader from "@/components/main-header/MainHeader.vue";
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

    transition: width 0.3s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
