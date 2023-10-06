<template>
  <div class="user">
    <UserSearch @queryClick="queryClick" @resetClick="handleResetClick"></UserSearch>
    <UserContent
      ref="contentRef"
      @newClick="handleNewBtnClick"
      @editClick="handleEditClick"
    ></UserContent>
    <UserModal ref="modalRef"></UserModal>
  </div>
</template>

<script setup lang="ts">
import UserSearch from "./c-cpns/UserSearch.vue";
import UserContent from "./c-cpns/UserContent.vue";
import UserModal from "./c-cpns/UserModal.vue";
import type { IQuery } from "./types";
import { ref } from "vue";

const contentRef = ref<InstanceType<typeof UserContent>>();
function queryClick(data: IQuery) {
  contentRef.value?.fetchUserListData(data);
}
function handleResetClick() {
  contentRef.value?.fetchUserListData();
}

// modal组件的操作
const modalRef = ref<InstanceType<typeof UserModal>>();
function handleNewBtnClick() {
  modalRef.value?.setModalVisble();
}

function handleEditClick(itemData: any) {
  console.log(itemData);
  modalRef.value?.setModalVisble(false, itemData);
}
</script>

<style scoped lang="less">
.user {
  border-radius: 10px;
  overflow: hidden;
}
</style>
