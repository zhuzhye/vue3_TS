<template>
  <div class="department">
    <PageSearch @queryClick="handleQueryClick" @resetClick="handleResetClick"></PageSearch>
    <PageContent ref="contentRef" @newClick="handleNewClick" @editClick="handleEditClick">
    </PageContent>
    <PageModal ref="modalRef"></PageModal>
  </div>
</template>

<script setup lang="ts">
import PageSearch from "./c-cpns/PageSearch.vue";
import PageContent from "./c-cpns/PageContent.vue";
import PageModal from "./c-cpns/PageModal.vue";
import { ref } from "vue";

// 点击了搜索 content的操作
const contentRef = ref<InstanceType<typeof PageContent>>();
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo);
}
// 重置
function handleResetClick() {
  contentRef.value?.fetchPageListData();
}

// 点击content，modal操作
const modalRef = ref<InstanceType<typeof PageModal>>();
function handleNewClick() {
  modalRef.value?.setModalVisble();
}

function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisble(false, itemData);
}
</script>

<style scoped></style>
