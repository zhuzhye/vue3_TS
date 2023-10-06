<template>
  <div class="content">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建部门</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column align="center" type="index" label="序号" width="60px" />
        <el-table-column align="center" label="部门名称" prop="name" width="150px" />
        <el-table-column align="center" label="部门领导" prop="leader" width="150px" />
        <el-table-column align="center" label="上级部门" prop="parentId" width="150px" />

        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope"> {{ formatUTC(scope.row.createAt) }}</template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope"> {{ formatUTC(scope.row.updateAt) }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button
              size="small"
              icon="Edit"
              type="primary"
              text
              @click="handleEditBtnClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              icon="Delete"
              type="danger"
              text
              @click="handleDeleteBtnClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total,sizes, prev, pager, next"
        :small="true"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from "@/store/main/system";
import { storeToRefs } from "pinia";
import { formatUTC } from "@/utils/format";
import { ref } from "vue";

// 定义事件
const emit = defineEmits(["newClick", "editClick"]);
const currentPage = ref(1);
const pageSize = ref(10);
// import { computed } from "vue";
// 1.发起action 请求usersList
const stystemStore = useSystemStore();
fetchPageListData();

// 2.获取数据进行展示
// const usersList = computed(() => {
//   return stystemStore.usersList;
// });
const { pageList, pageTotalCount } = storeToRefs(stystemStore);

// 3.页面

function handleSizeChange() {
  fetchPageListData();
}
function handleCurrentChange() {
  fetchPageListData();
}

// 4.定义函数用于发送网络请求
function fetchPageListData(queryInfo: any = {}) {
  console.log(queryInfo, "queryInfo");
  // 1.获取offset/size
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * 10;
  // 发送网络请求
  const queryData = Object.assign({ size, offset }, queryInfo);
  stystemStore.postPageListAciton("department", queryData);
}

// 5.删除操作
function handleDeleteBtnClick(id: number) {
  stystemStore.deletePageByIdAction("department", id);
}

// 6.新建用的操作
function handleNewUserClick() {
  emit("newClick");
}

// 7.编辑操作
function handleEditBtnClick(itemData: any) {
  console.log(itemData, "itemData");
  emit("editClick", itemData);
}
defineExpose({
  fetchPageListData
});
</script>

<style scoped lang="less">
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
