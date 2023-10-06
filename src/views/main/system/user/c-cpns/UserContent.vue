<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column align="center" type="index" label="序号" width="60px" />
        <el-table-column align="center" label="用户名" prop="name" width="150px" />
        <el-table-column align="center" label="真实姓名" prop="realname" width="150px" />
        <el-table-column align="center" label="手机号码" prop="cellphone" width="150px" />
        <el-table-column align="center" label="状态" prop="enable" width="100px">
          <template #default="scope">
            <el-button size="small" :type="scope.row.enable ? 'primary' : 'danger'" plain>
              {{ scope.row.enable ? "启用" : "禁用" }}
            </el-button>
          </template>
        </el-table-column>

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
        :page-sizes="[100, 200, 300, 400]"
        layout="total,sizes, prev, pager, next"
        :small="true"
        :total="usersTotalCount"
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
import type { IQuery } from "../types";

// 定义事件
const emit = defineEmits(["newClick", "editClick"]);
const currentPage = ref(1);
const pageSize = ref(10);
// import { computed } from "vue";
// 1.发起action 请求usersList
const stystemStore = useSystemStore();
fetchUserListData();

// 2.获取数据进行展示
// const usersList = computed(() => {
//   return stystemStore.usersList;
// });
const { usersList, usersTotalCount } = storeToRefs(stystemStore);

// 3.页面

function handleSizeChange() {
  fetchUserListData();
}
function handleCurrentChange() {
  fetchUserListData();
}
// 4.定义函数用于发送网络请求
function fetchUserListData(queryInfo: IQuery | {} = {}) {
  // 1.获取offset/size
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * 10;
  // 发送网络请求
  const queryData = Object.assign({ size, offset }, queryInfo);
  stystemStore.postUserListAction(queryData);
}

// 5.删除操作
function handleDeleteBtnClick(id: number) {
  stystemStore.deleteUserByIdAction(id);
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
  fetchUserListData
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
