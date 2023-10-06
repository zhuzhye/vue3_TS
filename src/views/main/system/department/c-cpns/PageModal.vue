<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入部门领导" />
          </el-form-item>
          <el-form-item label="选择部门" prop="parentId">
            <el-select v-model="formData.parentId" placeholder="请选择部门" style="width: 100%">
              <template v-for="item in entirDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import userMainStore from "@/store/main/main";
import useSystemStore from "@/store/main/system";
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
// 1.定义内部属性
const formData = reactive<any>({
  name: "",
  leader: "",
  parentId: ""
});

const isNewRef = ref(true);
const editData = ref();

// 2.获取roles/departsments数据
const mainStore = userMainStore();
const { entirDepartments } = storeToRefs(mainStore);

// 3.设定定义dialogVisible的方法
const dialogVisible = ref(false);
function setModalVisble(isNew: boolean = true, itemData?: any) {
  if (!isNew && itemData) {
    isNewRef.value = isNew;
    for (const key in formData) {
      formData[key] = itemData[key];
    }
    editData.value = itemData;
  } else {
    for (const key in formData) {
      formData[key] = "";
    }
    editData.value = null;
  }
  dialogVisible.value = true;
}

// 4.点击确认逻辑
const systemStore = useSystemStore();
function handleConfirmClick() {
  if (!isNewRef.value && editData.value) {
    console.log(formData, "formData");
    systemStore.editPageDataAction("department", editData.value.id, formData);
  } else {
    systemStore.newPageDataAction("department", formData);
  }
  dialogVisible.value = false;
}
defineExpose({
  setModalVisble
});
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
