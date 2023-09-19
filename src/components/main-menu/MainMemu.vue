<template>
  <div class="main-menu">
    <!-- 1.logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 class="title" v-show="!isFold">后台管理系统</h2>
    </div>
    <div class="menu">
      <el-menu
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :collapse="isFold"
        :default-active="defaultActive"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('el-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="handleClickItem(subItem)">
                {{ subItem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from "@/store/login/login";
import type { subItemType } from "./types";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import { mapPathToMenu } from "../../utils/mapMenus";
// 0.定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();
// 1.获取动态的菜单
const loginStore = useLoginStore();
const userMenus = loginStore.userMenus;

// 2.监听item的点击

function handleClickItem(subItem: subItemType) {
  router.push(subItem.url);
}

const route = useRoute();
const pathMenu = mapPathToMenu(route.path, userMenus);
// 3.ElMenu的默认选中菜单
const defaultActive = ref(pathMenu.id + "");
</script>
<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
